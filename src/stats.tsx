import { Component, createMemo, JSX } from "solid-js"
import { CharClass } from "./charClass"
import { useCharModel } from "./characterModel";
import { fromSeed } from "./diceRoller";
import { Kindred } from "./kindred";

export const Stats: Component = () => {
  const [char, setChar] = useCharModel();
  const classStats = createMemo(() => getClassStats(char().class));
  const kindredStats = createMemo(() => getKindredStats(char().kindred));
  const hp = (): string => {
    const currChar = char();
    const sides = classStats().hp_die;
    const base = fromSeed(currChar.hp, sides);

    return "1d" + sides + " + CON = " + base + " + (";
  }
  const atk = () => getClassStats(char().class).attack;

  return (
    <div>
      <h2>Stats</h2>
      <p><b>HP:</b> {hp()}</p>
      <p><b>Attack:</b> +{atk()}</p>
      <p><b>AC:</b> None</p>
      <p><b>Speed:</b> None</p>
      <p>
        <b>Skill Targets: </b>
        {
          maybeView(() => kindredStats().skills, (skills) => (
            <span><i>{char().kindred}:</i> {skills} </span>
          ))
        }
        {
          maybeView(() => classStats().skills, (skills) => (
            <span><i>{char().class}:</i> {skills} </span>
          ))
        }
      </p>
      <p><b>Languages:</b> {kindredStats().languages}</p>

      <h3>Save Targets</h3>
      <table class="mb-4">
        <thead>
          <tr>
            <td>Doom</td>
            <td>Ray</td>
            <td>Hold</td>
            <td>Blast</td>
            <td>Spell</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
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

function getClassStats(charClass: CharClass): ClassStats {
  switch (charClass) {
    case CharClass.Bard:
      return {
        hp_die: 6,
        attack: 0,
        saves: [13, 14, 13, 15, 15],
        skills: "Decipher Document 6, Legerdemain 6, Listen 5, Monster Lore 5"
      }
    case CharClass.Cleric:
      return {
        hp_die: 6,
        attack: 0,
        saves: [11, 12, 13, 16, 14],
      }
    case CharClass.Enchanter:
      return {
        hp_die: 6,
        attack: 0,
        saves: [11, 12, 13, 16, 14],
      }
    case CharClass.Fighter:
      return {
        hp_die: 8,
        attack: 1,
        saves: [12, 13, 14, 15, 16],
      }
    case CharClass.Friar:
      return {
        hp_die: 4,
        attack: 0,
        saves: [11, 12, 13, 16, 14],
        skills: "Survival 5 (when foraging)"
      }
    case CharClass.Hunter:
      return {
        hp_die: 8,
        attack: 1,
        saves: [12, 13, 14, 15, 16],
        skills: "Alterness 6, Stalking 6, Survival 5, Tracking 5"
      }
    case CharClass.Knight:
      return {
        hp_die: 8,
        attack: 1,
        saves: [12, 13, 12, 15, 15],
      }
    case CharClass.Magician:
      return {
        hp_die: 4,
        attack: 0,
        saves: [14, 14, 13, 16, 14],
      }
    case CharClass.Thief:
      return {
        hp_die: 4,
        attack: 0,
        saves: [13, 14, 13, 15, 15],
        skills: "Climb Wall 4, Decipher Document 6, Disarm Mechanism 6, Legerdemain 6, Listen 6, Pick Lock 5, Search 6, Stealth 5"
      }
  }
}
