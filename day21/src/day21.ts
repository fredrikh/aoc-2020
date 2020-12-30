type Allergens = Record<string, string[]>

export const foo = (input: string[]) => {
  const f: Allergens = {}
  const certain: Record<string, string> = {}
  const ingredientCount: Record<string, number> = {}

  input.forEach((line) => {
    const [i, a] = line.replace(/[(),]/g, '').split(' contains ')
    const ingredients = i.split(' ')
    const allergens = a.split(' ')

    ingredients.reduce((counter, i) => {
      if (!counter[i]) counter[i] = 1
      else counter[i]++
      return counter
    }, ingredientCount)

    allergens.forEach((allergen) => {
      if (!f[allergen]) {
        f[allergen] = ingredients
      } else {
        f[allergen] = intersection(f[allergen], ingredients)
        if (f[allergen].length === 1) certain[f[allergen][0]] = allergen
      }
    })
  })
  for (let i = 0; i < 5; i++) {
    for (let ingredient in certain) {
      for (let allergen in f) {
        if (f[allergen].length > 1) {
          f[allergen] = f[allergen].filter((a) => a !== ingredient)
          if (f[allergen].length === 1) certain[f[allergen][0]] = allergen
        }
      }
    }
  }
  let counter = 0
  for (let ingredient in ingredientCount) {
    if (!certain[ingredient]) counter += ingredientCount[ingredient]
  }

  console.log(canonicalDangerousIngredientsList(f))
  return counter
}

const canonicalDangerousIngredientsList = (allergens: Allergens) => {
  const sortedByAllergen = Object.keys(allergens).sort()
  return sortedByAllergen.flatMap((a) => allergens[a]).join(',')
}

const intersection = (a: string[], b: string[]): string[] => {
  const setA = new Set(a)
  const setB = new Set(b)
  const _intersection: string[] = []
  // let _intersection = new Set<string>()
  for (let elem of setB) {
    if (setA.has(elem)) _intersection.push(elem)
  }
  return _intersection
}
