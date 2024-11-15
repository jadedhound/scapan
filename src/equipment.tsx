import { Component, createEffect, createSignal, For } from "solid-js";
import { useState } from "./state";
import { CClass } from "./cClass";

export const Equipment: Component = () => {
  const [char, _] = useState();
  return (
    <div class="flex flex-col gap-2">
      <h2>Equipment</h2>
      <table id="equipment" class="w-full [&>*>*>td]:px-2">
        <thead>
          <tr class="border-b-2 border-amber-900 font-bold">
            <td>Item</td>
            <td class="w-8">Weight</td>
          </tr>
        </thead>
        <tbody class="[&>:nth-child(even)]:bg-amber-600/20 [&>*>:nth-child(even)]:text-center">
          <tr class="!bg-transparent"><td colspan="2" class="text-center italic">General</td></tr>
          <ItemView array={general} />
          <tr>
            <td>Belt pouch + {char().gp}gp </td>
            <td>{10 + char().gp}</td>
          </tr>
          <tr class="!bg-transparent"><td colspan="2" class="text-center italic">Class</td></tr>
          <ItemView array={getClass()} />
          <tr class="!bg-transparent"><td colspan="2" class="text-center italic">Adventuring</td></tr>
          <ItemView array={getAdventuring()} />
        </tbody>
      </table>
      <TotalWeight />
      <p><b>^Small Characters:</b> Small characters can't carry large items.</p>
      <p><b>*Adjust based on Selection:</b> The weight listed is for the heavier of the two items. Reduce the weight if picking a lighter item.</p>
      <p><b>Trinket:</b> An odd, possibly slightly magical item, rolled on the trinkets table for your character’s Kindred.</p>
    </div>
  )
}

export const TotalWeight: Component = () => {
  const [char, _] = useState();
  const [weight, setWeight] = createSignal(0);

  // Gets past the problem of the table being created after this
  // calculation is down.
  createEffect(async () => {
    char().adventuring;
    const rowHTML = (document.getElementById("equipment") as HTMLTableElement)?.rows;
    if (rowHTML === undefined) { return 0 }
    const rowArray: HTMLTableRowElement[] = [].slice.call(rowHTML);
    const result = rowArray.map((r) => {
      const num = parseInt(r.cells[1]?.innerHTML);
      return isNaN(num) ? 0 : num
    }).reduce((acc, curr) => acc + curr, 0)
    setWeight((_) => result)
  });

  return (
    <div class="border-2 border-stone-200 p-2 text-center w-full text-amber-500 font-bold">
      Total Weight: {weight()}
    </div>
  )
}

export function ItemView(props: { array: Item[] }) {
  return (
    <For each={props.array}>
      {(item) => (
        <tr>
          <td>{item.name}</td>
          <td>{item.weight}</td>
        </tr>
      )}
    </For>
  )
}

type Item = {
  name: string,
  weight: number,
  slots: number,
}

const general: Item[] = [
  { name: "Common Clothes", weight: 30, slots: 1 },
  { name: "Backpack", weight: 50, slots: 0 },
  { name: "2 preserved rations", weight: 40, slots: 1 },
  { name: "Tinderbox", weight: 10, slots: 1 },
  { name: "Waterskin", weight: 50, slots: 1 }
];
export const adventuring: Item[] = [
  { name: "Bedroll", weight: 70, slots: 1 },
  { name: "Chalk (10 sticks)", weight: 10, slots: 1 },
  { name: "Chisel", weight: 20, slots: 1 },
  { name: "Cooking pots", weight: 100, slots: 1 },
  { name: "Crowbar", weight: 50, slots: 1 },
  { name: "Firewood (bundle)", weight: 200, slots: 1 },
  { name: "Grappling hook", weight: 40, slots: 1 },
  { name: "Ink, quill, 5 sheets paper", weight: 6, slots: 1 },
  { name: "Iron spikes (12)", weight: 60, slots: 1 },
  { name: "Lantern (hooded)", weight: 20, slots: 1 },
  { name: "Marbles (bag of 20)", weight: 20, slots: 1 },
  { name: "Oil flash", weight: 10, slots: 1 },
  { name: "Rope (50')", weight: 100, slots: 1 },
  { name: "Sack", weight: 5, slots: 1 },
  { name: "Shovel", weight: 50, slots: 1 },
  { name: "Sledgehammer", weight: 100, slots: 1 },
  { name: "Small hammer", weight: 30, slots: 1 },
  { name: "Tent", weight: 20, slots: 1 },
  { name: "Torches (3)", weight: 30, slots: 1 },
  { name: "Twine (100' ball)", weight: 10, slots: 1 },
];

