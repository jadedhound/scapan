import { createSignal, createContext, useContext, Signal, createEffect } from "solid-js";
import { fromSeed, genAbi, genAbiOpt, genHP, genOptHP, getSeed, multiRoll } from "./diceRoller";
import { Kindred } from "./kindred";
import { CClass } from "./cClass";
import { genTimeout } from "./reroll";
import { adventuring } from "./equipment";

const stateKey: string = "state";

export type State = {
  version: string,
  abi: number[],
  abiOptional: number[],
  useOptAbi: boolean,
  hp: number[],
  hpAlt: number[],
  useOptHP: boolean,
  kindred: Kindred,
  class: CClass,
  adventuring: number[],
  weapons: number[],
  armour: number,
  gp: number,
  useSlots: boolean,
  timeout: number,
}

function genDefaultState(): State {
  const abi = genAbi();
  const hp = genHP();
  return {
    version: APP_VERSION,
    abi,
    abiOptional: genAbiOpt(abi),
    useOptAbi: false,
    hp,
    hpAlt: genOptHP(hp),
    useOptHP: false,
    kindred: Kindred.Human,
    class: CClass.Fighter,
    adventuring: multiRoll(4, adventuring.length),
    weapons: multiRoll(4, 6),
    armour: fromSeed(getSeed(), 6),
    gp: multiRoll(4, 6).reduce((acc, curr) => acc + curr, 0),
    useSlots: false,
    timeout: genTimeout(),
  }
}

/** Reroll all randomly chosen state but keep user selected ones. */
export function regenState(prev: State): State {
  return {
    ...genDefaultState(),
    useOptAbi: prev.useOptAbi,
    useOptHP: prev.useOptHP,
    class: prev.class,
    kindred: prev.kindred,
  }
}

/** Retrieve previous state from storage, default rerolled state if not found
or if the version doesn't match (schema change). */
function fromStorage(): State {
  const stored = localStorage.getItem(stateKey);
  if (stored === null) { return genDefaultState() }
  const prev = JSON.parse(stored) as State;
  if (prev && prev?.version === APP_VERSION) {
    return prev
  } else {
    return genDefaultState()
  }
}

const StateContext = createContext();

export const StateProvider = (props: any) => {
  const state = createSignal(fromStorage(), { equals: false });
  createEffect(() => {
    const curr = JSON.stringify(state[0]());
    localStorage.setItem(stateKey, curr);
  });
  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useState(): Signal<State> {
  return useContext(StateContext) as Signal<State>
}
