import { readFileSync } from 'fs'
import path from 'path'
import { foo2 } from './day22'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const input = readFileSync(inputPath).toString().split('\n\n')

console.log(foo2(input))
