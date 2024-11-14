import { Component, For } from "solid-js"
import { useCharModel } from "./characterModel";
import { Kindred } from "./kindred";

export const Traits: Component = () => {
  const [char, setChar] = useCharModel();

  return (
    <div>
      <h2>Traits</h2>
      <p><b>Read the Player's Book: </b>
        Below are just brief summaries of class and kindred traits.
        Read the player's book for how it's to be used in play.
      </p>
      <h3> {char().kindred} </h3>
      <ul class="list-disc pl-5">
        <For each={getKindredClass(char().kindred)}>
          {(item) => (<li><b>{item.name}:</b> {item.desc}</li>)}
        </For>
      </ul>
    </div>
  )
}

type Trait = {
  name: string,
  desc: string
}

function getKindredClass(kindred: Kindred): Trait[] {
  switch (kindred) {
    case Kindred.Breggle:
      return [
        { name: "Fur", desc: "+1 AC." },
        { name: "Gaze", desc: "Charm humans and shorthorns into obeisance." },
        { name: "Horns", desc: "Level scaling melee attack and social standing dictated by horn length." },
      ]
    case Kindred.Elf:
      return [
        { name: "Glamours", desc: "1 random glamour." },
        { name: "Immortality", desc: "Can be killed, cannot die naturally. Immune to diseases, thirst, starvation." },
        { name: "Magic Resistance", desc: "+2 MR." },
        { name: "Unearthly Beauty", desc: "+2 CHA when interacting with mortals." },
        { name: "Vulnerable to Cold Iron", desc: "+1 damage taken from cold iron." },
      ]
    case Kindred.Grimalkin:
      return [
        { name: "Armour and Weapons", desc: "Needs tailored equipment." },
        { name: "Defensive Bonus", desc: "+2 AC vs large creatures." },
        { name: "Eating Giant Rodents", desc: "+1 HP for consuming fresh giant rodent." },
        { name: "Glamours", desc: "1 random glamour." },
        { name: "Immortality", desc: "Can be killed, cannot die naturally. Immune to diseases, thirst, starvation." },
        { name: "Shape-Shifting", desc: "Spend 1 round to transform into either a fat domestic cat (chester) or primal fey (wilder)." },
        { name: "Magic Resistance", desc: "+2 MR." },
        { name: "Vulnerable to Cold Iron", desc: "+1 damage taken from cold iron." },
      ]
    case Kindred.Human:
      return [
        { name: "Decisiveness", desc: "Humans act first in tied initiative rolls." },
        { name: "Leadership", desc: "+1 Loyalty Rating for retainers" },
        { name: "Spirited", desc: "+10% XP" },
      ]
    case Kindred.Mossling:
      return [
        { name: "Armour and Weapons", desc: "Needs tailored equipment." },
        { name: "Knacks", desc: "Knows 1 quasi-magical craft known as a knack." },
        { name: "Resilience", desc: "+4 to saving throws vs fungal spores and poisons, +2 to all other saving throws." },
        { name: "Symbiotic Flesh", desc: "Acquire random trait from table." },
      ]
    case Kindred.Woodgrue:
      return [
        { name: "Armour and Weapons", desc: "Needs tailored equipment." },
        { name: "Defensive Bonus", desc: "+2 AC vs large creatures." },
        { name: "Mad Revelry", desc: "Play an enchanted melody to cause others to do a particular action." },
        { name: "Moon Sight", desc: "Darkvision 60'" },
        { name: "Musical Instruments", desc: "Instruments deal 1d4 damage." },
        { name: "Starting Equipment", desc: "Starts with a wind instrument (add to equipment)." },
        { name: "Vulnerable to Cold Iron", desc: "+1 damage taken from cold iron." },
      ]
  }
}

