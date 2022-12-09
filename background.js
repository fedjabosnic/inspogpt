console.log("background.js ✅")

var openapikey;
var accessToken;
var expiry;

// Not currently used - api key not needed for chat.apoenapi.com endpoints
chrome.storage.sync.get("openapikey", function (data) {
    if (!chrome.runtime.error) {
        openapikey = data.openapikey;
    }
    else {
        openapikey = undefined;
    }
});

chrome.action.onClicked.addListener(tab => {
    console.log(`Extension icon clicked from '${tab.id}'`);
});

chrome.commands.onCommand.addListener(async (command, tab) => {
    console.log(`Command '${command}' called by '${tab.id}'`);

    // Get the current context from the calling tab
    var input = await chrome.tabs.sendMessage(tab.id, { command: "get-context" });

    // Get a response from GPT
    var value = await converse(input.id, input.value);

    // Set the new context to the calling tab
    await chrome.tabs.sendMessage(tab.id, { command: "set-context", id: input.id, value: value });
});

async function authorize() {
    await fetch("https://chat.openai.com/api/auth/session").then(async response => {
        var response = await response.json()
        accessToken = response.accessToken;
        expiry = new Date(response.expires);
    });
}

async function converse(id, prompt) {

    if (!accessToken || !expiry || expiry < Date.now()){
        console.log("Authorizing...");
        await authorize();
    }

    if (!accessToken){
        console.log("Something went wrong, unable to get access token");
        return;
    }

    return fetch("https://chat.openai.com/backend-api/conversation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
            action: "next",
            messages: [
                {
                    id: id,
                    role: "user",
                    content: {
                        content_type: "text",
                        parts: [prompt],
                    },
                },
            ],
            model: "text-davinci-002-render",
            parent_message_id: uuidv4()
        })
        })
        .then(async response => {
            // HACK: Wait for all events and split into list
            var resps = (await response.text()).split("data: ");
            // HACK: Take second to last event (last event is always "[DONE][", second to last is the most complete)
            var resp = resps[resps.length-2];

            console.log(resp);
            return JSON.parse(resp).message?.content?.parts?.[0];
        })
        .catch(function (error) {
            console.log(error);
        });

}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }