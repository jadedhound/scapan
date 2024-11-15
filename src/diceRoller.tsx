export function fromSeed(seed: number, sides: number): number {
  return Math.floor(seed * sides) + 1;
}

export function getSeed(): number {
  return Math.random();
}

export function genAbi(): number[] {
  return Array(6).fill(0).map((_) => {
    return d6() + d6() + d6();
  });
}

export function genAbiOpt(abi: number[]): number[] {
  const isValid = (abi: number[]): boolean => {
    const allLessThan8 = abi.filter(num => num <= 8).length >= 6;
    const twoVeryLow = abi.filter(num => num <= 6).length >= 2;
    // Is valid only if both requirements are false.
    return !(allLessThan8 || twoVeryLow)
  };
  if (isValid(abi)) {
    return abi
  } else {
    return genAbiOpt(genAbi())
  }
}

export function genHP(): number[] {
  return [d4(), d6(), d8()];
}

export function genOptHP(def: number[]): number[] {
  return def.map((val, i) => {
    let currVal = val;
    while (currVal <= 2) {
      currVal = fromSeed(getSeed(), (i * 2) + 4);
    }
    return currVal
  })
}

export function multiRoll(num: number, sides: number): number[] {
  return Array(num).fill(0).map((_) => fromSeed(getSeed(), sides))
}

function d4() { return fromSeed(getSeed(), 4) }
function d6() { return fromSeed(getSeed(), 6) }
function d8() { return fromSeed(getSeed(), 8) }

