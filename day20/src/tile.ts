export default class Tile {
  readonly _id: number
  private _rows: string[][]
  private _matches: number[]
  private _size: number

  constructor(tileString: string) {
    const [idRow, ...tileRows] = tileString.split('\n')
    this._id = Number(idRow.match(/\d+/)![0]) || 0
    this._rows = tileRows.map((row) => [...row])
    this._size = tileRows.length
    this._matches = []
  }

  addMatch(matchingId: number) {
    this._matches.push(matchingId)
  }

  get id(): number {
    return this._id
  }

  flipV(): Tile {
    this._rows = this._rows.reverse()
    return this
  }

  flipH(): Tile {
    this._rows = this._rows.map((row) => row.reverse())
    return this
  }

  rotateR(): Tile {
    const size = this._size
    const rotated: string[][] = []
    for (let x = 0; x < size; x++) {
      const row: string[] = []
      for (let y = size - 1; y >= 0; y--) {
        row.push(this._rows[y][x])
      }
      rotated.push(row)
    }
    this._rows = rotated
    return this
  }

  rotateL(): Tile {
    const size = this._size
    const rotated: string[][] = []
    for (let x = size - 1; x >= 0; x--) {
      const row: string[] = []
      for (let y = 0; y < size; y++) {
        row.push(this._rows[y][x])
      }
      rotated.push(row)
    }
    this._rows = rotated
    return this
  }

  get connections(): number {
    return this._matches.length
  }

  get borders(): string[] {
    const borders: string[] = []
    for (let i = 0; i < 4; i++) {
      borders.push(this.topBorder)
      this.rotateL()
    }

    return borders
  }

  get topBorder(): string {
    return this._rows[0].join('')
  }

  toString() {
    return this._rows.map((row) => row.join(' ')).join('\n')
  }
}
