type Rule = string | number
type RuleBook = Record<number, Rule[]>

// Neve more than one '|' in a rule
// Build on regular expression or all possible strings
const parseRules = (input: string[]) => {
  const rules: RuleBook = {}
  input.forEach((row) => {
    const [id, rule] = row.split(':')
    rules[Number(id)] = ruleToArray(rule)
  })
  return rules
}

function isString(x: Rule): x is string {
  return typeof x === 'string'
}
const expandRule = (rules: RuleBook, r: Rule): string => {
  if (isString(r)) return r

  return rules[r].map((s) => expandRule(rules, s)).join('')
}

const ruleToArray = (rule: string): Rule[] => {
  const pipe = /\|/.test(rule)
  const parts = rule
    .trim()
    .split(' ')
    .map((part) => {
      if (/\d+/.test(part)) return parseInt(part)
      if (/a|b/.test(part)) return part.replace(/"/g, '')
      return part
    })

  return pipe ? ['(', ...parts, ')'] : parts
}

const createValidatorFor = (rules: RuleBook, rule: number) => {
  const rx = new RegExp(`^${expandRule(rules, rule)}$`)
  return (message: string) => rx.test(message)
}

const parseInput = (input: string): [RuleBook, string[]] => {
  const [ruleRows, messageRows] = input.split('\n\n')
  const rules = parseRules(ruleRows.split('\n'))
  const messages = messageRows.split('\n')
  return [rules, messages]
}

export const foo = (input: string) => {
  const [rules, messages] = parseInput(input)
  const validator = createValidatorFor(rules, 0)

  return messages.map(validator).filter(Boolean).length
}

export const foo2 = (input: string) => {
  const [rules, messages] = parseInput(input)
  const r31 = [expandRule(rules, 31)]
  const r42 = [expandRule(rules, 42)]
  rules[8] = [`${r42}+`]
  // Jaja, orka... Det får bli så här
  rules[11] = [
    `(((${r42})(${r31}))|((${r42}){2}(${r31}){2})|((${r42}){3}(${r31}){3})|((${r42}){4}(${r31}){4})|((${r42}){5}(${r31}){5}))`
  ]
  const validator = createValidatorFor(rules, 0)

  return messages.map(validator).filter(Boolean).length
}
