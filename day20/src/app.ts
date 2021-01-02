import { readFileSync } from 'fs'
import path from 'path'
import { foo } from './day20'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const input = readFileSync(inputPath).toString().split('\n\n')

console.log(foo(input))
