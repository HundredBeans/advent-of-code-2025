import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string[] {
  return readFileSync(path, 'utf-8').split('\n')
}

const TOTAL_DIAL = 100
const STARTING_DIAL = 50

function puzzle(rotations: string[]) {
  let currentDial = STARTING_DIAL
  // Count the occurrences of 0s
  let result = 0
  rotations.forEach((rotation) => {
    const res = rotateDial(rotation, currentDial)
    currentDial = res.currentDial
    result += res.zeroCount
  })

  return result
}

function rotateDial(rotationStr: string, currentDial: number) {
  // Extract rotation
  const direction = rotationStr[0]
  const rotationNeeded = parseInt(rotationStr.slice(1))
  let zeroCount = 0
  let rotationCount = 0

  if (direction === "L") {
    while(rotationCount < rotationNeeded) {
      currentDial--
      if (currentDial < 0) {
        currentDial = TOTAL_DIAL - 1
      }
      if (currentDial === 0) {
        zeroCount++
      }
      rotationCount++
    }
  } else {
    while(rotationCount < rotationNeeded) {
      currentDial++
      if (currentDial > TOTAL_DIAL - 1) {
        currentDial = 0
      }
      if (currentDial === 0) {
        zeroCount++
      }
      rotationCount++
    }
  }

  return {
    currentDial,
    zeroCount,
  }
}

// Test
console.log(puzzle([
  "L68",
  "L30",
  "R48",
  "L5",
  "R60",
  "L55",
  "L1",
  "L99",
  "R14",
  "L82",
]))
console.log(puzzle(["L50", "L100"]))

// Result
console.log(puzzle(input))
