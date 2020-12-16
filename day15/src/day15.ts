export const foo = (startingNumbers: number[], turns: number) => {
  let numbersSpoken: Record<number, number> = {}
  let lastSpoken = startingNumbers[startingNumbers.length - 1]

  startingNumbers.forEach((n, i) => {
    numbersSpoken[n] = i + 1
  })
  let buff = []
  // console.log(numbersSpoken, lastSpoken)
  for (let turn = startingNumbers.length + 1; turn <= turns; turn++) {
    if (numbersSpoken[lastSpoken] === undefined) {
      numbersSpoken[lastSpoken] = turn - 1
      lastSpoken = 0
    } else {
      let diff = turn - 1 - numbersSpoken[lastSpoken]
      numbersSpoken[lastSpoken] = turn - 1
      lastSpoken = diff
    }
    buff.push(lastSpoken)
    if (turn % 40 === 0) {
      // console.log(buff.join(','))
      buff = []
    }
  }
  // console.log(buff.join(','))
  return lastSpoken
}
