type Pattern = number[][]
type Slope = {
  right: number
  down: number
}

export const checkSlope = (pattern: Pattern, slope: Slope): number => {
  const height = pattern.length
  const width = pattern[0].length
  let treeCount = 0
  for (let h = 0, w = 0; h < height; h += slope.down, w += slope.right) {
    treeCount += pattern[h][w % width]
  }
  return treeCount
}

export const checkSlopes = (pattern: Pattern, slopes: Slope[]): number =>
  slopes.reduce((product, slope) => product * checkSlope(pattern, slope), 1)
