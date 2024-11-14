import { createSignal, createContext, useContext, Signal } from "solid-js";
import { genAbilityArray, getSeed } from "./diceRoller";
import { Kindred } from "./kindred";
import { CClass } from "./cClass";
import { genTimeout } from "./reroll";

export type State = {
  abi: number[],
  abiOptional: number[],
  useOptional: boolean,
  hp: number,
  kindred: Kindred,
  class: CClass,
  timeout: number,
}

function genDefaultState(): State {
  const abi = genAbilityArray();
  return {
    abi,
    abiOptional: genAbiOptional(abi),
    useOptional: false,
    hp: getSeed(),
    kindred: Kindred.Human,
    class: CClass.Fighter,
    timeout: genTimeout(),
  }
}

export function regenState(prev: State): State {
  return {
    ...genDefaultState(),
    useOptional: prev.useOptional,
    class: prev.class,
    kindred: prev.kindred,
  }
}

function genAbiOptional(abi: number[]): number[] {
  const isValid = (abi: number[]): boolean => {
    const allLessThan8 = abi.filter(num => num <= 8).length >= 6;
    const twoVeryLow = abi.filter(num => num <= 6).length >= 2;
    // Is valid only if both requirements are false.
    return !(allLessThan8 || twoVeryLow)
  };
  if (isValid(abi)) {
    return abi
  } else {
    return genAbiOptional(genAbilityArray())
  }
}

const StateContext = createContext();

export const StateProvider = (props: any) => {
  const state = createSignal(genDefaultState(), { equals: false });
  return (
    <StateContext.Provider value={state}>
      {props.children}
    </StateContext.Provider>
  );
}

export function useState(): Signal<State> {
  return useContext(StateContext) as Signal<State>
}
