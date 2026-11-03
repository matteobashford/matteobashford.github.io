let newQuoteBtn = document.querySelector("button");
let answerBtn = document.getElementById("js-tweet");
let quoteTxt = document.getElementById("js-quote-text");
let answerTxt = document.getElementById("js-answer-text");

let answer = "";

const endPoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
const errorMsg = "Error: Failed to get quote"

newQuoteBtn.addEventListener("click", getQuote)
// document.addEventListener("DOMContentLoaded", getQuote) Anthony told me this was too much : ( so now I just run getQuote at the bottom
answerBtn.addEventListener("click", displayAnswer)

async function getQuote() {
    console.log("clicked");

    try {
        const response = await fetch(endPoint);
        if (!response.ok) {
            throw Error(response.statusText)
        }
        const json = await response.json();
        console.log(json);
        displayQuote(json.question);
        answer = json.answer;
    } catch (error) {
        console.log(errorMsg);
        alert(errorMsg);
    }
}

function displayQuote(quote) {
    quoteTxt.innerHTML = quote;
    answer = ""
    displayAnswer();
}

function displayAnswer() {
    answerTxt.innerHTML = answer;
}

getQuote();

// I couldn't figure out the fetch stuff at first so I had done it with XMLHttpRequest because that's what was in the reading
//I switched to using fetch because I was worried it was required, and Anothony went over it in class so I was able to figure it out

//The following indented stuff was the contents of the getQuote() function in place of the fetch

    // let xhr = new XMLHttpRequest();
    // xhr.responseType = "json";
    // xhr.addEventListener("load", quoteHandler);
    // xhr.open("GET", endPoint);
    // xhr.send();

//This function was the handler for the XMLHttpRequest, and is unneeded for the fetch version

// function quoteHandler() {
//     try {
//         if (this.response.approved == true) {
//             console.log(this.response.question);
//             displayQuote(this.response.question);
//             answer = this.response.answer;
//         } else throw new error;
//     }
    
//     catch(error){
//         console.log(errorMsg);
//         alert(errorMsg);
//     } 
// }




