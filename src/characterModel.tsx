import { createSignal, createContext, useContext, Signal } from "solid-js";
import { genAbilityArray, getSeed } from "./diceRoller";

export type CharModel = {
  abi: number[];
  abiOptional: number[];
  hp: number;
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
  const abi = genAbilityArray();
  const model: CharModel = {
    abi,
    abiOptional: genAbiOptional(abi), 
    hp: getSeed(),
  };
  const charSignal = createSignal(model);
  return (
    <CharModelContext.Provider value={ charSignal }>
      { props.children }
    </CharModelContext.Provider>
  );
}

export function useCharModel(): Signal<CharModel> { return useContext(CharModelContext) as Signal<CharModel>}
