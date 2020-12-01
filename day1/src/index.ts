import { readFileSync } from 'fs'
import { find2Entries, find3Entries } from './day1'

const input = readFileSync(__dirname + '/input.txt')
  .toString()
  .split(/\n/)
  .map(Number)

const mul = (a: number, b: number) => a * b
const a = find2Entries(input, 2020)
const b = find3Entries(input, 2020)

console.log(a.reduce(mul))
console.log(b.reduce(mul))
