import { readFileSync } from 'fs'
import path from 'path'
import { fooA, fooB } from './day9'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const input = readFileSync(inputPath).toString().split(/\n/).map(Number)

const a = fooA(input, 25)
console.log(a)
console.log(fooB(input, a))
