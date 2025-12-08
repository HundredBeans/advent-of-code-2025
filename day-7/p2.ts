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
  const startingPositionColumn = parsedInput[0]?.findIndex(item => item === 'S')!
  let beamsData = {
    [startingPositionColumn]: 1
  }

  let rowProcessed = 1

  while (rowProcessed < parsedInput.length) {
    const newBeamsData = {}
    for (const beamCol of Object.keys(beamsData)) {
      // @ts-ignore
      for (let col = 0; col < parsedInput[rowProcessed].length; col++) {
        // @ts-ignore
        const currentPosition = parsedInput[rowProcessed][col]
        if (currentPosition === '^' && beamCol == col.toString()) {
          // @ts-ignore
          newBeamsData[col - 1] = newBeamsData[col - 1] ? newBeamsData[col - 1] + beamsData[col] : beamsData[col]
          // @ts-ignore
          newBeamsData[col + 1] = newBeamsData[col + 1] ? newBeamsData[col + 1] + beamsData[col] : beamsData[col]
        } else if (currentPosition === '.' && beamCol == col.toString()) {
          // @ts-ignore
          newBeamsData[col] = newBeamsData[col] ? newBeamsData[col] + beamsData[col] : beamsData[col]
        }
      }
    }
    rowProcessed++
    beamsData = Object.keys(newBeamsData).length ? newBeamsData : beamsData
    console.log(rowProcessed, beamsData)
  }

  return Object.keys(beamsData).reduce((acc, curr) => {
    // @ts-ignore
    return acc + beamsData[curr]
  }, 0)
}

console.log(puzzle(`.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`))

console.log(puzzle(input))
