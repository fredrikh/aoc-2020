import { readFileSync } from 'fs'
import path from 'path'
import { foo } from './day7'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const input = readFileSync(inputPath).toString().split(/\n/)

console.log(foo(input))
