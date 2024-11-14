export function fromSeed(seed: number, sides: number): number {
  return Math.floor(seed * sides) + 1;
}

export function getSeed(): number {
  return Math.random();
}

export function genAbilityArray(): number[] {
  return Array(6).fill(0).map((_) => {
    return d6() + d6() + d6();
  });
}

export function genAbiOptional(abi: number[]): number[] {
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

export function genHP(opt?: boolean): number[] {
  const result = [d4(), d6(), d8()];
  if (opt) {
    if (result.find((val) => val <= 2)) {
      return genHP(opt)
    } else {
      return result
    }
  } else {
    return result
  }
}

function d4() { return fromSeed(getSeed(), 4) }
function d6() { return fromSeed(getSeed(), 6) }
function d8() { return fromSeed(getSeed(), 8) }

