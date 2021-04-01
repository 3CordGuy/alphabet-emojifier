# alphabet-emojifier

Convert text to Slack's alphabet emojis

This is a little demo project that uses Cloudlfare workers to run a string processing script that turns your text into slack alphabet emojis.

- Runs the conversion in the cloud, on the edge
- Stores counts in the Cloudflare Worker KV Store
- Returns HTML for GET requests based on params
- Gives you super powers to annoy your coworkers on Slack

![Alphabet Emojifier Tool](https://user-images.githubusercontent.com/30707961/113357360-e293db80-9311-11eb-9fb8-fabbd816aa3a.png)

## Try it out

[Online Demo](https://alphabet-emojifier.3cordguy.workers.dev)

## To run locally

```
// clone the repo
cd alphabet-emojifier
```

#### Requirements

[Cloudflare Workers Wrangler CLI](https://developers.cloudflare.com/workers/get-started/guide)

```
// install deps
yarn install

// then
wrangler dev

// follow the prompts
```

## Slack Alpha-moji-what!? 🤔

Slack comes with a built in emoji pack that lets you use emoji alphabet.

If you pasted your converted string into slack and it does nothing fancy, try this:

1. Click the emoji button in the text input area
1. Click the _add emoji_ button in the bottom left of the popup
1. Click the tab that says _emoji packs_ and install the alphabet pack
1. Annoy your coworkers!
