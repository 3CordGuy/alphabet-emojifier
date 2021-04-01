module.exports = ({
  text = '',
  prefix = '',
  alphas = /^[A-Za-z]+$/,
  spacer = ' ',
  special = {
    '?': 'question',
    '!': 'exclamation',
  },
}) => {
  let convertedStr = ''
  let chars = text.toLowerCase().split('')
  let words = text.toLowerCase().split(' ')

  chars.forEach(char => {
    if (alphas.test(char)) {
      convertedStr += `:${prefix}-${char}:`
    } else if (special[char]) {
      convertedStr += `:${prefix}-${special[char]}:`
    } else if (char === ' ') {
      convertedStr += spacer
    } else {
      convertedStr += char
    }
  })

  return { converted: convertedStr, words: words.length, chars: chars.length }
}
