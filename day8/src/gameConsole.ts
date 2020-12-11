export type Opcode = 'nop' | 'acc' | 'jmp'
export type Asm = [Opcode, number]

export const assembler = (input: string[]) => {
  const parseLine = (line: string) => {
    const [, op, arg] = /(nop|jmp|acc)\s([-+]\d+)/.exec(line)!
    return [op as Opcode, Number(arg)] as Asm
  }
  return input.map(parseLine)
}

export class GameConsole {
  private acc: number = 0
  private pc: number = 0
  private halt: boolean = false
  private rowsExecuted = new Set<number>()
  private assembly: Asm[] = []

  instructions: Record<Opcode, (arg: number) => void> = {
    nop: (_: number) => {
      this.pc++
    },
    jmp: (arg: number) => {
      this.pc += arg
    },
    acc: (arg: number) => {
      this.acc += arg
      this.pc++
    }
  }

  constructor() {
    return this
  }

  load(assembly: Asm[]) {
    this.reset()
    this.assembly = assembly

    return this
  }

  run() {
    this.reset()
    while (!this.halt) this.execute()

    return this
  }

  state() {
    return {
      acc: this.acc,
      pc: this.pc,
      halt: this.halt
    }
  }

  private reset() {
    this.acc = 0
    this.pc = 0
    this.halt = false
    this.rowsExecuted.clear()
  }

  private execute() {
    if (
      this.rowsExecuted.has(this.pc) ||
      this.pc < 0 ||
      this.pc >= this.assembly.length
    ) {
      this.halt = true
      return
    }
    this.rowsExecuted.add(this.pc)
    this.instructions[this.assembly[this.pc][0]](this.assembly[this.pc][1])
  }
}
