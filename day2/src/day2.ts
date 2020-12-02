export const countValid = (
  list: string[],
  validator: (policyPassword: string) => boolean
) => [list.map(validator).filter(Boolean).length]

const rx = /(\d+)-(\d+) ([a-z]): ([a-z]+)/

export const validatordOne = (policyPassword: string) => {
  const [, min, max, char, pwd] = rx.exec(policyPassword)!

  const freq = [...pwd].filter((c) => c === char).length

  return Number(min) <= freq && freq <= Number(max)
}

export const validatorTwo = (policyPassword: string) => {
  const [, posA, posB, char, pwd] = rx.exec(policyPassword)!

  const charA = pwd[Number(posA) - 1]
  const charB = pwd[Number(posB) - 1]

  return (charA === char || charB === char) && charA !== charB
}
