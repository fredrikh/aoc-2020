const checkFourDigitsBetween = (low: number, high: number) => (
  digits: string
) => /^\d{4}$/.test(digits) && checkBetween(Number(digits), low, high)

const checkHeight = (s: string) => {
  const [valid, height, unit] = /^(\d+)(cm|in)$/.exec(s) || ['']
  if (!valid) return false
  const [low, high] = unit === 'cm' ? [150, 193] : [59, 76]
  return checkBetween(Number(height), low, high)
}

const checkPassportID = (s: string) => /^\d{9}$/.test(s)
const checkHairColor = (s: string) => /^#[a-f0-9]{6}$/.test(s)
const checkEyeColor = (s: string) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(s)
const checkBetween = (n: number, low: number, high: number) =>
  low <= n && n <= high

const passportFieldNames = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid'
] as const

type PassportField = typeof passportFieldNames[number]
type Rule = (s: string) => boolean
type PassportRules = Record<PassportField, Rule>

const passportRules: PassportRules = {
  byr: checkFourDigitsBetween(1920, 2002),
  iyr: checkFourDigitsBetween(2010, 2020),
  eyr: checkFourDigitsBetween(2020, 2030),
  hgt: checkHeight,
  hcl: checkHairColor,
  ecl: checkEyeColor,
  pid: checkPassportID
}

export const countValidPassports = (passFields: string[][]) =>
  passFields.map(isValidPassport).filter(Boolean).length

const isValidPassport = (fields: string[]) => {
  const pp = fields
    .filter((s) => !/cid/.test(s))
    .map((s) => {
      const [field, value] = s.split(':')
      return { field: field as PassportField, value }
    })

  return (
    passportFieldNames.every((f) => pp.some((p) => p.field === f)) &&
    pp.every(({ field, value }) => passportRules[field](value))
  )
}
