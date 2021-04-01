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
  text
    .toLowerCase()
    .split('')
    .forEach(char => {
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

  return convertedStr
}
