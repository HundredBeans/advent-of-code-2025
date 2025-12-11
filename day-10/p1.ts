// @ts-nocheck
import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string {
  return readFileSync(path, 'utf-8')
}

function parseInput(input: string) {
  const rows = input.split('\n')
  const parsedInput: {
    indicator: string,
    buttons: number[],
    joltages: number[]
  }[] = []
  for (const row of rows) {
    const indicator = row.match(/\[(.+)\]/)[1]
    const buttonMatches = row.match(/\((\d+(?:,\d+)*)\)/g)
    const buttons = buttonMatches.map(match => match.slice(1, -1).split(',').map(Number))
    parsedInput.push({
      indicator,
      buttons,
      joltages: row.match(/\{(.+)\}/)[1].split(',').map(Number)
    })
  }

  return parsedInput
}

// Brute force: try all combinations of button presses
function solveBruteForce(buttons: number[][], target: string): number | null {
  const numLights = target.length
  const numButtons = buttons.length

  // Try all possible combinations: 2^numButtons possibilities
  // Each button can be pressed (1) or not pressed (0)
  const totalCombinations = Math.pow(2, numButtons)
  const states = ['0', '1']
  const combinations = []
  for (let i = 0; i < totalCombinations; i++) {
    const combination = i.toString(2).padStart(numButtons, '0')
    
    combinations.push(combination)
  }

  let minPresses = Infinity

  for (let combination of combinations) {
    // Simulate pressing the buttons in this combination
    let lightState = ''.padStart(numLights, '0')
    let pressCount = 0
    // console.log('lightState', lightState)

    for (let buttonIndex = 0; buttonIndex < numButtons; buttonIndex++) {
      // Check if this button is pressed in current combination
      const isPressed = combination[buttonIndex] === '1'

      if (isPressed) {
        pressCount++
        // Toggle all lights that this button affects
        for (const lightIndex of buttons[buttonIndex]) {
          lightState = lightState.split('').map((c, i) => i === lightIndex ? (c === '0' ? '1' : '0') : c).join('')
        }
      }
    }

    // Check if this combination achieves the target
    if (lightState === target) {
      minPresses = Math.min(minPresses, pressCount)
    }
  }

  return minPresses === Infinity ? null : minPresses
}

function puzzle(input: string) {
  const parsedInput = parseInput(input)

  let totalPresses = 0

  for (const machine of parsedInput) {
    // Convert indicator to target array
    const target = machine.indicator.replace(/\./g, '0').replace(/#/g, '1')
    // console.log('target:', target)

    const presses = solveBruteForce(machine.buttons, target)

    totalPresses += presses
  }

  return totalPresses
}

// Test
console.log('Test result:', puzzle(`[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`))

console.log('Answer:', puzzle(input))