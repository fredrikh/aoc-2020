import { GameConsole, assembler, Asm, Opcode } from './gameConsole'

export const fooA = (input: string[]) =>
  new GameConsole().load(assembler(input)).run().state().acc

export const fooB = (input: string[]) => {
  const pglen = input.length
  const assembly = assembler(input)
  const gc = new GameConsole()

  let mutation = mutateProgram(assembly)
  let curr = mutation.next()

  while (!curr.done) {
    const state = gc.load(curr.value).run().state()
    if (state.pc === pglen) return state.acc
    curr = mutation.next()
  }
}

const mutateProgram = function* (
  assembly: Asm[]
): Generator<Asm[], string, boolean> {
  const swapOp = (op: Opcode) => {
    if (op === 'nop') return 'jmp'
    return 'nop'
  }
  for (let i = 0; i < assembly.length; i++) {
    const [op, arg] = assembly[i]
    if (['nop', 'jmp'].includes(op) && arg !== 0) {
      const newAssembly = [...assembly]
      newAssembly[i] = [swapOp(op), arg]
      yield newAssembly
    }
  }
  return 'Done!'
}
