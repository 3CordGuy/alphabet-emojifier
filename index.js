const converter = require('./utils/converter')
const html = require('./html')
const db = require('./db/counter')
const processParams = require('./utils/process-params')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  let { text, color, spacer, prefix } = await processParams(request)
  let newWordsCount = 0
  let newCharsCount = 0

  try {
    let { convertedText, totalChars, totalWords } = converter({
      text,
      prefix,
      spacer,
    })

    newWordsCount = (await db.get({ key: 'words_converted' })) || 0
    newCharsCount = (await db.get({ key: 'chars_converted' })) || 0

    if (text) {
      newWordsCount = newWordsCount
        ? parseInt(newWordsCount, 10) + totalWords
        : totalWords
      newCharsCount = newCharsCount
        ? parseInt(newCharsCount, 10) + totalChars
        : totalChars

      await db.put({ key: 'words_converted', data: newWordsCount })
      await db.put({ key: 'chars_converted', data: newCharsCount })
    }

    if (request.method === 'GET') {
      return new Response(
        await html({
          text,
          emojified: convertedText,
          counts: {
            words: newWordsCount,
            chars: newCharsCount,
          },
          color,
          spacer,
        }),
        {
          status: 200,
          headers: {
            'content-type': 'text/html;charset=UTF-8',
          },
        },
      )
    }

    return new Response(convertedText, {
      status: 200,
      'content-type': 'text/plain',
    })
  } catch (e) {
    console.log(e)
    return new Response(e)
  }
}
