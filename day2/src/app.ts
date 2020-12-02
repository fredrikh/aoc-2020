import path from 'path'
import { readFileSync } from 'fs'
import { countValid, validatordOne, validatorTwo } from './day2'

const inputPath = path.join(__dirname, '..', 'src', 'input.txt')

const input = readFileSync(inputPath).toString().split(/\n/)

console.log(countValid(input, validatordOne))
console.log(countValid(input, validatorTwo))
