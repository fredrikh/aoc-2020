const ROW = 0
const COL = 1
type Pos = [number, number]
type PosState = '.' | 'L' | '#'
export type Layout = PosState[][]
const directions: Pos[] = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1]
]

const addPos = (a: Pos, b: Pos): Pos => [a[ROW] + b[ROW], a[COL] + b[COL]]

export const foo = (layout: Layout) => {
  let [prev, last] = seatingRound(layout)

  while (seatingsDiffer(prev, last)) [prev, last] = seatingRound(last)

  return occupiedSeats(last)
}

const getLayoutBounds = (layout: Layout) => [layout.length, layout[0].length]

const getNextState = (pos: Pos, layout: Layout): PosState => {
  const [rows, cols] = getLayoutBounds(layout)

  const validPos = ([row, col]: Pos) =>
    row >= 0 && row < rows && col >= 0 && col < cols
  const isPosState = ([row, col]: Pos, state: PosState[]) =>
    validPos([row, col]) && state.includes(layout[row][col])
  const isSeat = ([row, col]: Pos) => isPosState([row, col], ['#', 'L'])
  const isEmpty = ([row, col]: Pos) => isPosState([row, col], ['L'])
  const isOccupied = ([row, col]: Pos) => isPosState([row, col], ['#'])
  // part 1
  // const adjacentCount = (origin: Pos) =>
  //   directions.map((d) => isOccupied(addPos(origin, d))).filter(Boolean).length
  // part 2
  const adjacentCount2 = (origin: Pos) =>
    directions.map((d) => canSee(origin, d)).filter(Boolean).length
  const canSee = (origin: Pos, direction: Pos) => {
    let linePos = addPos(origin, direction)
    while (validPos(linePos)) {
      if (isSeat(linePos)) return isOccupied(linePos)
      linePos = addPos(linePos, direction)
    }
    return false
  }

  if (isSeat(pos)) {
    const adjacents = adjacentCount2(pos)
    if (isEmpty(pos) && adjacents === 0) {
      return '#'
    } else if (isOccupied(pos) && adjacents >= 5) {
      return 'L'
    }
  }
  return layout[pos[ROW]][pos[COL]]
}

const seatingRound = (layout: Layout) => {
  const newLayout = copyLayout(layout)
  const [rows, cols] = getLayoutBounds(layout)

  for (let row = 0; row < rows; row++)
    for (let col = 0; col < cols; col++)
      newLayout[row][col] = getNextState([row, col], layout)

  return [layout, newLayout]
}

const copyLayout = (layout: Layout) => layout.map((row) => [...row])

const occupiedSeats = (layout: Layout) =>
  layout.map((r) => r.filter((s) => s === '#').length).reduce((a, b) => a + b)

const seatingsDiffer = (a: Layout, b: Layout) =>
  JSON.stringify(a) !== JSON.stringify(b)

// const printLayout = (layout: Layout) => {
//   console.log('--- -- -')
//   console.log(layout.map((row) => row.join('')).join('\n'))
//   console.log('- -- ---')
// }
