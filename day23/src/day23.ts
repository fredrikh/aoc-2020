import { CupCircle } from './cup'

export const fooA = (input: number[]) => {
  const circle = new CupCircle(input, 0)

  for (let i = 0; i < 100; i++) circle.move()

  return circle.resultA()
}

export const fooB = (input: number[]) => {
  const circle = new CupCircle(input, 1000000)

  for (let i = 0; i < 10000000; i++) circle.move()

  return circle.resultB()
}
