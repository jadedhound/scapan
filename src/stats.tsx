import { Component, createMemo, For, JSX } from "solid-js"
import { CClass } from "./cClass"
import { useState } from "./state";
import { fromSeed } from "./diceRoller";
import { Kindred } from "./kindred";
import { scoreToMod } from "./abilityScores";

export const Stats: Component = () => {
  const [char, setChar] = useState();
  const classStats = createMemo(() => getClassStats(char().class));
  const kindredStats = createMemo(() => getKindredStats(char().kindred));
  const hp = (): string => {
    const curr = char();
    const sides = classStats().hp_die;
    const i = (sides - 4) / 2;
    const base = curr.useOptHP ? curr.hpAlt[i] : curr.hp[i];
    const stats = curr.useOptAbi ? curr.abiOptional : curr.abi;
    const conMod = scoreToMod(stats[2]);
    const conModAdj = conMod[0] === "-" ? -1 : 1;
    const total = Math.max(base + (conMod[1] * conModAdj), 1);
    return `1d${sides} + CON = ${base} ${conMod[0]} ${conMod[1]} = ${total} (min 1)`
  }
  const mr = () => {
    const curr = char();
    const stats = curr.useOptAbi ? curr.abiOptional : curr.abi;
    return scoreToMod(stats[3])
  }
  const atk = () => getClassStats(char().class).attack;
  const changeOpt = () => {
    setChar((prev) => {
      prev.useOptHP = !prev.useOptHP;
      return prev
    })
  }

  return (
    <div>
      <h2>Stats</h2>
      <p><b>HP:</b> {hp()}</p>
      <div class="flex gap-2 items-center">
        <input
          type="checkbox"
          name="optHP"
          class="w-6 h-6"
          checked={char().useOptHP}
          onChange={(_) => changeOpt()}
        />
        <label for="optHP" class="mt-2 w-2 grow">
          <b>Re-rolling 1s and 2s: </b>
          Reroll if dice roll is 1 or 2.
        </label>
      </div>
      <p><b>Attack:</b> +{atk()}</p>
      <p><b>AC:</b> None</p>
      <p><b>Speed:</b> Depends on encumberance system used.</p>
      <p>
        <b>Skill Targets: </b>
      </p>
      <ul class="list-disc pl-5">
        {
          maybeView(() => kindredStats().skills, (skills) => (
            <li><i>{char().kindred}:</i> {skills} </li>
          ))
        }
        {
          maybeView(() => classStats().skills, (skills) => (
            <li><i>{char().class}:</i> {skills} </li>
          ))
        }
      </ul>
      <p><b>Languages:</b> {kindredStats().languages}</p>

      <h3>Save Targets</h3>
      <div class="grid grid-cols-6 text-center border-2 border-stone-200 rounded p-2 [&>*>*]:p-2">
        <div class="contents [&>:nth-child(even)]:bg-amber-950 [&>*]:mb-[-1px] font-bold">
          <div>Doom</div>
          <div>Ray</div>
          <div>Hold</div>
          <div>Blast</div>
          <div>Spell</div>
          <div>MR</div>
        </div>
        <div class="contents [&>:nth-child(even)]:bg-amber-950">
          <For each={classStats().saves}>
            {(item) => (
              <div> {item} </div>
            )}
          </For>
          <div>{mr()}</div>
        </div>
      </div>
    </div>
  )
}

function maybeView<T>(pred: () => T | null, view: (t: T) => JSX.Element): JSX.Element {
  const result = pred();
  if (result) {
    return view(result)
  } else {
    return (null as unknown as JSX.Element)
  }
}

type KindredStats = {
  languages: string,
  skills?: string,
}

function getKindredStats(kindred: Kindred): KindredStats {
  switch (kindred) {
    case Kindred.Breggle:
      return {
        languages: "Woldish, Gaffe, Caprice"
      }
    case Kindred.Elf:
      return {
        languages: "Woldish, Sylvan, High Elvish",
        skills: "Listen 5, Search 5"
      }
    case Kindred.Grimalkin:
      return {
        languages: "Woldish, Mewl",
        skills: "Listen 5"
      }
    case Kindred.Human:
      return {
        languages: "Woldish"
      }
    case Kindred.Mossling:
      return {
        languages: "Woldish, Mulch",
        skills: "Survival 5 (when foraging)"
      }
    case Kindred.Woodgrue:
      return {
        languages: "Woldish, Sylvan",
        skills: "Listen 5"
      }
  }
}

type ClassStats = {
  hp_die: number,
  attack: number,
  saves: number[],
  skills?: string,
}

function getClassStats(charClass: CClass): ClassStats {
  switch (charClass) {
    case CClass.Bard:
      return {
        hp_die: 6,
        attack: 0,
        saves: [13, 14, 13, 15, 15],
        skills: "Decipher Document 6, Legerdemain 6, Listen 5, Monster Lore 5"
      }
    case CClass.Cleric:
      return {
        hp_die: 6,
        attack: 0,
        saves: [11, 12, 13, 16, 14],
      }
    case CClass.Enchanter:
      return {
        hp_die: 6,
        attack: 0,
        saves: [11, 12, 13, 16, 14],
      }
    case CClass.Fighter:
      return {
        hp_die: 8,
        attack: 1,
        saves: [12, 13, 14, 15, 16],
      }
    case CClass.Friar:
      return {
        hp_die: 4,
        attack: 0,
        saves: [11, 12, 13, 16, 14],
        skills: "Survival 5 (when foraging)"
      }
    case CClass.Hunter:
      return {
        hp_die: 8,
        attack: 1,
        saves: [12, 13, 14, 15, 16],
        skills: "Alterness 6, Stalking 6, Survival 5, Tracking 5"
      }
    case CClass.Knight:
      return {
        hp_die: 8,
        attack: 1,
        saves: [12, 13, 12, 15, 15],
      }
    case CClass.Magician:
      return {
        hp_die: 4,
        attack: 0,
        saves: [14, 14, 13, 16, 14],
      }
    case CClass.Thief:
      return {
        hp_die: 4,
        attack: 0,
        saves: [13, 14, 13, 15, 15],
        skills: "Climb Wall 4, Decipher Document 6, Disarm Mechanism 6, Legerdemain 6, Listen 6, Pick Lock 5, Search 6, Stealth 5"
      }
  }
}
