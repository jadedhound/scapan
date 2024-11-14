import { Component, createEffect, createSignal } from "solid-js"
import { regenState, useState } from "./state";

export const Reroll: Component = () => {
  const [char, setChar] = useState();
  const [now, setNow] = createSignal(Date.now());
  const getWaitTime = () => Math.max(0, char().timeout - now());
  createEffect(async () => {
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    if (getWaitTime() > 0) {
      await sleep(1 * 1000)
      setNow((_) => Date.now())
    }
  });
  const isDisabled = () => getWaitTime() > 0;
  const rerollCharacter = () => setChar((prev) => regenState(prev))
  const btnText = () => {
    const sec = Math.ceil(getWaitTime() / 1000);
    return isDisabled() ? `reroll timeout: ${sec} secs` : "reroll"
  }


  return (
    <div class="md:col-span-2 lg:col-span-3 mx-auto text-center mb-4">
      <button
        class="bg-amber-700 border-2 border-transparent rounded p-4 font-bold uppercase w-full md:w-[50vw] lg:w-[25vw] disabled:bg-transparent disabled:border-stone-400 disabled:text-stone-400"
        onclick={() => rerollCharacter()}
        disabled={isDisabled()}
      >
        {btnText()}
      </button>
    </div>
  )
}

export function genTimeout(): number {
  return Date.now() + (0.1 * 60 * 1000);
}

