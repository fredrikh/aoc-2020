import { readFileSync } from 'fs'
import path from 'path'
import { checkSlope, checkSlopes } from './day3'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const pattern = readFileSync(inputPath)
  .toString()
  .split('\n')
  .map((line) => [...line].map((char) => (char === '#' ? 1 : 0)))

const slopes = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 }
]

console.log(checkSlope(pattern, { right: 3, down: 1 }))
console.log(checkSlopes(pattern, slopes))
