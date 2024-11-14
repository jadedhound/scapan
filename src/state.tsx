import { createSignal, createContext, useContext, Signal, createEffect } from "solid-js";
import { fromSeed, genAbilityArray, genAbiOptional, genHP, getSeed } from "./diceRoller";
import { Kindred } from "./kindred";
import { CClass } from "./cClass";
import { genTimeout } from "./reroll";

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
  timeout: number,
}

function genDefaultState(): State {
  const abi = genAbilityArray();
  return {
    version: APP_VERSION,
    abi,
    abiOptional: genAbiOptional(abi),
    useOptAbi: false,
    hp: genHP(),
    hpAlt: genHP(true),
    useOptHP: false,
    kindred: Kindred.Human,
    class: CClass.Fighter,
    adventuring: Array(4).fill(0).map((_) => fromSeed(getSeed(), 20)),
    timeout: genTimeout(),
  }
}

export function regenState(prev: State): State {
  return {
    ...genDefaultState(),
    useOptAbi: prev.useOptAbi,
    class: prev.class,
    kindred: prev.kindred,
  }
}

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
