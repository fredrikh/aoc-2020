export const find2Entries = (
  numbers: number[],
  targetSum: number
): number[] => {
  if (numbers.length < 2) return []

  const [x, ...xs] = numbers
  const target = targetSum - x

  if (xs.includes(target)) return [x, target]

  return find2Entries(xs, targetSum)
}

export const find3Entries = (
  numbers: number[],
  targetSum: number
): number[] => {
  if (numbers.length < 3) return []

  const [x, ...xs] = numbers
  const target = targetSum - x

  const [y, z] = find2Entries(xs, target)

  if (y && z) return [x, y, z]

  return find3Entries(xs, targetSum)
}
