import { readFileSync } from 'fs'
import path from 'path'
import { fooA, fooB } from './day8'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const input = readFileSync(inputPath).toString().split(/\n/)

console.log(fooA(input))
console.log(fooB(input))
