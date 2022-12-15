# Inspo GPT

A chrome extension that let's you use ChatGPT on any webpage.


https://user-images.githubusercontent.com/1388990/207921600-68dbabb2-6f16-4d29-97b3-70f7b8781d0f.mp4

https://user-images.githubusercontent.com/1388990/207921625-7b72eda7-9b2d-41f0-a181-653a65c24e56.mp4



## Installation

This is super early days, it has to be installed manually.

You can see [Google's guide here](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

## Usage

1. Ensure you are logged into `chat.openai.com` (visit manually in any tab).
2. Inside an `input` or `textarea`, use the shortcut `cmd` + `shift` + `.`.
2. Type your prompt for ChatGPT into the chat box.
4. Wait for magic.

After a bit of time, the extension will update the input's value with ChatGPT's response.

Have fun!

## Verified on

- ✅ GMail
- ✅ Twitter
- ⛔ [Twitter](#twitter)


## Known issues

### ⛔ Google Docs
Google Docs uses a weird DOM with nested canvases and other trickery so it doesn't seem to work.

> Workaround: When the prompt returns, the response is in the clipboard so just paste into the document with `cmd` + `v`...