export function fromSeed(seed: number, sides: number): number {
  return Math.floor(seed * sides) + 1;
}

export function getSeed(): number {
  return Math.random();
}

export function genAbilityArray(): number[] {
  return Array(6).fill(0).map((_) => {
    const d6 = () => fromSeed(getSeed(), 6);
    return d6() + d6() + d6();
  });
}
