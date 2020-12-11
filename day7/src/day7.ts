type BagCount = [string, number]
const NAME = 0
const COUNT = 1
export const foo = (input: string[]) => {
  let bagName = /^(\w+ \w+)/
  let bagsHeld = /(?:(\d) (\w+ \w+))/g
  let endBag = /no other bags\.$/

  let bags: Record<string, BagCount[]> = {}

  input.forEach((line) => {
    const [, name] = bagName.exec(line)!
    const contains: BagCount[] = []
    if (!endBag.test(line)) {
      let result: RegExpExecArray | null
      while ((result = bagsHeld.exec(line)))
        contains.push([result[2], Number(result[1])])
    }
    bags[name] = contains
  })

  const fits = (bag: string, target: string): boolean =>
    bags[bag].some((x) => x[NAME] === target) ||
    bags[bag].some((x) => fits(x[NAME], target))

  const countContaining = (bag: string): number => {
    if (!bags[bag].length) return 0

    return bags[bag]
      .map((x) => x[COUNT] + x[COUNT] * countContaining(x[NAME]))
      .reduce((a, b) => a + b)
  }

  const countFittingBags = Object.keys(bags)
    .map((name) => fits(name, 'shiny gold'))
    .filter(Boolean).length

  return [countFittingBags, countContaining('shiny gold')]
}
