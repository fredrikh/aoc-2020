type Action = 'N' | 'E' | 'S' | 'W' | 'L' | 'R' | 'F'
type Direction = 'N' | 'E' | 'S' | 'W'
type Instruction = {
  action: Action
  value: number
}
type Pos = {
  x: number
  y: number
  d: Direction
}

export const foo = (input: string[]) => {
  const instructions = input.map((line) => {
    const [, action, val] = line.match(/([NESWLRF])(\d+)/)!
    return { action, value: Number(val) } as Instruction
  })
  const initialPos: Pos = { x: 0, y: 0, d: 'E' }
  let ship: Pos = initialPos

  instructions.forEach((i) => (ship = navigate(ship, i)))

  const part1 = Math.abs(ship.x) + Math.abs(ship.y)

  // part 2
  ship = initialPos
  let waypoint: Pos = { x: 10, y: 1, d: 'N' }

  instructions.forEach((i) => {
    if (i.action === 'F')
      ship = {
        x: ship.x + i.value * waypoint.x,
        y: ship.y + i.value * waypoint.y,
        d: ship.d
      }
    else waypoint = navigate2(waypoint, i)
  })

  const part2 = Math.abs(ship.x) + Math.abs(ship.y)

  return [part1, part2]
}

const navigate = (pos: Pos, instruction: Instruction): Pos => {
  switch (instruction.action) {
    case 'N':
      return { ...pos, y: pos.y + instruction.value }
    case 'E':
      return { ...pos, x: pos.x + instruction.value }
    case 'S':
      return { ...pos, y: pos.y - instruction.value }
    case 'W':
      return { ...pos, x: pos.x - instruction.value }
    case 'F':
      return navigate(pos, { action: pos.d, value: instruction.value })
    default:
      return { ...pos, d: turn(pos.d, instruction.action, instruction.value) }
  }
}

const navigate2 = (pos: Pos, instruction: Instruction): Pos => {
  switch (instruction.action) {
    case 'N':
      return { ...pos, y: pos.y + instruction.value }
    case 'E':
      return { ...pos, x: pos.x + instruction.value }
    case 'S':
      return { ...pos, y: pos.y - instruction.value }
    case 'W':
      return { ...pos, x: pos.x - instruction.value }
    case 'L':
      return rotate(pos, toRad(instruction.value))
    case 'R':
      return rotate(pos, toRad(-instruction.value))
    default:
      return pos
  }
}

const turn = (
  facing: Direction,
  turn: 'L' | 'R',
  degrees: number
): Direction => {
  const directions: Direction[] = ['N', 'E', 'S', 'W']
  const rights = (turn === 'L' ? 360 - degrees : degrees) / 90
  const i = directions.findIndex((c) => c === facing)
  return directions[(i + rights) % 4]
}

const toRad = (deg: number) => (deg * Math.PI) / 180

const rotate = (pos: Pos, t: number): Pos => {
  // 𝑥2=cos𝛽𝑥1−sin𝛽𝑦1𝑦2=sin𝛽𝑥1+cos𝛽𝑦1
  const sinT = Math.sin(t)
  const cosT = Math.cos(t)
  return {
    x: cosT * pos.x - sinT * pos.y,
    y: sinT * pos.x + cosT * pos.y,
    d: pos.d
  }
}
