/* eslint-disable import/prefer-default-export */

// Return all the values (from an array of object) for a given key without duplications
export function isolateFieldInArray<T, X extends keyof T>(
  values: T[],
  key: X
): T[X][] {
  const allValuesForKey: T[X][] = values.map((ant) => ant[key]);
  return [...new Set(allValuesForKey)];
}
