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
  return countPathsToOut(parsedInput, parsedInput.find(item => item.name === 'you')!, 0)
}

function countPathsToOut(data: { name: string, children: string[] }[], current: { name: string, children: string[] }, counter: number): number {
  if (current.children.length === 0) {
    counter++
  }

  for (const child of current.children) {
    const childData = data.find(item => item.name === child)!
    counter = countPathsToOut(data, childData, counter)
  }

  return counter
}

console.log(puzzle(`aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`))

console.log(puzzle(input))