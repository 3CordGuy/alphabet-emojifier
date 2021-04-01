const converter = require('./utils/converter')
const html = require('./html')
const db = require('./db/counter')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  let parsed = { text: '', color: 'white', space: ' ' }
  const DEFAULT_COLOR = 'white'
  let newWordsCount = 0
  let newCharsCount = 0

  if (request.method === 'GET') {
    const { searchParams } = new URL(request.url)
    parsed.text = searchParams.get('text') || ''
    parsed.color = searchParams.get('color') || DEFAULT_COLOR
    parsed.spacer = searchParams.get('spacer') || ':clap:'
  }

  if (request.method === 'POST') {
    let json = JSON.parse(await request.text())
    parsed.text = json.text
    parsed.color = json.color || DEFAULT_COLOR
    parsed.spacer = json.spacer || ''
  }

  const prefix =
    parsed.color === 'yellow' ? 'alphabet-yellow' : 'alphabet-white'

  try {
    let { converted, words, chars } = converter({
      text: parsed.text,
      prefix,
      spacer: parsed.spacer,
    })

    newWordsCount = (await db.get({ key: 'words_converted' })) || 0
    newCharsCount = (await db.get({ key: 'chars_converted' })) || 0
    console.log(newWordsCount, newCharsCount)
    if (parsed.text) {
      newWordsCount = newWordsCount
        ? parseInt(newWordsCount, 10) + words
        : words
      newCharsCount = newCharsCount
        ? parseInt(newCharsCount, 10) + chars
        : chars

      await db.put({ key: 'words_converted', data: newWordsCount })
      await db.put({ key: 'chars_converted', data: newCharsCount })
    }

    if (request.method === 'GET') {
      return new Response(
        await html({
          text: parsed.text,
          emojified: converted,
          counts: {
            words: newWordsCount,
            chars: newCharsCount,
          },
          color: parsed.color,
          spacer: parsed.spacer,
        }),
        {
          status: 200,
          headers: {
            'content-type': 'text/html;charset=UTF-8',
          },
        },
      )
    }

    return new Response(converted, {
      status: 200,
      'content-type': 'text/plain',
    })
  } catch (e) {
    console.log(e)
    return new Response(e)
  }
}
