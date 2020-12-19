type Grid = Set<string>

export const foo = (input: string[]) => {
  let grid = initGrid(input)

  for (let i = 0; i < 6; i++) grid = cycle(grid)

  return grid.size
}

const initGrid = (input: string[]) => {
  // y   z
  // |  /
  // | /
  // |/______x
  const init = input.reverse().map((s) => [...s].map((c) => c === '#'))
  const size = input.length
  const grid: Grid = new Set()

  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++)
      if (init[y][x]) grid.add([x, y, 0, 0].toString())

  return grid
}

const countNeighbors = (grid: Grid, [x, y, z, w]: number[]) => {
  let neighbors = 0
  for (let nx = -1; nx <= 1; nx++)
    for (let ny = -1; ny <= 1; ny++)
      for (let nz = -1; nz <= 1; nz++)
        for (let nw = -1; nw <= 1; nw++)
          if (grid.has([x + nx, y + ny, z + nz, w + nw].toString())) neighbors++

  return neighbors
}

const meAndMyNeighbors = ([x, y, z, w]: number[]) => {
  const positions = []
  for (let nx = -1; nx <= 1; nx++)
    for (let ny = -1; ny <= 1; ny++)
      for (let nz = -1; nz <= 1; nz++)
        for (let nw = -1; nw <= 1; nw++)
          positions.push([x + nx, y + ny, z + nz, w + nw])

  return positions
}

const newState = (grid: Grid, pos: number[]) => {
  const active = grid.has(pos.toString())
  const neighbors = countNeighbors(grid, pos) - (active ? 1 : 0)

  return active ? [2, 3].includes(neighbors) : 3 === neighbors
}

const cycle = (grid: Grid) => {
  const nextGen: Grid = new Set()

  grid.forEach((pos) => {
    const p = pos.split(',').map(Number)
    meAndMyNeighbors(p).forEach((np) => {
      if (newState(grid, np)) nextGen.add(np.toString())
    })
  })

  return nextGen
}
