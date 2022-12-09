# Inspo GOPT

A chrome extension that let's you use ChatGPT on any webpage.

## Installation

This is super early days, it has to be installed manually. You can see [Google's guide here](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

## Usage

1. Ensure you are logged into `chat.openai.com` (visit manually).
2. Type your command for ChatGPT into any input on any webpage.
3. Click `Command`+`Shift`+`.`
4. Wait

After a bit of time, the extension will update the input's value with ChatGPT's response.

Have fun!

## Tested on

- ✅ Google Search
- ✅ [GMail](#gmail)
- ⛔ [Twitter](#twitter)


### GMail

The extension works well on GMail, give it a shot.

### Twitter

Twitter seems to do a lot of DOM manipulation around the input box for posting a tweet. It flipflops between using a `div` and a `span` in various situations and its responsive mobile view uses a whole different part of the DOM. This doesn't play nicely with the way the extension currently works (we mark the input you initiate on, and then later change its value when a response is received).

We might have to introduce a special workaround for this case...?