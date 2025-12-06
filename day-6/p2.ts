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
  const rawNumbers = rows.slice(0, rows.length - 1)
  const formattedNumbers = [...mathOperations.map(() => [])]
  let idx = 0
  // @ts-ignore
  for (let col = 0; col < rawNumbers[0].length; col++) {
    let operationArr = formattedNumbers[idx]!
    let value = ''
    for (let row = 0; row < rawNumbers.length; row++) {
      // Find space position 
      // @ts-ignore
      const currentValue = rawNumbers[row][col]
      value += currentValue
    }
    if (value.trim() !== '') {
      // @ts-ignore
      operationArr.push(value.trim())
    } else {
      idx++
    }
  }
  return {
    mathOperations,
    numbers: formattedNumbers
  }
}

// const { mathOperations, numbers } = parseInput(input)
// console.log(mathOperations.includes(''))
// console.log(mathOperations.length)
// console.log(numbers[0].length)
// console.log(numbers.find(item => item.length === mathOperations.length))

function puzzle(input: string) {
  const { mathOperations, numbers } = parseInput(input)
  let total = 0
  for (let row = 0; row < mathOperations.length; row++) {
    let currentTotal = 0
    // @ts-ignore
    for (let col = 0; col < numbers[row].length; col++) {
      // @ts-ignore
      const number = numbers[row][col]
      if (mathOperations[row] === '+') {
        currentTotal += Number(number)
      } else {
        if (currentTotal == 0) {
          currentTotal = 1
        }
        currentTotal *= Number(number)
      }
    }
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