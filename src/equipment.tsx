import { Component, For } from "solid-js";

export const Equipment: Component = () => {
  const general: [string, number][] = [["Common Clothes", 30], ["Backpack", 50], ["Belt Pouch", 10], ["2 preserved rations", 40], ["Tinderbox", 10], ["Waterskin", 50]];

  return (
    <div>
      <h2>Equipment</h2>
      <table class="w-full [&>*>*>td]:px-2">
        <thead>
          <tr class="border-b-2 border-amber-900 font-bold">
            <td>Item</td>
            <td class="w-8">Weight</td>
          </tr>
        </thead>
        <tbody class="[&>:nth-child(even)]:bg-amber-600/20 [&>*>:nth-child(even)]:text-center">
          <tr class="!bg-transparent"><td colspan="2" class="text-center italic">General</td></tr>
          <For each={general}>
            {(item) => (
              <tr>
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>
            )}
          </For>
          <tr class="!bg-transparent"><td colspan="2" class="text-center italic">Class</td></tr>
          <tr class="!bg-transparent"><td colspan="2" class="text-center italic">Adventuring</td></tr>
        </tbody>
      </table>
      <p><b>Starting Gold:</b> </p>
      <p><b>Trinket:</b> An odd, possibly slightly magical item, rolled on the trinkets table for your character’s Kindred.</p>
    </div>
  )
}

