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
  let totalPaperRemoved = 0
  let currentGrid = grid
  let paperRemovedInCurrentGrid = 0
  let newGrid = [...currentGrid]

  while(true) {
    for (let row = 0; row < currentGrid.length; row++) {
      // @ts-ignore
      for (let col = 0; col < currentGrid[row].length; col++) {
        // @ts-ignore
        if (currentGrid[row][col] === '.') {
          continue
        }
        const adjacent = getAdjacent(currentGrid, row, col)
        let paperCounter = 0
        adjacent.forEach(item => {
          if (item === '@') {
            paperCounter++
          }
        })
        if (paperCounter < 4) {
          paperRemovedInCurrentGrid++
          // @ts-ignore
          newGrid[row][col] = '.'
        }
      }
    }

    currentGrid = [...newGrid]
    totalPaperRemoved += paperRemovedInCurrentGrid
    if (paperRemovedInCurrentGrid === 0) {
      break
    }
    paperRemovedInCurrentGrid = 0
    // console.log(currentGrid.join("\n"))
    // console.log(newGrid.join("\n"))
  }


  return totalPaperRemoved
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
