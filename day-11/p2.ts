import { readFileSync } from 'node:fs'
import path from 'node:path'

const input = parseInputFromFile(path.join(__dirname, './input.txt'))

function parseInputFromFile(path: string): string {
  return readFileSync(path, 'utf-8')
}

function parseInput(input: string) {
  const rows = input.split('\n')
  const parsedInput: {
    name: string,
    children: string[]
  }[] = []
  for (const row of rows) {
    const [name, children] = row.split(': ') as [string, string]
    parsedInput.push({
      name,
      children: children !== 'out' ? children.split(' ') : []
    })
  }

  return parsedInput
}

function puzzle(input: string) {
  const parsedInput = parseInput(input)
  const mapNameChildren: { [key: string]: string[] } = {}
  parsedInput.forEach(item => {
    mapNameChildren[item.name] = item.children
  })
  const counter = countPathsToOut(mapNameChildren, 'svr', false, false, {})
  return counter
}

function countPathsToOut(
  mapData: { [key: string]: string[] },
  currentName: string,
  passedFft: boolean,
  passedDac: boolean,
  memo: { [key: string]: number }
) {
  const key = `${currentName}-${passedFft}-${passedDac}`
  if (key in memo) {
    return memo[key]
  }

  if (currentName === 'fft') {
    passedFft = true
  }

  if (currentName === 'dac') {
    passedDac = true
  }

  // console.log(current.name, passedFft, passedDac)

  const currentChildren = mapData[currentName]!
  if (currentChildren.length === 0) {
    const result = passedFft && passedDac ? 1 : 0
    return result
  }

  let counter = 0
  for (const child of currentChildren) {
    const result = countPathsToOut(mapData, child, passedFft, passedDac, memo)!
    counter += result
  }

  memo[key] = counter
  return counter
}

console.log(puzzle(`svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`))

console.log(puzzle(input))