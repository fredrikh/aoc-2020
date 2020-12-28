import Tile from './tile'

export const foo = (input: string[]) => {
  const tiles = input.map((s) => new Tile(s))
  console.log(getCorners(tiles).reduce((a, b) => a * b))
}

const getCorners = (tiles: Tile[]) => {
  const borderCount: Record<number, number> = {}
  for (let i = 0; i < tiles.length - 1; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      const a = tiles[i]
      const b = tiles[j]
      if (hasMatchingBorders(a, b)) {
        // console.log('hasMatching borders', a.id, b.id)
        if (borderCount[a.id]) {
          borderCount[a.id] += 1
        } else {
          borderCount[a.id] = 1
        }
        if (borderCount[b.id]) {
          borderCount[b.id] += 1
        } else {
          borderCount[b.id] = 1
        }
      }
    }
  }
  const corners: number[] = []

  for (let id in borderCount)
    if (borderCount[id] === 2) corners.push(parseInt(id))

  return corners
}

const intersection = (setA: Set<string>, setB: Set<string>) => {
  let _intersection = new Set()
  for (let elem of setB) {
    if (setA.has(elem)) _intersection.add(elem)
  }
  return _intersection
}

const hasMatchingBorders = (a: Tile, b: Tile) => {
  let bordersA = new Set(a.borders)
  let bordersB = new Set(b.borders)

  return intersection(bordersA, bordersB).size > 0
}
