let newQuoteBtn = document.querySelector("button");
let answerBtn = document.getElementById("js-tweet");
let quoteTxt = document.getElementById("js-quote-text");
let answerTxt = document.getElementById("js-answer-text");

let answer = "";

const endPoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";
const errorMsg = "Error: Failed to get quote"

newQuoteBtn.addEventListener("click", getQuote)
document.addEventListener("DOMContentLoaded", getQuote)
answerBtn.addEventListener("click", displayAnswer)

function getQuote() {
    console.log("clicked");
    
    let xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.addEventListener("load", quoteHandler);
    xhr.open("GET", endPoint);
    xhr.send();
}

function quoteHandler() {
    try {
        if (this.response.approved == true) {
            console.log(this.response.question);
            displayQuote(this.response.question);
            answer = this.response.answer;
        } else throw new error;
    }
    
    catch(error){
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


