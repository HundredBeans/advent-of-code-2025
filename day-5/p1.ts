import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string {
  return readFileSync(path, 'utf-8')
}

const parsedInput = input.split('\n\n')
const freshIngredientIDRanges = parsedInput[0]?.split('\n') as string[]
const availableIngredientIDs = parsedInput[1]?.split('\n') as string[]

function puzzle(ranges: string[], availableIDs: string[]): number {
  const availableIngredientIDs = new Set(availableIDs)
  let counter = 0
  for (const id of availableIngredientIDs) {
    for (const range of ranges) {
      const [min, max] = range.split('-').map(Number)
      // @ts-ignore
      if (Number(id) >= min && Number(id) <= max) {
        counter++
        break
      }
    }
  }

  return counter
}

console.log(puzzle(freshIngredientIDRanges, availableIngredientIDs))