// @ts-nocheck
import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string {
  return readFileSync(path, 'utf-8')
}

function parseInput(input: string): string[] {
  return input.split('\n')
}

function puzzle(input: string): number {
  const parsedInput = parseInput(input)
  let maxArea = 0
  for (let i = 0; i < parsedInput.length; i++) {
    for (let j = i + 1; j < parsedInput.length; j++) {
      const area = calculateArea(parsedInput[i], parsedInput[j])
      if (area > maxArea) {
        maxArea = area
      }
    }
  }

  return maxArea
}

function calculateArea(position1: string, position2: string): number {
  const [x1, y1] = position1.split(',').map(Number)
  const [x2, y2] = position2.split(',').map(Number)

  // Inclusive
  return (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1)
}

console.log(puzzle(`7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3
`))

console.log(puzzle(input))