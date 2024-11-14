import { Component, For } from "solid-js"
import { useState } from "./state";
import { Kindred } from "./kindred";
import { CClass } from "./cClass";

export const Traits: Component = () => {
  const [char, setChar] = useState();

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
      <h3> {char().class} </h3>
      <ul class="list-disc pl-5">
        <For each={getClassTraits(char().class)}>
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
        { name: "Leadership", desc: "+1 Loyalty Rating for retainers." },
        { name: "Spirited", desc: "+10% XP." },
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
        { name: "Moon Sight", desc: "Darkvision 60'." },
        { name: "Musical Instruments", desc: "Can use instruments to deal 1d4 damage." },
        { name: "Starting Equipment", desc: "Starts with a wind instrument (add to equipment)." },
        { name: "Vulnerable to Cold Iron", desc: "+1 damage taken from cold iron." },
      ]
  }
}

function getClassTraits(charClass: CClass): Trait[] {
  switch (charClass) {
    case CClass.Bard:
      return [
        { name: "Counter Charm", desc: "While you play music, allies are immune to song magic and +2 against fairy magic." },
        { name: "Enchantment", desc: "Fascinate subjects with your music. Think pied piper." },
      ]
    case CClass.Cleric:
      return [
        { name: "Detect Holy Magic Items", desc: "Self-explanatory." },
        { name: "Holy Magic", desc: "Self-explanatory." },
        { name: "Holy Order", desc: "You are initiated into a Holy Order at level 2." },
        { name: "Langauges", desc: "Can speak Liturgic." },
        { name: "Turning the Undead", desc: "Drive off undead monsters." },
      ]
    case CClass.Enchanter:
      return [
        { name: "Detect Magic", desc: "Knows if object, place or creature is magical." },
        { name: "Fairy Runes", desc: "1 random lesser rune." },
        { name: "Glamours", desc: "1 random glamour." },
        { name: "Magic Items", desc: "Can use arcane scrolls/wands." },
        { name: "Resistance to Divine Aid", desc: "2-in-6 chance holy buffs have no effect." },
      ]
    case CClass.Fighter:
      return [
        { name: "Combat Talents", desc: "Select 1 special fighter talent." },
      ]
    case CClass.Friar:
      return [
        { name: "Armour of Faith", desc: "+2 AC (scales with level)." },
        { name: "Culinary Implements", desc: "Can use cooking items (even food) to deal 1d4 damage." },
        { name: "Herbalism", desc: "1 herb is enough for 2 subjects." },
        { name: "Holy Magic", desc: "Self-explanatory." },
        { name: "Langauges", desc: "Can speak Liturgic." },
        { name: "Poverty", desc: "Cannot store wealth. Only can have what they can hold." },
        { name: "Turning the Undead", desc: "Drive off undead monsters." },
      ]
    case CClass.Hunter:
      return [
        { name: "Animal Companion", desc: "Can forge a bond with an animal." },
        { name: "Missile Attacks", desc: "+1 Attack bonus for missile weapons." },
        { name: "Trophies", desc: "Trophy taken from slayed creature grants boon." },
        { name: "Wayfinding", desc: "3-in-6 chance to find path when lost." },
      ]
    case CClass.Knight:
      return [
        { name: "Chivalric Code", desc: "Must uphold stringent code of honour." },
        { name: "Horsemanship", desc: "Can learn HP of any steed. At level 5, can urge steed to greater haste." },
        { name: "Knighthood", desc: "At level 3, ascend from squire to knight, gaining hospitality of nobility." },
        { name: "Monster Slayer", desc: "At level 5, +2 Attack and Damage vs Large creatures." },
        { name: "Mounted Combat", desc: "+1 Attack while mounted." },
        { name: "Strength of Will", desc: "+2 Saving Throws against fairy magic and effects that cause fear." },
      ]
    case CClass.Magician:
      return [
        { name: "Arcane Magic", desc: "Self-explanatory." },
        { name: "Additional Skill", desc: "Select 1 skill (scales with level)." },
        { name: "Detect Magic", desc: "Knows if object, place or creature is magical." },
      ]
    case CClass.Thief:
      return [
        { name: "Back-stab", desc: "Deal deadly blows from behind with a dagger." },
        { name: "Theives' Cant", desc: "Secret language used to mask communication." },
      ]
  }
}
