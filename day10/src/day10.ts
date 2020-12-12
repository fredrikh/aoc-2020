export const foo = (numbers: number[]) => {
  const xs = [0, ...numbers].sort((a, b) => a - b)
  xs.push(xs[xs.length - 1] + 3)

  const counter: Record<number, number> = { 1: 0, 2: 0, 3: 0 }
  const joltDiff = []
  for (let i = 0; i < xs.length - 1; i++) {
    const difference = xs[i + 1] - xs[i]

    counter[difference]++
    joltDiff.push(difference)
  }
  const variations: Record<number, number> = {
    1: 1,
    2: 2,
    3: 4,
    4: 7,
    5: 13
  }

  const p = joltDiff
    .join('')
    .match(/(1+)/g)
    ?.map((s) => s.length)
    .reduce((product, factor) => product * variations[factor], 1)

  return [counter[1] * counter[3], p]
}

// 11 =>2
// 111 => 4
// 1111 => 7
// 11111 => 13
// 111111 => 24
