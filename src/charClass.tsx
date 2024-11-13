import { Component, For } from "solid-js";
import { CharModel, useCharModel } from "./characterModel";
import { Kindred } from "./kindred";

export enum CharClass {
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

export const CharClassView: Component = () => {
  const [char, setChar] = useCharModel();
  const isCurrent = (charClass: CharClass): boolean => {
    return char().class == charClass;
  };
  const setCurrent = (charClass: CharClass) => {
    if ((document.getElementById(charClass) as any).disabled) { return true }

    setChar((prev: CharModel) => {
        prev.class = charClass;
        return prev;
    });
  }
  const isDisabled = (charClass: CharClass): boolean => {
    const currChar = char();
    const isFairy = currChar.kindred == Kindred.Grimalkin || currChar.kindred == Kindred.Elf;
    const isHoly = charClass == CharClass.Cleric || charClass == CharClass.Friar;
    if (isHoly && isFairy) { return true } else { return false }
  }

  return (
    <div>
      <h2>Class</h2>
      <div class="grid grid-cols-3 gap-2">
        <For each={ Object.keys(CharClass) }>
          {(item) => (
            <div>
              <input 
                type="radio" 
                name="class" 
                value={ item } 
                id={ item }
                checked={ isCurrent(item as CharClass) }
                disabled={ isDisabled(item as CharClass) }
              />
              <label 
                for={ item } 
                onclick={ (_) => setCurrent(item as CharClass) }
              >
                { item }
              </label>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

