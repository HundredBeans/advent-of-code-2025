import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string[][] {
  return createGrid(readFileSync(path, 'utf-8'))
}

function createGrid(input: string) {
  return input.split('\n').map(item => item.split(""))
}

function getAdjacent(grid: string[][], row: number, col: number) {
  // Return array from top left to bottom right
  return [
    getGridValue(grid, row - 1, col - 1),
    getGridValue(grid, row - 1, col),
    getGridValue(grid, row - 1, col + 1),
    getGridValue(grid, row, col - 1),
    getGridValue(grid, row, col + 1),
    getGridValue(grid, row + 1, col - 1),
    getGridValue(grid, row + 1, col),
    getGridValue(grid, row + 1, col + 1),
  ]
}

function getGridValue(grid: string[][], row: number, col: number) {
  if (!grid[row] || !grid[row][col]) {
    return undefined
  }

  return grid[row][col]
}

function puzzle(grid: string[][]) {
  let result = 0

  for (let row = 0; row < grid.length; row++) {
    // @ts-ignore
    for (let col = 0; col < grid[row].length; col++) {
      // @ts-ignore
      if (grid[row][col] === '.') {
        continue
      }
      const adjacent = getAdjacent(grid, row, col)
      console.log('adjacent', adjacent)
      let paperCounter = 0
      adjacent.forEach(item => {
        if (item === '@') {
          paperCounter++
        }
      })
      if (paperCounter < 4) {
        result++
      }
    }
  }

  return result
}

// Test
console.log(puzzle(createGrid(`..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`)))

console.log(puzzle(input))
