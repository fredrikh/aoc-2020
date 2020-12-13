import { readFileSync } from 'fs'
import path from 'path'
import { foo, Layout } from './day11'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const input = readFileSync(inputPath)
  .toString()
  .split('\n')
  .map((line) => line.split(''))

console.log(foo(input as Layout))
