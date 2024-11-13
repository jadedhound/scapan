import { Component } from "solid-js"
import { CharClass } from "./charClass"
import { useCharModel } from "./characterModel";
import { fromSeed } from "./diceRoller";

export const Stats: Component = () => {
  const [char, setChar] = useCharModel();
  const hp = (): string => {
    const currChar = char();
    const stats = classToStats(currChar.class);
    const sides = stats.hp_die;
    const base = fromSeed(currChar.hp, sides);

    return "1d" + sides + " + CON = " + base + " + (" ;
  }
  
  return (
    <div>
      <h2>Stats</h2>        
      <p><b>HP:</b> { hp() }</p>
      <p><b>Attack:</b> None</p>
      <p><b>AC:</b> None</p>
      <p><b>Speed:</b> None</p>
      <p><b>Skill Targets:</b> None</p>
      <p><b>Languages:</b> Woldish</p>

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

function classToStats(charClass: CharClass): ClassStats {
  switch (charClass) {
    case CharClass.Bard:
      return Bard;
    case CharClass.Cleric:
      return Cleric;
    case CharClass.Enchanter:
      return Enchanter;
    case CharClass.Fighter:
      return Fighter;
    case CharClass.Friar:
      return Friar;
    case CharClass.Hunter:
      return Hunter;
    case CharClass.Knight:
      return Knight;
    case CharClass.Magician:
      return Magician;
    case CharClass.Thief:
      return Thief;
  }
}

type ClassStats = {
  hp_die: number,
  attack: number,
  saves: number[],
}

const Bard: ClassStats = {
  hp_die: 6,
  attack: 0,
  saves: [13, 14, 13, 15, 15],
}
const Cleric: ClassStats = {
  hp_die: 6,
  attack: 0,
  saves: [11, 12, 13, 16, 14],
}
const Enchanter: ClassStats = {
  hp_die: 6,
  attack: 0,
  saves: [11, 12, 13, 16, 14],
}
const Fighter: ClassStats = {
  hp_die: 8,
  attack: 1,
  saves: [12,13,14,15,16],
}
const Friar: ClassStats = {
  hp_die: 4,
  attack: 0,
  saves: [11,12,13,16,14],
}
const Hunter: ClassStats = {
  hp_die: 8,
  attack: 1,
  saves: [12,13,14,15,16],
}
const Knight: ClassStats = {
  hp_die: 8,
  attack: 1,
  saves: [12,13,12,15,15],
}
const Magician: ClassStats = {
  hp_die: 4,
  attack: 0,
  saves: [14,14,13,16,14],
}
const Thief: ClassStats = {
  hp_die: 4,
  attack: 0,
  saves: [13,14,13,15,15],
}
