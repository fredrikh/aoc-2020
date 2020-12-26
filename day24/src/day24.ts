type Pos = [number, number, number]
type Direction = 'w' | 'nw' | 'ne' | 'e' | 'se' | 'sw'
type Floor = Set<string>

const dirToPos: Record<Direction, Pos> = {
  w: [-1, 1, 0],
  nw: [0, 1, -1],
  ne: [1, 0, -1],
  e: [1, -1, 0],
  se: [0, -1, 1],
  sw: [-1, 0, 1]
}

const addPos = ([ax, ay, az]: Pos, [bx, by, bz]: Pos): Pos => [
  ax + bx,
  ay + by,
  az + bz
]

const position = (line: string) =>
  (line.match(/w|nw|ne|e|se|sw/g) as Direction[])
    .map((d) => dirToPos[d])
    .reduce(addPos, [0, 0, 0])

const flip = (pos: Pos, floor: Floor) => {
  const coordinates = pos.toString()
  if (floor.has(coordinates)) floor.delete(coordinates)
  else floor.add(coordinates)
}

export const fooA = (input: string[]) => {
  const floor: Floor = new Set<string>()

  input.map(position).forEach((pos) => flip(pos, floor))

  return floor.size
}

const adjacents = (pos: Pos) =>
  (['w', 'nw', 'ne', 'e', 'se', 'sw'] as Direction[]).map(
    (d: Direction): Pos => addPos(pos, dirToPos[d])
  )

const keyToPos = (key: string) => key.split(',').map(Number) as Pos

const adjacentBlacks = (pos: Pos, floor: Floor) =>
  adjacents(pos)
    .map((t) => floor.has(t.toString()))
    .filter(Boolean).length

export const fooB = (input: string[]) => {
  let floor: Floor = new Set<string>()
  let newFloor: Floor = new Set<string>()
  // Day 0
  input.map(position).forEach((pos) => flip(pos, floor))

  for (let day = 1; day <= 100; day++) {
    for (let tile of floor) {
      const adjacentTiles = adjacents(keyToPos(tile))
      const blacks = adjacentBlacks(keyToPos(tile), floor)
      // Any black tile with zero or more than 2 black tiles immediately adjacent to it is flipped to white.
      if (blacks === 1 || blacks === 2) newFloor.add(tile)

      adjacentTiles.forEach((pos) => {
        const blacks = adjacentBlacks(pos, floor)
        // Any white tile with exactly 2 black tiles immediately adjacent to it is flipped to black.
        if (blacks === 2) newFloor.add(pos.toString())
      })
    }
    floor = newFloor
    newFloor = new Set<string>()
  }
  return floor.size
}
