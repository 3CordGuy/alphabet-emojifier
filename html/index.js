const html = async ({ text, emojified, spacer, color }) => {
  const getEmojified = emo => {
    return `
        <label class="field">Emojification Complete 🎉</label>
        <textarea id="emojified" rows="6" readonly>${emo}</textarea>
        <button id="copy">Copy</button>
      `
  }

  return `
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="description" content="Emojify your text with slack's alphabet emoji pack." />
            <meta property="og:title" content="Alphabet Emojifier by 🥨Josh" />
            <meta property="og:description" content="Emojify your text with slack's alphabet emoji pack." />
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title>Alphabet Emojifier</title>

            <style>
              body {
                color: #333;
                font-family: Sans-serif;
                background: #8e9eab;  /* fallback for old browsers */
                background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab);  /* Chrome 10-25, Safari 5.1-6 */
                background: linear-gradient(to right, #eef2f3, #8e9eab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

              }

              h1 {
                font-size: 1.5rem;
              }

              h2 {
                font-size: 1.2rem;
              }

              h3 {
                font-size: 1rem;
              }

              form {
                width: 600px;
                margin: 20px auto;
              }

              textarea {
                width: 600px;
                margin: 0 auto;
                background: #eee;
                border-radius: 4px;
                border: 1px solid #ccc;
                white-space: wrap;
                padding: 8px 12px;
              }

              small {
                margin-top: 10px;
                display: block;
                font-size: 0.7em;
              }

              table {
                margin-top: 20px;
              }

              label.field {
                display: block;
                font-weight: bold;
                margin-bottom: 8px;
                text-align: left;
              }

              label.field small {
                  display: inline;
                  font-weight: normal;
                  color: #333;
                  font-size: 0.6em;
              }

              input[type="text"] {
                display: block;
                padding: 8px 12px;
                border-radius: 4px;
                border: 1px solid #ccc;
              }

              input[type="text"],
              textarea {
                margin-bottom: 20px;
              }

              button{
                background-image: linear-gradient(
                  to right,
                  #ff512f 0%,
                  #dd2476 51%,
                  #ff512f 100%
                );
              }
              button{
                display: block;
                margin-bottom: 20px;
                padding: 8px 16px;
                text-align: center;
                text-transform: uppercase;
                transition: 0.5s;
                background-size: 200% auto;
                color: white;
                border-radius: 10px;
                border: none;
                cursor: pointer;
              }

              button:hover {
                background-position: right center; /* change the direction of the change here */
                color: #fff;
                text-decoration: none;
              }

              .field-group {
                display: flex;
                flex-direction: row;
                align-content: center;
                align-items: start;
              }

              .field-group > div {
                margin-right: 20px;
              }

              #emojifier {
                margin: 20px auto;
                text-align: center;
                max-width: 600px;
              }

              a, a:active, a:visited {
                cursor: pointer;
                color: #ff512f;
              }
            </style>
        </head>

        <body>
          <div id="emojifier">
            <h1>Alphabet Emojifier <small>by <a target="_blank" href="https://twitter.com/3cordguy">🥨Josh</a></small></h1>
            <form method="GET" action="">
              <label class="field">
                Text to Emojify
              </label>
              <textarea name="text" rows="6">${text}</textarea>
              <div class="field-group">
                <div>
                  <label class="field">
                    Color
                  </label>
                  <label><input type="radio" value="white" name="color" ${
                    color === 'white' || !color ? 'checked' : ''
                  }/>White</label>
                  <label><input type="radio" value="yellow" name="color" ${color ===
                    'yellow' && 'checked'}/>Yellow</label>
                </div>
                <div>
                  <label class="field">
                    Spacer <small>(replaces all space characters)</small>
                  </label>
                  <input type="text" name="spacer" placeholder=":clap:" value="${spacer}" />
                </div>
              </div>
              <button type="submit">Emojify it!</button>
            </form>

            <hr>

            ${emojified ? getEmojified(emojified) : ''}
            <small>Copyright 2021 Josh Weaver</small>
            <small><a href="https://github.com/3CordGuy/alphabet-emojifier" target="_blank">Source Code</a></small>
          </div>
        </body>

        <script>
          document.querySelector('button#copy').addEventListener('click', async event => {
            const emojified = document.getElementById('emojified').value
            const text = event.target.innerText
            try {
              await navigator.clipboard.writeText(emojified)
              event.target.textContent = 'Copied to clipboard 👍'
            } catch (err) {
              console.error('Failed to copy!', err)
            }
          })
        </script>
        </html>
      `
}

module.exports = html
