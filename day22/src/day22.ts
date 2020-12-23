type Deck = number[]
type Player = {
  id: number
  deck: Deck
}
type DeckHistory = Set<string>

export const foo = (playerDecks: string[]) => {
  const a = toDeck(playerDecks[0])
  const b = toDeck(playerDecks[1])
  return score(playCombat(a, b))
}

export const foo2 = (playerDecks: string[]) => {
  const a = toDeck(playerDecks[0])
  const b = toDeck(playerDecks[1])
  return score(playRecursiveCombat(a, b))
}

const toDeck = (deckString: string): Player => {
  const [player, ...deck] = deckString.split('\n')
  const [id] = /\d/.exec(player)!
  return {
    id: Number(id),
    deck: deck.map(Number)
  }
}

const isEmpty = (deck: Deck) => deck.length === 0

const score = (player: Player) =>
  player.deck.reverse().reduce((a, b, i) => a + b * (i + 1), 0)

const playCombat = (playerA: Player, playerB: Player) => {
  while (!(isEmpty(playerA.deck) || isEmpty(playerB.deck))) {
    const cardA = playerA.deck.shift()!
    const cardB = playerB.deck.shift()!
    if (cardA > cardB) {
      playerA.deck.push(cardA)
      playerA.deck.push(cardB)
    } else {
      playerB.deck.push(cardB)
      playerB.deck.push(cardA)
    }
  }

  return winner(playerA, playerB)
}

const winner = (playerA: Player, playerB: Player) =>
  isEmpty(playerA.deck) ? playerB : playerA

// const deckState = (deck: Deck) =>
//   deck.map((card) => card.toString().padStart(2, '0')).join('')

const instantEnd = (
  historyA: DeckHistory,
  deckA: Deck,
  historyB: DeckHistory,
  deckB: Deck
) => {
  const stateA = deckA.toString()
  const stateB = deckB.toString()

  if (historyA.has(stateA) && historyB.has(stateB)) return true

  historyA.add(stateA)
  historyB.add(stateB)

  return false
}

const copy = (player: Player, n: number) => {
  return {
    id: player.id,
    deck: player.deck.slice(0, n)
  }
}
const playRecursiveCombat = (playerA: Player, playerB: Player, gameId = 1) => {
  const historyA: DeckHistory = new Set()
  const historyB: DeckHistory = new Set()
  let roundWinner: Player = playerA
  let round = 1
  let info: string[] = []
  while (!(isEmpty(playerA.deck) || isEmpty(playerB.deck))) {
    if (instantEnd(historyA, playerA.deck, historyB, playerB.deck))
      return playerA // Player 1 wins

    info.push(`=== Game ${gameId} ===`)
    info.push(`-- Round ${round} (Game ${gameId}) --`)
    info.push(`Player 1's deck: ${playerA.deck.join(', ')}`)
    info.push(`Player 2's deck: ${playerB.deck.join(', ')}`)

    const cardA = playerA.deck.shift()!
    const cardB = playerB.deck.shift()!
    info.push(`Player 1 plays: ${cardA}`)
    info.push(`Player 2 plays: ${cardB}`)
    if (cardA <= playerA.deck.length && cardB <= playerB.deck.length) {
      roundWinner = playRecursiveCombat(
        copy(playerA, cardA),
        copy(playerB, cardB),
        gameId + 1
      )!
      if (roundWinner.id === 1) {
        playerA.deck.push(cardA)
        playerA.deck.push(cardB)
      } else {
        playerB.deck.push(cardB)
        playerB.deck.push(cardA)
      }
    } else {
      if (cardA > cardB) {
        roundWinner = playerA
        playerA.deck.push(cardA)
        playerA.deck.push(cardB)
      } else {
        roundWinner = playerB
        playerB.deck.push(cardB)
        playerB.deck.push(cardA)
      }
    }
    // info.push(`Player ${roundWinner.id} wins round ${round} of game ${gameId}`)
    // console.log(info.join('\n'))
    info = []
    round++
  }

  return roundWinner
}
