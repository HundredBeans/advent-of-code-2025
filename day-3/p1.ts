import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string[] {
  return readFileSync(path, 'utf-8').split('\n')
}

function puzzle(banks: string[]): number {
  let totalJoltage = 0

  for (const bank of banks) {
    const largest = getLargestJoltage(bank)
    totalJoltage += Number(largest)
  }

  return totalJoltage
}

function getLargestJoltage(banks: string): string {
  let currentLargest = 0

  for (let firstDigitIdx = 0; firstDigitIdx < banks.length; firstDigitIdx++) {
    for (let secondDigitIdx = firstDigitIdx + 1; secondDigitIdx < banks.length; secondDigitIdx++) {
      const currentDigit = Number(`${banks[firstDigitIdx]}${banks[secondDigitIdx]}`)
      if (currentDigit > currentLargest) {
        currentLargest = currentDigit
      }
    }
  }

  return currentLargest.toString()
}

// Test
console.log(puzzle([
  '987654321111111',
  '811111111111119',
  '234234234234278',
  '818181911112111',
]))

console.log(puzzle(input))
