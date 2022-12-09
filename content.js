console.log("content.js ✅")

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log(`Message from extension: '${request.command}' with '${request.value}'`);

        if (request.command == "get-context"){
            var element = document.activeElement;
            var type = element.tagName.toLowerCase();
            var value = undefined;
            var id = uuidv4();

            if (type === 'input' || type === 'textarea') {
                value = element.value;
                element.value = "";
            }
            else if (type === 'div' || type === 'span') {
                value = element.innerText;
                element.innerText = "";
            }
            else{
                console.log(`Unsupported element '${type}'`);
                return;
            }

            element.classList.add(id);
            spinnerStart(id, element, type);

            console.log(`Sending context '${value}'`);
            sendResponse({ command: "context", id: id, value: value });
        }
        if (request.command == "set-context"){
            var element = document.getElementsByClassName(request.id)[0];
            var type = element.tagName.toLowerCase();

            spinnerStop(request.id);
            element.classList.remove(request.id);

            console.log(`Setting context to '${request.value}'`);

            if (type === 'input' || type === 'textarea') {
                element.value = request.value;
            }
            else if (type === 'div' || type === 'span') {
                element.innerText = request.value;
            }
        }
    }
);

var spinners = {};

function spinnerStart(id, element, type){
    spinners[id] = setInterval(() => { 
        if (type === 'input' || type === 'textarea') {
            element.value = element.value + ".";
        }
        else if (type === 'div' || type === 'span') {
            element.innerText = element.innerText + ".";
        }
    }, 1000);
}

function spinnerStop(id){
    clearInterval(spinners[id]);
}



function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }