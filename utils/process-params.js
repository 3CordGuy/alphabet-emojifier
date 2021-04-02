module.exports = async req => {
  const DEFAULT_COLOR = 'white'
  let parsed = { text: '', color: 'white', spacer: ' ' }

  if (req.method === 'GET') {
    const { searchParams } = new URL(req.url)
    parsed.text = searchParams.get('text') || ''
    parsed.color = searchParams.get('color') || DEFAULT_COLOR
    parsed.spacer = searchParams.get('spacer') || ':clap:'
  }

  if (req.method === 'POST') {
    let json = JSON.parse(await req.text())
    parsed.text = json.text
    parsed.color = json.color || DEFAULT_COLOR
    parsed.spacer = json.spacer || ''
  }

  let prefix = parsed.color === 'yellow' ? 'alphabet-yellow' : 'alphabet-white'

  return {
    text: parsed.text,
    color: parsed.color,
    spacer: parsed.spacer,
    prefix,
  }
}
