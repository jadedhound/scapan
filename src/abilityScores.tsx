import { createSignal, For, type Component } from 'solid-js';
import { State, useState } from './state';

export const AbilityScores: Component = () => {
  const [char, setChar] = useState();
  const abi = () => {
    if (char().useOptional) { return char().abiOptional } else { return char().abi }
  }
  const changeOpt = () => {
    setChar((prev) => {
      prev.useOptional = !prev.useOptional;
      return prev
    })
  }

  return (
    <div class="flex flex-col gap-2">
      <h2>Ability Scores</h2>
      <div class="grid grid-cols-6 text-center border-2 border-stone-200 rounded p-2 [&>*]:p-2 [&>:nth-child(even)]:bg-amber-950">
        <div class="font-bold mb-[-1px]">STR</div>
        <div class="font-bold mb-[-1px]">DEX</div>
        <div class="font-bold mb-[-1px]">CON</div>
        <div class="font-bold mb-[-1px]">WIS</div>
        <div class="font-bold mb-[-1px]">INT</div>
        <div class="font-bold mb-[-1px]">CHA</div>
        <For each={abi()}>
          {(item) => (
            <div>
              {item}
              <br />
              ({scoreToMod(item)})
            </div>
          )}
        </For>
      </div>
      <div class="flex gap-2 items-center">
        <input
          type="checkbox"
          name="optionalReroll"
          class="w-8 h-8"
          checked={char().useOptional}
          onChange={(_) => changeOpt()}
        />
        <label for="optionalReroll">
          <b>Optional Rule: </b>
          Reroll character if scores are all 8 or lower or if 2 or more scores are 6 or lower
        </label>
      </div>
    </div>
  )
}

export function scoreToMod(score: number): [string, number] {
  if (score <= 3) { return ["-", 3] }
  else if (score <= 5) { return ["-", 2] }
  else if (score <= 8) { return ["-", 1] }
  else if (score <= 12) { return ["+", 0] }
  else if (score <= 15) { return ["+", 1] }
  else if (score <= 17) { return ["+", 2] }
  else { return ["+", 3] }
};
