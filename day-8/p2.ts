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
  const boxesPositions = parseInput(input)
  // console.log(boxesPositions)
  const connections: { from: number; to: number; distance: number }[] = []
  const circuits: string[][] = boxesPositions.map(box => [box])
  // Find 1000 shortest connections
  for (let i = 0; i < boxesPositions.length; i++) {
    for (let j = i + 1; j < boxesPositions.length; j++) {
      const [x1, y1, z1] = boxesPositions[i].split(',').map(Number)
      const [x2, y2, z2] = boxesPositions[j].split(',').map(Number)
      const distance = calculateDistance({
        x: x1,
        y: y1,
        z: z1,
      }, {
        x: x2,
        y: y2,
        z: z2,
      })
      connections.push({ from: boxesPositions[i], to: boxesPositions[j], distance })
    }
  }
  // Sort the connections
  connections.sort((a, b) => a.distance - b.distance)
  // console.log('connections', connections)

  let i = 0
  while (true) {
    // Find the circuits for each box
    const fromCircuits = circuits.find(circuit => {
      return circuit.includes(connections[i].from)
    }) || [connections[i].from]

    const toCircuits = circuits.find(circuit => {
      return circuit.includes(connections[i].to)
    }) || [connections[i].to]

    if (fromCircuits && toCircuits) {
      circuits.push(Array.from(new Set([...fromCircuits, ...toCircuits])))
      // Remove the circuits that are merged
      circuits.indexOf(fromCircuits) !== -1 && circuits.splice(circuits.indexOf(fromCircuits), 1)
      circuits.indexOf(toCircuits) !== -1 && circuits.splice(circuits.indexOf(toCircuits), 1)
    }

    if (circuits.length === 1) {
      const x1 = connections[i].from.split(',').map(Number)[0]
      const x2 = connections[i].to.split(',').map(Number)[0]
      return x1 * x2
    }
    
    i++
  }


  return circuits.sort((a, b) => b.length - a.length).slice(0, 3).reduce((acc, circuit) => acc * circuit.length, 1)
}

function calculateDistance(position1: { x: number; y: number; z: number }, position2: { x: number; y: number; z: number }) {
  return Math.abs(position1.x - position2.x)**2 + Math.abs(position1.y - position2.y)**2 + Math.abs(position1.z - position2.z)**2
}

console.log(puzzle(`162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`))

console.log(puzzle(input))