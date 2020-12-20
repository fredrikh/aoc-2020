import { readFileSync } from 'fs'
import path from 'path'
import { foo2 } from './day19'

const inputPath = path.join(__dirname, '..', 'src', 'input2.txt')
const input = readFileSync(inputPath).toString()

// console.log(foo(input))
console.log(foo2(input))
