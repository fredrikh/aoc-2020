type MemSet = {
  address: number
  value: number
}

type BitMask = string

export const foo = (input: string[]) => {
  const instructions = parseInstructions(input)
  const memory: Record<number, number> = {}
  let mask: BitMask = ''.padStart(36, 'X')

  instructions.forEach((i) => {
    if (isBitMask(i)) mask = i
    else memory[i.address] = applyMask(mask, i.value)
  })

  return Object.values(memory).reduce((a, b) => a + b)
}

function isBitMask(instruction: MemSet | BitMask): instruction is BitMask {
  return typeof instruction === 'string'
}

const parseInstructions = (input: string[]) =>
  input.map((line) => {
    if (/^mem/.test(line)) {
      const [, mem, val] = /\[(\d+)] = (\d+)/.exec(line)!
      return { address: Number(mem), value: Number(val) } as MemSet
    } else {
      const [, mask] = /([X01]{36})/.exec(line)!
      return mask as BitMask
    }
  })

const applyMask = (mask: BitMask, value: number) => {
  const newValue = [...value.toString(2).padStart(36, '0')]
  const bits = [...mask]
  bits.forEach((b, i) => {
    if (b !== 'X') newValue[i] = b
  })
  return parseInt(newValue.join(''), 2)
}

const applyFluctuatingMask = (mask: string, value: number) => {
  const newValue = [...value.toString(2).padStart(36, '0')]

  const bits = [...mask]
  bits.forEach((b, i) => {
    if (b !== '0') newValue[i] = b
  })

  return permutations(newValue.join(''))
}

const floatingPositions = (mask: string) =>
  [...mask].reduce((positions: number[], b, i) => {
    if (b === 'X') positions.push(i)
    return positions
  }, [])

const permutations = (mask: string) => {
  const floatingPos = floatingPositions(mask)
  const permutations = 2 ** floatingPos.length

  const masks = []
  for (let i = 0; i < permutations; i++) {
    const p = [...mask]
    const subMask = i.toString(2).padStart(floatingPos.length, '0')
    for (let x = 0; x < subMask.length; x++) {
      p[floatingPos[x]] = subMask[x]
    }
    masks.push(parseInt(p.join(''), 2))
  }
  return masks
}

export const foo2 = (input: string[]) => {
  const instructions = parseInstructions(input)
  const memory: Record<number, number> = {}
  let mask: BitMask = ''.padStart(36, '0')

  instructions.forEach((i) => {
    if (isBitMask(i)) mask = i
    else
      applyFluctuatingMask(mask, i.address).forEach((m) => {
        memory[m] = i.value
      })
  })

  return Object.values(memory).reduce((a, b) => a + b)
}
