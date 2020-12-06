import { readFileSync } from 'fs'
import path from 'path'
import { count } from './day6'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const input = readFileSync(inputPath)
  .toString()
  .split('\n\n')
  .map((g) => g.split('\n'))

console.log(count(input))
