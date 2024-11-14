import { Component, createMemo, For } from "solid-js";
import { State, useState } from "./state";
import { Kindred } from "./kindred";

export enum CClass {
  Bard = "Bard",
  Cleric = "Cleric",
  Enchanter = "Enchanter",
  Fighter = "Fighter",
  Friar = "Friar",
  Hunter = "Hunter",
  Knight = "Knight",
  Magician = "Magician",
  Thief = "Thief",
}

export const CClassView: Component = () => {
  const [char, setChar] = useState();
  const isCurrent = (charClass: CClass): boolean => {
    return char().class == charClass;
  };
  const setCurrent = (charClass: CClass) => {
    if ((document.getElementById(charClass) as any).disabled) { return true }

    setChar((prev: State) => {
      prev.class = charClass;
      return prev;
    });
  }
  const isDisabled = (charClass: CClass): boolean => {
    const currChar = char();
    const isFairy = currChar.kindred == Kindred.Grimalkin || currChar.kindred == Kindred.Elf;
    const isHoly = charClass == CClass.Cleric || charClass == CClass.Friar;
    if (isHoly && isFairy) { return true } else { return false }
  }
  const basics = createMemo(() => getBasics(char().class));

  return (
    <div>
      <h2>Class</h2>
      <div class="grid grid-cols-3 gap-2">
        <For each={Object.keys(CClass)}>
          {(item) => (
            <div>
              <input
                type="radio"
                name="class"
                value={item}
                id={item}
                checked={isCurrent(item as CClass)}
                disabled={isDisabled(item as CClass)}
              />
              <label
                for={item}
                onclick={(_) => setCurrent(item as CClass)}
              >
                {item}
              </label>
            </div>
          )}
        </For>
      </div>
      <h3>Basics</h3>
      <p><b>Prime Abilities:</b> {basics().prime}</p>
      <p><b>HP:</b> {basics().hp}</p>
      <p><b>Combat Aptitude:</b> {basics().combat}</p>
      <p><b>Armour:</b> {basics().armour}</p>
      <p><b>Weapons:</b> {basics().weapons}</p>
    </div>
  )
}

type Basics = {
  prime: string,
  hp: string,
  combat: string,
  armour: string,
  weapons: string,
}

function getBasics(cClass: CClass): Basics {
  switch (cClass) {
    case CClass.Bard:
      return {
        prime: "Charmisa and Dexterity",
        hp: "1d6 per Level, +1 after Level 10",
        combat: "Semi-martial",
        armour: "Light and Medium, no shields",
        weapons: "Small and Medium",
      }
    case CClass.Cleric:
      return {
        prime: "Wisdom",
        hp: "1d6 per Level, +1 after Level 10",
        combat: "Semi-martial",
        armour: "Any, including shields (except arcane or fairy magic armour)",
        weapons: "Any (except arcane or fairy magic weapons)",
      }
    case CClass.Enchanter:
      return {
        prime: "Charmisa and Intelligence",
        hp: "1d6 per Level, +1 after Level 10",
        combat: "Semi-martial",
        armour: "Light and Medium, no shields",
        weapons: "Small and Medium",
      }
    case CClass.Fighter:
      return {
        prime: "Strength",
        hp: "1d8 per Level, +2 after Level 10",
        combat: "Martial",
        armour: "Any, including shields",
        weapons: "Any",
      }
    case CClass.Friar:
      return {
        prime: "Intelligence and Wisdom",
        hp: "1d4 per Level, +1 after Level 10",
        combat: "Non-martial",
        armour: "None",
        weapons: "Club, dagger, holy water, oil, sling, staff, torch",
      }
    case CClass.Hunter:
      return {
        prime: "Constitution and Dexterity",
        hp: "1d8 per Level, +2 after Level 10",
        combat: "Martial",
        armour: "Light, shields",
        weapons: "Any",
      }
    case CClass.Knight:
      return {
        prime: "Charisma and Strength",
        hp: "1d8 per Level, +2 after Level 10",
        combat: "Martial",
        armour: "Medium and Heavy, shields",
        weapons: "Any melee weapons",
      }
    case CClass.Magician:
      return {
        prime: "Intelligence",
        hp: "1d4 per Level, +1 after Level 10",
        combat: "Non-martial",
        armour: "None",
        weapons: "Dagger, holy water, oil, staff, torch",
      }
    case CClass.Thief:
      return {
        prime: "Dexterity",
        hp: "1d4 per Level, +1 after Level 10",
        combat: "Semi-martial",
        armour: "Light, no shields",
        weapons: "Small and Medium",
      }
  }
}

