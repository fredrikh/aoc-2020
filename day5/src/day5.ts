type Seat = {
  row: number
  col: number
}

const toSeatNumber = (s: string): Seat => {
  const arr = [...s]
  const row = arr.slice(0, 7).map((c) => c === 'B')
  const col = arr.slice(7).map((c) => c === 'R')

  return { row: toDec(row), col: toDec(col) }
}

const toDec = (bin: boolean[]) => {
  let result = 0
  while (bin.length) result = (result << 1) | (bin.shift() ? 1 : 0)

  return result
}

const asc = (a: number, b: number) => a - b

const desc = (a: number, b: number) => b - a

const seatId = (seat: Seat) => seat.row * 8 + seat.col

const seatsIds = (input: string[]) => input.map((s) => seatId(toSeatNumber(s)))

export const highestSeatId = (input: string[]) => seatsIds(input).sort(desc)[0]

export const mySeatId = (input: string[]) => {
  const ids = seatsIds(input).sort(asc)
  let prevId = ids[0] - 1
  let i = 0

  while (ids[i] - prevId === 1 && i < ids.length) prevId = ids[i++]

  return prevId + 1
}
