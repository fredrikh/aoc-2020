type Interval = [number, number]

class Field {
  name: string
  lo: Interval
  hi: Interval

  constructor(name: string, lo: Interval, hi: Interval) {
    this.name = name
    this.lo = lo
    this.hi = hi
  }

  isValid(n: number) {
    return (
      (this.lo[0] <= n && n <= this.lo[1]) ||
      (this.hi[0] <= n && n <= this.hi[1])
    )
  }

  toString() {
    return `${this.name}: ${this.lo[0]}-${this.lo[1]} or ${this.hi[0]}-${this.hi[1]}`
  }
}

const parseFields = (fields: string) => {
  const rx = /^(.+): (\d+)-(\d+) or (\d+)-(\d+)$/
  const [, name, fromLo, toLo, fromHi, toHi] = rx.exec(fields)!
  return new Field(
    name,
    [fromLo, toLo].map(Number) as Interval,
    [fromHi, toHi].map(Number) as Interval
  )
}

const notValid = (values: number[], fields: Field[]) =>
  values.map((value) => (fields.some((f) => f.isValid(value)) ? 0 : value))

export const fooA = ([fieldsString, _, nearbyTickets]: string[]) => {
  const fields = fieldsString.split('\n').map(parseFields)!
  const ticketValues = nearbyTickets
    .split('\n')
    .slice(1)
    .map((ticket) => ticket.split(',').map(Number))

  return ticketValues
    .flatMap((values) => notValid(values, fields))
    .reduce((a, b) => a + b)
}

const valid = (values: number[], fields: Field[]) =>
  values.map((value) => fields.some((f) => f.isValid(value))).every(Boolean)

export const fooB = ([fieldsString, _, nearbyTickets]: string[]) => {
  const fields = fieldsString.split('\n').map(parseFields)!
  const ticketValues = nearbyTickets
    .split('\n')
    .slice(1)
    .map((ticket) => ticket.split(',').map(Number))

  const validTickets = ticketValues.filter((values) => valid(values, fields))

  const mappings: Record<string, number[]> = {}

  const colMatches = (xs: number[]) => {
    const freq: number[] = new Array(fields.length).fill(0)
    for (let x of xs) {
      freq[x] += 1
    }
    return freq
  }

  const matchFields = (ticket: number[]) => {
    ticket.forEach((value, col) => {
      fields.forEach((field) => {
        if (field.isValid(value)) {
          if (mappings[field.name] === undefined) {
            mappings[field.name] = [col]
          } else {
            mappings[field.name].push(col)
          }
        }
      })
    })
  }

  validTickets.forEach(matchFields)

  const l = validTickets.length

  const columnMatches2 = Object.entries(mappings).reduce(
    (acc: Record<string, boolean[]>, [name, matches]) => {
      acc[name] = colMatches(matches).map((cm) => cm === l)
      return acc
    },
    {}
  )

  const setColumnDone = (col: number) => {
    Object.keys(columnMatches2).forEach(
      (name) => (columnMatches2[name][col] = false)
    )
  }

  const uniqueCol = (matches: boolean[]) => {
    if (matches.filter((m) => m).length === 1)
      return matches.findIndex((m) => m)
    else return -1
  }

  const matchedColumns: [string, number][] = []

  while (matchedColumns.length < 20) {
    Object.entries(columnMatches2).forEach(([name, matches]) => {
      const col = uniqueCol(matches)
      if (col !== -1) {
        setColumnDone(col)
        matchedColumns.push([name, col])
      }
    })
  }

  return matchedColumns
}
