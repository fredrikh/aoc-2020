export const fooA = (numbers: number[], preamble: number) => {
  for (let i = 0; i < numbers.length - preamble; i++) {
    if (!isValid(numbers[i + preamble], numbers.slice(i, i + preamble)))
      return numbers[i + preamble]
  }

  return -1
}

const isValid = (n: number, numbers: number[]) => {
  const sums: number[] = []
  for (let i = 0; i < numbers.length - 1; i++)
    for (let j = i + 1; j < numbers.length; j++)
      if (numbers[i] !== numbers[j]) sums.push(numbers[i] + numbers[j])

  return sums.includes(n)
}

export const fooB = (numbers: number[], target: number) => {
  for (let i = 0; i < numbers.length - 1; i++) {
    let sum = numbers[i]
    for (let j = i + 1; j < numbers.length; j++) {
      sum += numbers[j]
      if (sum === target) return sumOfMinMax(numbers.slice(i, j + 1))

      if (sum > target) break
    }
    sum = 0
  }
  return 0
}

const sumOfMinMax = (numbers: number[]) => {
  const xs = [...numbers].sort((a, b) => a - b)
  return xs[0] + xs[xs.length - 1]
}
