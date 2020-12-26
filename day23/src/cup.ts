class Cup {
  private readonly _label: number
  get label(): number {
    return this._label
  }

  private _destination?: Cup
  get destination(): Cup {
    return this._destination!
  }
  set destination(cup: Cup) {
    this._destination = cup
  }

  private _next: Cup | undefined
  get next(): Cup | undefined {
    return this._next!
  }
  set next(cup: Cup | undefined) {
    this._next = cup
  }

  constructor(label: number) {
    this._label = label
    this._destination = undefined
    this._next = undefined
  }
}

export class CupCircle {
  private _current: Cup
  private _cupOne: Cup

  private _picked: Cup | undefined = undefined

  constructor(startLabels: number[], maxLabel: number) {
    const highestStartLabel = Math.max(...startLabels)
    const cups = startLabels.map((label) => new Cup(label))
    const numberToCup = cups.reduce((acc: Record<number, Cup>, cup) => {
      acc[cup.label] = cup
      return acc
    }, {})
    const getDestinationFor = (label: number) =>
      numberToCup[label === 1 ? highestStartLabel : label - 1]

    this._cupOne = numberToCup[1]
    this._current = cups.shift()!
    this._current.destination = getDestinationFor(this._current.label)

    let last: Cup = this._current

    cups.forEach((cup) => {
      last.next = cup
      last = cup
      cup.destination = getDestinationFor(cup.label)
    })

    if (maxLabel > highestStartLabel) {
      for (let i = highestStartLabel + 1; i <= maxLabel; i++) {
        const cup = new Cup(i)
        if (i === highestStartLabel + 1) {
          cup.destination = getDestinationFor(i)
        } else {
          cup.destination = last
        }
        last.next = cup
        last = cup
      }
      numberToCup[1].destination = last
    }

    last.next = this._current
  }

  pick() {
    const first = this._current.next
    const last = first!.next!.next
    this._current.next = last!.next!
    this._picked = first
    last!.next = undefined
  }

  addPicked() {
    if (this._picked === undefined) return
    const first = this._picked
    const last = first!.next!.next
    const target = this.findDestination()
    last!.next = target.next
    target.next = first!
    this._picked = undefined
  }

  findDestination() {
    const pickedLabels = []
    pickedLabels.push(this._picked!.label)
    pickedLabels.push(this._picked!.next!.label)
    pickedLabels.push(this._picked!.next!.next!.label)

    let target = this._current.destination

    while (pickedLabels.includes(target.label)) target = target.destination

    return target
  }

  move() {
    this.pick()
    this.addPicked()
    this._current = this._current.next!
  }

  resultA() {
    const labels: number[] = []
    let cup = this._cupOne.next!
    do {
      labels.push(cup.label)
      cup = cup.next!
    } while (cup !== this._cupOne)

    return labels.join('')
  }

  resultB() {
    return this._cupOne.next?.label! * this._cupOne.next?.next?.label!
  }
}
