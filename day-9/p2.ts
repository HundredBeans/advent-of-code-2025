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
  // Add the first position to the end to close the loop
  parsedInput.push(parsedInput[0])
  const greenTiles = []
  let maxArea = 0
  let maxAreaCoords = []
  let minX = Infinity
  let maxX = 0
  let minY = Infinity
  let maxY = 0
  for (let i = 0; i < parsedInput.length - 1; i++) {
    const j = i + 1
    const [x1, y1] = parsedInput[i].split(',').map(Number)
    const [x2, y2] = parsedInput[j].split(',').map(Number)
    maxX = Math.max(maxX, x1, x2)
    maxY = Math.max(maxY, y1, y2)
    minX = Math.min(minX, x1, x2)
    minY = Math.min(minY, y1, y2)

    if (x1 === x2) {
      const minY = Math.min(y1, y2)
      const maxY = Math.max(y1, y2)
      for (let y = minY; y <= maxY; y++) {
        greenTiles.push(`${x1},${y}`)
      }
    }
    if (y1 === y2) {
      const minX = Math.min(x1, x2)
      const maxX = Math.max(x1, x2)
      for (let x = minX; x <= maxX; x++) {
        greenTiles.push(`${x},${y1}`)
      }
    }
  }
  console.log(minX, maxX, minY, maxY)
  console.log('greenTiles length', greenTiles.length)
  console.log('input length', parsedInput.length)

  // Fill in the green tiles
  // for (let y = minY; y <= maxY; y++) {
  //   let shouldFill = false
  //   for (let x = minX; x <= maxX; x++) {
  //     if (greenTiles.includes(`${x},${y}`) && !greenTiles.includes(`${x - 1},${y}`)) {
  //       shouldFill = !shouldFill
  //       greenTiles.push(`${x},${y}`)
  //     } else if (shouldFill) {
  //       // greenTiles.add(`${x},${y}`)
  //       greenTiles.push(`${x},${y}`)
  //     }
  //   }
  // }
  // console.log(greenTiles)


  for (let i = 0; i < parsedInput.length; i++) {
    // Log Progress
    console.log('progress', i / parsedInput.length * 100, '%')
    for (let j = parsedInput.length - 1; j > i; j--) {
      const area = calculateArea(parsedInput[i], parsedInput[j], greenTiles, maxArea)
      if (area > maxArea) {
        maxArea = area
        maxAreaCoords = [parsedInput[i], parsedInput[j]]
      }
    }
  }
  // console.log(greenTiles)
  // console.log(redTiles)
  // console.log(blankTiles)

  // renderTiles(greenTiles, maxX, maxY)

  console.log(maxAreaCoords)
  return maxArea
}

function calculateArea(position1: string, position2: string, greenTiles: string[], currentMaxArea: number): number {
  const [x1, y1] = position1.split(',').map(Number)
  const [x2, y2] = position2.split(',').map(Number)
  const minX = Math.min(x1, x2)
  const maxX = Math.max(x1, x2)
  const minY = Math.min(y1, y2)
  const maxY = Math.max(y1, y2)
  // Return early if the area is smaller than the current max area
  if ((Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1) < currentMaxArea) {
    return 0
  }
  // console.log('calculating area', position1, position2)
  // Check if 1 of the greenTiles is inside the possible area
  if (greenTiles.some((tile) => {
    const [x, y] = tile.split(',').map(Number)
    return x >= minX + 1 && x <= maxX - 1 && y >= minY + 1 && y <= maxY - 1
  })) {
    return 0
  }
  // for (let x = minX + 1; x <= maxX - 1; x++) {
  //   for (let y = minY + 1; y <= maxY - 1; y++) {
  //     if (greenTiles.has(`${x},${y}`)) {
  //       return 0
  //     }
  //   }
  // }

  // Inclusive
  return (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1)
}

function renderTiles(tiles: string[], maxX: number, maxY: number) {
  const grid = Array.from({ length: maxY + 1 }, () =>
    Array.from({ length: maxX + 1 }, () => '.')
  )

  tiles.forEach((tile, idx) => {
    const [x, y] = tile.split(',').map(Number)
    grid[y][x] = '#'
  })

  grid.forEach((row, idx) => console.log(idx, row.join('')))
}

// console.log(puzzle(`7,1
// 11,1
// 11,7
// 9,7
// 9,5
// 2,5
// 2,3
// 7,3`))

console.log(puzzle(input))