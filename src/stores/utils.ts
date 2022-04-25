import { Antelope, NumberRange, SORTS } from "../types/data";

// Return all the values (from an array of object) for a given key without duplications
export function isolateFieldInArray<T, X extends keyof T>(
  values: T[],
  key: X
): T[X][] {
  const allValuesForKey: T[X][] = values.map((ant) => ant[key]);
  return [...new Set(allValuesForKey)];
}

export function getRangeFromArray(array: number[]): NumberRange {
  return { min: Math.min(...array), max: Math.max(...array) };
}

export function inRange(
  val: number,
  range: NumberRange,
  inclusive = true
): boolean {
  if (!inclusive) return val > range.min && val < range.max;
  return val >= range.min && val <= range.max;
}

export function sortAntelopesArray(
  antelopes: Antelope[],
  sortBy: SORTS
): Antelope[] {
  switch (sortBy) {
    case SORTS.HEIGHT_L_H:
      return antelopes.sort((ant1, ant2) => ant1.height - ant2.height);
    case SORTS.HEIGHT_H_L:
      return antelopes.sort((ant1, ant2) => ant2.height - ant1.height);
    case SORTS.WEIGHT_L_H:
      return antelopes.sort((ant1, ant2) => ant1.weight - ant2.weight);
    case SORTS.WEIGHT_H_L:
      return antelopes.sort((ant1, ant2) => ant2.weight - ant1.weight);
    case SORTS.NAME_A:
    default:
      return antelopes.sort((ant1, ant2) => ant1.name.localeCompare(ant2.name));
  }
}

export function getNbOfAntPerValueForAField(
  ants: Antelope[],
  field: "horns" | "continent"
) {
  const antPerCont: { [cont: string]: number } = {};

  ants.forEach((ant) => {
    if (antPerCont[ant[field]] === undefined) {
      antPerCont[ant[field]] = 1;
    } else {
      antPerCont[ant[field]] += 1;
    }
  });

  return antPerCont;
}
