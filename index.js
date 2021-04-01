const converter = require('./utils/converter')
const html = require('./html')

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  let parsed = { text: '', color: 'white', space: ' ' }
  let DEFAULT_COLOR = 'white'

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
    let converted = converter({
      text: parsed.text,
      prefix,
      spacer: parsed.spacer,
    })

    if (request.method === 'GET') {
      return new Response(
        await html({
          text: parsed.text,
          emojified: converted,
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
