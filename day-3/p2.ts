import { exec } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string[] {
  return readFileSync(path, 'utf-8').split('\n')
}

function puzzle(banks: string[]): number {
  let totalJoltage = 0

  for (const bank of banks) {
    const { value: largest } = constructBattery(bank)
    totalJoltage += Number(largest)
  }

  return totalJoltage
}

// function getLargestJoltage(banks: string): string {
//   let currentLargest = 0

//   for (let d1 = 0; d1 < banks.length; d1++) {
//     for (let d2 = d1 + 1; d2 < banks.length; d2++) {
//       for (let d3 = d2 + 1; d3 < banks.length; d3++) {
//         for (let d4 = d3 + 1; d4 < banks.length; d4++) {
//           for (let d5 = d4 + 1; d5 < banks.length; d5++) {
//             for (let d6 = d5 + 1; d6 < banks.length; d6++) {
//               for (let d7 = d6 + 1; d7 < banks.length; d7++) {
//                 for (let d8 = d7 + 1; d8 < banks.length; d8++) {
//                   for (let d9 = d8 + 1; d9 < banks.length; d9++) {
//                     for (let d10 = d9 + 1; d10 < banks.length; d10++) {
//                       for (let d11 = d10 + 1; d11 < banks.length; d11++) {
//                         for (let d12 = d11 + 1; d12 < banks.length; d12++) {
//                           const digitIdxs = [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12]
//                           const currentDigit = Number(digitIdxs.map(idx => banks[idx]).join(''))
//                           console.log('currentDigit', currentDigit)
//                           if (currentDigit > currentLargest) {
//                             currentLargest = currentDigit
//                             console.log('currentLargest', currentLargest)
//                           }
//                         }
//                       }
//                     }
//                   }
//                 }
//               }
//             }

//           }
//         }
//       }
//     }
//   }

//   return currentLargest.toString()
// }

function getLargestPossibleBatteryForDigits(banks: string, digits: number, startingIndex: number = 0) {
  let currentLargest = 0
  let largestBatteryPositions = []
  for (let i = startingIndex; i <= banks.length - digits; i++) {
    const currentBattery = Number(banks[i])
    if (currentBattery > currentLargest) {
      currentLargest = currentBattery
      largestBatteryPositions = []
    }
    if (currentBattery === currentLargest) {
      largestBatteryPositions.push(i)
    }
  }
  return { currentLargest, largestBatteryPositions }
}

function constructBattery(banks: string) {
  let batteryLength = 12
  let batteries: {
    value: string
    positions: number[]
  }[] = []

  while (batteryLength > 1) {
    if (!batteries.length) {
      const { currentLargest, largestBatteryPositions } = getLargestPossibleBatteryForDigits(banks, batteryLength)

      console.log('currentLargest', currentLargest)
      batteries.push({
        value: currentLargest.toString(),
        positions: largestBatteryPositions,
      })
    }
    batteryLength--

    for (const bt of batteries) {
      let maxBtValue = 0
      let maxBtPositions: number[] = []

      for (const btPosition of bt.positions) {
        const { currentLargest, largestBatteryPositions } = getLargestPossibleBatteryForDigits(banks, batteryLength, btPosition + 1)
        const currentBtValue = Number(bt.value + currentLargest)
        console.log('currentBtValue', currentBtValue)
        console.log('maxBtValue', maxBtValue)
        if (currentBtValue > maxBtValue) {
          maxBtValue = currentBtValue
          maxBtPositions = largestBatteryPositions
        }
      }
      bt.value = maxBtValue.toString()
      bt.positions = maxBtPositions
    }

  }

  // Return max battery values
  return batteries.reduce((acc, bt) => {
    if (Number(bt.value) > Number(acc.value)) {
      return bt
    }
    return acc
  })
}

// Test
// console.log(puzzle([
//   '987654321111111',
//   '811111111111119',
//   '234234234234278',
//   '818181911112111',
// ]))

console.log(puzzle(input))
// console.log('2331221221361221232332583266422231222315311212133222227552392222213223325332632323212227323432113121'.length)
// console.log(getLargestPossibleBatteryForDigits('234234234234278', 8, 7))
// console.log(constructBattery('2331221221361221232332583266422231222315311212133222227552392222213223325332632323212227323432113121'))

// 4342