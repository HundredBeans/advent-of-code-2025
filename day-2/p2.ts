import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string[] {
  return readFileSync(path, 'utf-8').split(',')
}

function puzzle(input: string[]) {
  let total = 0

  for (const line of input) {
    const invalidIDs = findInvalidIDs(line)
    total += invalidIDs.reduce((acc, cur) => acc + cur, 0)
  }

  return total
}

function findInvalidIDs(input: string): number[] {
  const ranges = input.split("-")
  const firstID = Number(ranges[0])
  const lastID = Number(ranges[1])
  const invalidIDs: number[] = []

  // InvalidID is made only of some sequence of digits repeated twice
  for (let id = firstID; id <= lastID; id++) {
    if (isInvalidID(id)) {
      invalidIDs.push(id)
    }
  }

  return invalidIDs
}

function isInvalidID(id: number): boolean {
  const idString = id.toString();
  let isInvalid = false
  // Loop through idString and create chunks
  // E.g 123123. It generate chunks of 1, 12, 123, 1231, 12312, 123123
  const chunks = []
  for (let i = 0; i < idString.length; i++) {
    const chunk = idString.slice(0, i + 1)
    chunks.push(chunk)
  }

  // Loop through chunks and check if any of them is repeated many times
  for (const chunk of chunks) {
    // Get the length of chunk
    const chunkLength = chunk.length
    const chunksCount = idString.length / chunkLength
    if (idString.length % chunkLength === 0 && chunksCount > 1) {
      const repeated = chunk.repeat(chunksCount)
      if (repeated === idString) {
        // console.log('invalid chunk', chunk)
        isInvalid = true
        break
      }
    }
  }

  return isInvalid

}

console.log(puzzle("11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124".split(",")))

console.log(puzzle(input))