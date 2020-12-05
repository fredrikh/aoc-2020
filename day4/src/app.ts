import { readFileSync } from 'fs'
import path from 'path'
import { countValidPassports } from './day4'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const input = readFileSync(inputPath)
  .toString()
  .split('\n\n')
  .map((line) => line.replace(/\n/g, ' '))
  .map((row) => row.split(' '))

console.log(countValidPassports(input))
