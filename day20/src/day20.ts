import Tile from './tile'

export const foo = (input: string[]) =>
  matchTiles(input.map((s) => new Tile(s))).reduce((a, b) => a * b)

export const foo2 = (input: string[]) => {
  console.log(matchTiles(input.map((s) => new Tile(s))))
}

const matchTiles = (tiles: Tile[]) => {
  for (let i = 0; i < tiles.length - 1; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      const a = tiles[i]
      const b = tiles[j]
      const matchingBorder = getMatchingBorder(a, b)
      if (matchingBorder.length) {
        a.addMatch(b.id)
        b.addMatch(a.id)
      }
    }
  }
  return tiles.filter((tile) => tile.connections === 2).map((tile) => tile.id)
}

const intersection = (a: string[], b: string[]) => {
  const setA = new Set(a)
  const setB = new Set(b)
  let _intersection = new Set()
  for (let elem of setB) {
    if (setA.has(elem)) _intersection.add(elem)
  }
  return [..._intersection]
}

const getMatchingBorder = (a: Tile, b: Tile) =>
  intersection(a.borders, [...b.borders, ...b.flipH().borders])
