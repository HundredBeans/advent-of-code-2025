import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string {
  return readFileSync(path, 'utf-8')
}

function parseInput(input: string) {
  // Get the math operations and numbers
  const rows = input.split('\n')
  // @ts-ignore
  const mathOperations = rows[rows.length - 1].split(/ +/g).filter(item => item !== '')
  const numbers = rows.slice(0, rows.length - 1).map(item => item.split(/ +/g).filter(item => item !== ''))
  return {
    mathOperations,
    numbers
  }
}

// const { mathOperations, numbers } = parseInput(input)
// console.log(mathOperations.includes(''))
// console.log(mathOperations.length)
// console.log(numbers[0].length)
// console.log(numbers.find(item => item.length === mathOperations.length))

function puzzle(input: string) {
  const { mathOperations, numbers } = parseInput(input)
  // console.log(mathOperations.length)
  // Do the calculation based on the mathOperations
  const numbersLength = numbers.length
  let total = 0
  // @ts-ignore
  for (let i = 0; i < numbers[0]?.length; i++) {
    const operation = mathOperations[i]
    let currentTotal = 0
    for (let j = 0; j < numbersLength; j++) {
      // @ts-ignore
      const number = numbers[j][i]
      if (operation === '+') {
        currentTotal += Number(number)
      } else if (operation === '*') {
        if (currentTotal == 0) {
          currentTotal = 1
        }
        currentTotal *= Number(number)
      }
    }
    // console.log(currentTotal)
    total += currentTotal
  }

  return total
}

// Test
console.log(puzzle(`123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`))

console.log(puzzle(input))