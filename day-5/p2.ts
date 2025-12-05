import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string {
  return readFileSync(path, 'utf-8')
}

const parsedInput = input.split('\n\n')
const freshIngredientIDRanges = parsedInput[0]?.split('\n') as string[]

function puzzle(ranges: string[]): number {
  const adjustedRanges: number[][] = []
  let total = 0

  // sort the ranges by the start number
  ranges.sort((a, b) => {
    const [aStart] = a.split('-').map(Number)
    const [bStart] = b.split('-').map(Number)
    // @ts-ignore
    return aStart - bStart
  })

  for (const range of ranges) {
    let hasValueInBetween = false
    const [start, end] = range.split('-').map(Number)
    if (adjustedRanges.length === 0) {
      // @ts-ignore
      adjustedRanges.push([start, end])
      continue
    }

    for (const adjRange of adjustedRanges) {
      const [adjStart, adjEnd] = adjRange
      // @ts-ignore
      if (start >= adjStart && start <= adjEnd) {
        // @ts-ignore
        adjRange[1] = Math.max(adjEnd, end)
        hasValueInBetween = true
        break
      }

    }
    if (!hasValueInBetween) {
      // @ts-ignore
      adjustedRanges.push([start, end])
    }
  }

  // Count total ranges from adjustedRanges
  for (const range of adjustedRanges) {
    const [start, end] = range
    // @ts-ignore
    total += end - start + 1
  }

  return total
}

console.log(puzzle(freshIngredientIDRanges))