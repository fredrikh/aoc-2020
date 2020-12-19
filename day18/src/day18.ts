type Operand = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Operator = '+' | '*'
type OpenParen = '('
type CloseParen = ')'
type Token = Operand | Operator | OpenParen | CloseParen

function isOperand(x: Token): x is Operand {
  return Boolean(Number(x))
}
function isOperator(x: Token): x is Operator {
  return ['+', '*'].includes(x)
}
function isOpenParen(x: Token): x is OpenParen {
  return x === '('
}
function isCloseParen(x: Token): x is CloseParen {
  return x === ')'
}

const peek = (stack: Token[]) => stack[stack.length - 1]

const hasHigherPrecedenceThan = (a: Token, b: Token) => a === '+' && b === '*'

const tokenize = (expr: string) => [...expr.replace(/\s/g, '')] as Token[]

const toPrefix = (tokens: Token[], useCrazyPrecedenceOrder = false) => {
  const stack: Token[] = []
  const prefixExpr: Token[] = []
  for (let t of tokens.reverse()) {
    if (isOperand(t)) {
      prefixExpr.push(t)
    } else if (isOperator(t)) {
      if (useCrazyPrecedenceOrder)
        while (hasHigherPrecedenceThan(peek(stack), t))
          prefixExpr.push(stack.pop()!)

      stack.push(t)
    } else if (isCloseParen(t)) {
      stack.push(t)
    } else if (isOpenParen(t)) {
      let u = stack.pop()!
      while (stack.length > 0 && !isCloseParen(u)) {
        prefixExpr.push(u)
        u = stack.pop()!
      }
    }
  }
  prefixExpr.concat(stack.reverse())
  return stack.reverse().concat(prefixExpr.reverse())
}

const evalPrefixExpression = (tokens: Token[]) => {
  const stack: number[] = []
  for (let t of tokens.reverse()) {
    if (isOperand(t)) {
      stack.push(Number(t))
    } else if (isOperator(t)) {
      const a = Number(stack.pop())
      const b = Number(stack.pop())
      if (t === '+') stack.push(a + b)
      else stack.push(a * b)
    }
  }
  return stack.pop() || 0
}

const evalExpr = (expr: string, useCrazyPrecedenceOrder = false) =>
  evalPrefixExpression(toPrefix(tokenize(expr), useCrazyPrecedenceOrder))

const sum = (a: number, b: number) => a + b

export const foo = (expressions: string[]) => {
  return expressions.map((e) => evalExpr(e)).reduce(sum)
}

export const foo2 = (expressions: string[]) => {
  return expressions.map((e) => evalExpr(e, true)).reduce(sum)
}
