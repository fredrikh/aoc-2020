import { readFileSync } from 'fs'
import path from 'path'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const input = readFileSync(inputPath).toString()

console.log(input)
