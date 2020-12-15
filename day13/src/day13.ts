export const foo = ([estimate, busIds]: string[]) => {
  const est = Number(estimate)
  const ids = busIds.split(',').filter(Number).map(Number)

  const result = ids
    .map((id) => minutes(est, id))
    .sort((a, b) => a[1] - b[1])[0]

  return result[0] * result[1]
}

const minutes = (estimate: number, bus: number) => {
  const m = Math.ceil(estimate / bus)
  return [bus, bus * m - estimate]
}

export const foo2 = (busIds: string) => {
  const busOffsets = busIds
    .split(',')
    .map((id, i) => (id !== 'x' ? { id: Number(id), offset: i } : null))
    .filter(Boolean) as { id: number; offset: number }[]

  const check = (est: number, bus: number, offset: number) =>
    (est + offset) % bus === 0

  let t = 0
  let step = 1
  busOffsets.forEach(({ id, offset }) => {
    while (!check(t, id, offset)) t += step

    step *= id
  })

  return t
}
