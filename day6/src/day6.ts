export const count = (input: string[][]) => [
  input.map((s) => new Set([...s.join('')]).size).reduce((a, b) => a + b),
  input.map(countGroup).reduce((a, b) => a + b)
]

const countGroup = (group: string[]) =>
  group
    .map((answers) => new Set([...answers]))
    .reduce((acc, a) => intersection(acc, a), new Set([...group.join('')])).size

const intersection = (setA: Set<string>, setB: Set<string>) => {
  let intersection = new Set<string>()
  for (let elem of setB) {
    if (setA.has(elem)) {
      intersection.add(elem)
    }
  }
  return intersection
}
