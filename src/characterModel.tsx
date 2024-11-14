import { createSignal, createContext, useContext, Signal } from "solid-js";
import { genAbilityArray, getSeed } from "./diceRoller";
import { Kindred } from "./kindred";
import { CharClass } from "./charClass";
import { genTimeout } from "./reroll";

export type CharModel = {
  abi: number[],
  abiOptional: number[],
  useOptional: boolean,
  hp: number,
  kindred: Kindred,
  class: CharClass,
  timeout: number,
}

export function genDefaultCharModel(): CharModel {
  const abi = genAbilityArray();
  return {
    abi,
    abiOptional: genAbiOptional(abi),
    useOptional: false,
    hp: getSeed(),
    kindred: Kindred.Human,
    class: CharClass.Fighter,
    timeout: genTimeout(),
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

const CharModelContext = createContext();

export const CharacterModelProvider = (props: any) => {
  const charSignal = createSignal(genDefaultCharModel(), { equals: false });
  return (
    <CharModelContext.Provider value={charSignal}>
      {props.children}
    </CharModelContext.Provider>
  );
}

export function useCharModel(): Signal<CharModel> {
  return useContext(CharModelContext) as Signal<CharModel>
}
