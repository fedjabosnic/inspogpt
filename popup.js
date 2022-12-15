document.addEventListener("DOMContentLoaded", () => {

    // var input = document.getElementById("key");
    // var output = document.getElementById("data");

    // chrome.storage.sync.get("openapikey", function (data) {
    //     if (!chrome.runtime.error) {
    //         output.innerText = mask(data.openapikey);
    //     }
    // });

    // document.getElementById("set").onclick = function () {
        
    //     chrome.storage.sync.set({ "openapikey": input.value }, function () {
    //         if (chrome.runtime.error) {
    //             console.log("Runtime error.");
    //         }
    //     });
        
    //     output.innerText = mask(input.value);
    //     input.value = "";
    // }
});

function mask(str){
    return str.substring(0,3) + "******" + str.substring(str.length - 4, str.length);
}