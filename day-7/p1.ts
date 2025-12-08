import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string {
  return readFileSync(path, 'utf-8')
}

function parseInput(input: string): string[][] {
  return input.split('\n').map(item => item.split(''))
}

function puzzle(input: string): number {
  let total = 0
  const parsedInput = parseInput(input)
  // Get the starting position
  const startingPositionColumn = parsedInput[0]?.findIndex(item => item === 'S')
  const beamsColumn = new Set()
  beamsColumn.add(startingPositionColumn)

  for (let row = 0; row < parsedInput.length; row++) {
    // @ts-ignore
    for (let col = 0; col < parsedInput[row].length; col++) {
      // @ts-ignore
      const currentPosition = parsedInput[row][col]
      if (currentPosition === '^' && beamsColumn.has(col)) {
        beamsColumn.add(col - 1)
        beamsColumn.add(col + 1)
        beamsColumn.delete(col)
        total++
      }
    }
  }

  return total
}

console.log(puzzle(`.......S.......
.......|.......
......|^|......
......|.|......
.....|^|^|.....
.....|.|.|.....
....|^|^|^|....
....|.|.|.|....
...|^|^|||^|...
...|.|.|||.|...
..|^|^|||^|^|..
..|.|.|||.|.|..
.|^|||^||.||^|.
.|.|||.||.||.|.
|^|^|^|^|^|||^|
|.|.|.|.|.|||.|`))

console.log(puzzle(input))