function getAdventuring(): Item[] {
  const [char, _] = useState();
  return char().adventuring.map((i) => adventuring[i])
}

type ClassItems = {
  armour: Item[],
  weapons: Item[],
  multiWeap: boolean,
  extra?: Item,
}

function getClass(): Item[] {
  const [char, _] = useState();
  const curr = char();
  const classItems = getClassItems(curr.class);
  let items = [];
  items.push(classItems.armour[curr.armour - 1]);
  items.push(classItems.weapons[curr.weapons[0] - 1]);
  if (classItems.multiWeap) { items.push(classItems.weapons[curr.weapons[1] - 1]); }
  if (classItems.extra) { items.push(classItems.extra) }
  return items
}

function getClassItems(cClass: CClass): ClassItems {
  switch (cClass) {
    case CClass.Bard:
      return {
        armour: [
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "Leather armour", weight: 200, slots: 1 },
          { name: "Leather armour", weight: 200, slots: 1 },
          { name: "Chainmail", weight: 400, slots: 2 },
          { name: "Chainmail", weight: 400, slots: 2 },
        ],
        weapons: [
          { name: "Club", weight: 20, slots: 1 },
          { name: "3 daggers", weight: 30, slots: 3 },
          { name: "Longsword", weight: 30, slots: 1 },
          { name: "Sling + 20 stones", weight: 30, slots: 2 },
          { name: "Shortbow + 20 arrows", weight: 40, slots: 2 },
          { name: "Shortsword", weight: 20, slots: 1 },
        ],
        multiWeap: true,
        extra: { name: "Musical Instrument (stringed or wind)", weight: 50, slots: 1 },
      }
    case CClass.Cleric:
      return {
        armour: [
          { name: "Leather armour", weight: 200, slots: 1 },
          { name: "Leather armour + shield", weight: 300, slots: 2 },
          { name: "Chainmail", weight: 400, slots: 2 },
          { name: "Chainmail + shield", weight: 500, slots: 3 },
          { name: "Plate mail", weight: 500, slots: 3 },
          { name: "Plate mail + shield", weight: 600, slots: 4 },
        ],
        weapons: [
          { name: "Dagger", weight: 10, slots: 1 },
          { name: "Longsword", weight: 30, slots: 1 },
          { name: "Mace", weight: 40, slots: 1 },
          { name: "Shortbow + 20 arrows", weight: 40, slots: 2 },
          { name: "Shortsword", weight: 20, slots: 1 },
          { name: "Warhammer", weight: 40, slots: 1 },
        ],
        multiWeap: true,
        extra: { name: "Wooden holy symbol", weight: 10, slots: 0 },
      }
    case CClass.Enchanter:
      return {
        armour: [
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "Leather armour", weight: 200, slots: 1 },
          { name: "Leather armour", weight: 200, slots: 1 },
          { name: "Chainmail", weight: 400, slots: 2 },
          { name: "Chainmail", weight: 400, slots: 2 },
        ],
        weapons: [
          { name: "Club", weight: 20, slots: 1 },
          { name: "Dagger", weight: 10, slots: 1 },
          { name: "Longsword", weight: 30, slots: 1 },
          { name: "Shortbow + 20 arrows", weight: 40, slots: 2 },
          { name: "Spear", weight: 30, slots: 1 },
          { name: "Staff", weight: 40, slots: 1 },
        ],
        multiWeap: true,
      }
    case CClass.Fighter:
      return {
        armour: [
          { name: "Leather armour", weight: 200, slots: 1 },
          { name: "Leather armour + shield", weight: 300, slots: 2 },
          { name: "Chainmail", weight: 400, slots: 2 },
          { name: "Chainmail + shield", weight: 500, slots: 3 },
          { name: "Plate mail", weight: 500, slots: 3 },
          { name: "Plate mail + shield", weight: 600, slots: 4 },
        ],
        weapons: [
          { name: "Crossbow + 20 quarrels", weight: 70, slots: 2 },
          { name: "Dagger", weight: 10, slots: 1 },
          { name: "Longsword", weight: 30, slots: 1 },
          { name: "Mace", weight: 40, slots: 1 },
          { name: "Shortsword", weight: 20, slots: 1 },
          { name: "Spear", weight: 30, slots: 1 },
        ],
        multiWeap: true,
      }
    case CClass.Friar:
      return {
        armour: [
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
        ],
        weapons: [
          { name: "Club", weight: 20, slots: 1 },
          { name: "Dagger", weight: 10, slots: 1 },
          { name: "Sling + 20 stones", weight: 30, slots: 2 },
          { name: "Sling + 20 stones", weight: 30, slots: 2 },
          { name: "Staff", weight: 40, slots: 1 },
          { name: "Staff", weight: 40, slots: 1 },
        ],
        multiWeap: false,
        extra: { name: "Friar's habit, wooden holy symbol", weight: 40, slots: 1 },
      }
    case CClass.Hunter:
      return {
        armour: [
          { name: "Leather armour", weight: 200, slots: 1 },
          { name: "Leather armour", weight: 200, slots: 1 },
          { name: "Leather armour", weight: 200, slots: 1 },
          { name: "Leather armour + shield", weight: 300, slots: 2 },
          { name: "Leather armour + shield", weight: 300, slots: 2 },
          { name: "Leather armour + shield", weight: 300, slots: 2 },
        ],
        weapons: [
          { name: "Dagger", weight: 10, slots: 1 },
          { name: "Longsword", weight: 30, slots: 1 },
          { name: "Longbow/shortbow^* + 20 arrows", weight: 60, slots: 3 },
          { name: "Longbow/shortbow^* + 20 arrows", weight: 60, slots: 3 },
          { name: "Shortsword", weight: 30, slots: 1 },
          { name: "Sling + 20 stones", weight: 30, slots: 2 },
        ],
        multiWeap: true,
      }
    case CClass.Knight:
      return {
        armour: [
          { name: "Chainmail", weight: 400, slots: 2 },
          { name: "Chainmail + shield", weight: 500, slots: 3 },
          { name: "Chainmail + shield", weight: 500, slots: 3 },
          { name: "Plate mail", weight: 500, slots: 3 },
          { name: "Plate mail + shield", weight: 600, slots: 4 },
          { name: "Plate mail + shield", weight: 600, slots: 4 },
        ],
        weapons: [
          { name: "Dagger", weight: 10, slots: 1 },
          { name: "Lance/Spear^*", weight: 100, slots: 1 },
          { name: "Lance/Spear^*", weight: 100, slots: 1 },
          { name: "Lance/Spear^*", weight: 100, slots: 1 },
          { name: "Longsword", weight: 30, slots: 1 },
          { name: "Mace", weight: 40, slots: 1 },
        ],
        multiWeap: true,
      }
    case CClass.Magician:
      return {
        armour: [
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
        ],
        weapons: [
          { name: "Dagger", weight: 10, slots: 1 },
          { name: "Dagger", weight: 10, slots: 1 },
          { name: "Dagger", weight: 10, slots: 1 },
          { name: "Staff", weight: 40, slots: 1 },
          { name: "Staff", weight: 40, slots: 1 },
          { name: "Staff", weight: 40, slots: 1 },
        ],
        multiWeap: false,
        extra: { name: "Ritual robes + spellbook", weight: 80, slots: 1 },
      }
    case CClass.Thief:
      return {
        armour: [
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "No Armour", weight: 0, slots: 0 },
          { name: "Leather armour", weight: 200, slots: 1 },
          { name: "Leather armour", weight: 200, slots: 1 },
          { name: "Leather armour", weight: 200, slots: 1 },
        ],
        weapons: [
          { name: "Club", weight: 20, slots: 1 },
          { name: "3 daggers", weight: 30, slots: 3 },
          { name: "Longsword", weight: 30, slots: 1 },
          { name: "Shortbow + 20 arrows", weight: 40, slots: 2 },
          { name: "Shortsword", weight: 20, slots: 1 },
          { name: "Sling + 20 stones", weight: 30, slots: 2 },
        ],
        multiWeap: true,
        extra: { name: "Thieves' tools", weight: 10, slots: 1 },
      }
  }
}
