# alphabet-emojifier

Convert text to slack's alphabet emojis

This is a little demo project that uses Cloudlfare workers to run a string processing script that turns your text into slack alphabet emojis.

It runs the conversion in the cloud using a worker then returns simple rendered html back to the client.

## To run locally

```
// clone the repo
cd alphabet-emojifier
```

### Requirements

[Cloudflare Workers Wrangler CLI](https://developers.cloudflare.com/workers/get-started/guide)

```
// install deps
yarn install

// then
wrangler dev

// follow the prompts
```

## Try it out

[Online Demo](https://alphabet-emojifier.3cordguy.workers.dev)

## Slack Alpha-what?

Slack comes with a built in emoji pack that lets you use emoji alphabet.

If you pasted your converted string into slack and it does nothing fancy, try this:

1. Click the emoji button in the text input area
1. Click the _add emoji_ button in the bottom left of the popup
1. Click the tab that says _emoji packs_ and install the alphabet pack
1. Annoy your coworkers!
