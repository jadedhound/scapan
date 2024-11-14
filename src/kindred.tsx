import { Component, For } from "solid-js"
import { State, useState } from "./state"
import { CClass } from "./cClass";

export enum Kindred {
  Breggle = "Breggle",
  Elf = "Elf",
  Grimalkin = "Grimalkin",
  Human = "Human",
  Mossling = "Mossling",
  Woodgrue = "Woodgrue",
}

export const KindredView: Component = () => {
  const [char, setChar] = useState();
  const isCurrent = (kindred: Kindred): boolean => {
    return char().kindred == kindred;
  };
  const isDisabled = (kindred: Kindred): boolean => {
    const currChar = char();
    const isHoly = currChar.class == CClass.Cleric || currChar.class == CClass.Friar;
    const isFairy = kindred == Kindred.Grimalkin || kindred == Kindred.Elf;
    if (isHoly && isFairy) { return true } else { return false }
  }
  const setCurrent = (kindred: Kindred) => {
    if ((document.getElementById(kindred) as any).disabled) { return true }

    setChar((prev: State) => {
      prev.kindred = kindred;
      return prev;
    });
  }

  return (
    <div>
      <h2>Kindred</h2>
      <div class="grid grid-cols-3 gap-2">
        <For each={Object.keys(Kindred)}>
          {(item) => (
            <div>
              <input
                type="radio"
                name="kindred"
                id={item}
                value={item}
                checked={isCurrent(item as Kindred)}
                disabled={isDisabled(item as Kindred)}
              />
              <label
                for={item}
                onclick={(_) => setCurrent(item as Kindred)}
              >
                {item}
              </label>
            </div>
          )}
        </For>
      </div>
    </div>
  )
}

