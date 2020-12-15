import { readFileSync } from 'fs'
import path from 'path'
import { foo2 } from './day13'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const input = readFileSync(inputPath).toString().split('\n')

console.log(foo2(input[1]))
