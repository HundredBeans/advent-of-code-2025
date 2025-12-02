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
  const idLength = idString.length;
  // Check if idLength is not even
  if (idLength % 2 !== 0) {
    return false;
  }
  // Check if id is made of some sequence of digits repeated twice
  const firstHalf = idString.slice(0, idLength / 2);
  const secondHalf = idString.slice(idLength / 2);
  // Check if secondHalf is started with 0
  if (secondHalf.startsWith('0')) {
    return false;
  }
  return firstHalf === secondHalf;
}

console.log(puzzle("11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124".split(",")))

console.log(puzzle(input))