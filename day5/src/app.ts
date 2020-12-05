import { readFileSync } from 'fs'
import path from 'path'
import { highestSeatId, mySeatId } from './day5'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')
const input = readFileSync(inputPath).toString().split(/\n/)

console.log(highestSeatId(input))

console.log(mySeatId(input))
