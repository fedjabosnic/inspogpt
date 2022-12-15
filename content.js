console.log("content.js ✅")

var subject;
var widget;
var box;
var input;
var button;
var temp;

function createWidget() {

    widget = document.createElement("div");
    widget.id = "inspogpt-widget"
    widget.className = "inspogpt-widget";

    box = document.createElement("div");
    box.id = "inspogpt-widget-box"
    box.className = "inspogpt-widget-box bottom";

    input = document.createElement("textarea");
    input.id = "inspogpt-widget-input"
    input.className = "inspogpt-widget-input";
    input.setAttribute("rows", "1");

    button = document.createElement("button");
    button.id = "inspogpt-widget-button"
    button.className = "inspogpt-widget-button visible";
    button.innerHTML = '<svg id="inspogpt-submit" viewBox="-5 0 25 25" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>'

    spinner = document.createElement("div");
    spinner.id = "inspogpt-spinner";
    spinner.className = "dot-flashing";

    temp = document.createElement("textarea");
    temp.id = "inspogpt-temp"

    widget.addEventListener("click", e => this.widget.classList.remove("is-open"));
    button.addEventListener("click", e => e.stopPropagation());
    input.addEventListener("click", e => e.stopPropagation());
    box.addEventListener("click", e => e.stopPropagation());

    input.addEventListener('keydown', e => {
        autosize(this.input);

        if (e.code == "Escape") this.widget.classList.remove("is-open");
        if (e.code == "Enter" && !e.getModifierState("Shift")) e.preventDefault();
    });
    input.addEventListener('keyup', async e => {
        if (e.code == "Enter" && !e.getModifierState("Shift")) {
            e.preventDefault();

            spinner.classList.add("visible");
            button.classList.remove("visible");
            input.setAttribute("disabled", "");

            var answer = await chrome.runtime.sendMessage({ command: "converse", id: uuidv4(), value: this.input.value });

            this.input.innerText = "";
            this.widget.classList.remove("is-open");

            console.log(`Setting context`);

            spinner.classList.remove("visible");
            button.classList.add("visible");
            input.removeAttribute("disabled", "");

            this.temp.textContent = answer.value;
            this.temp.select();
            document.execCommand('copy');
            this.temp.textContent = "";

            this.subject.focus();
            document.execCommand('paste');
        }
    });

    box.appendChild(input);
    box.appendChild(button);
    box.appendChild(spinner);
    widget.appendChild(box);
    document.body.appendChild(temp);
    document.body.appendChild(widget);
}

createWidget();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        console.log(`Message from extension: '${request.command}' with '${request.value}'`);

        if (request.command == "open") {
            subject = document.activeElement;
            autosize(input);
            widget.classList.add('is-open');
            input.focus();

            setTimeout(() => { this.input.focus() }, 0);
        }
    }
);

function autosize(element) {
    setTimeout(function () {
        element.style.cssText = 'height: 0;';
        element.style.cssText = 'height: ' + element.scrollHeight + 'px;';
    }, 0);
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}