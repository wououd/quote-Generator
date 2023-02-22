const quoteContainer = document.getElementById('quote-container');
let quoteText = document.getElementById("quote");
let author = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");


let apiQuotes =[];

// Show new Quote
function newQuote(){
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    
    if(quote.text.length>120){
        quoteText.classList.add("long-quote");  
    }else{
        quoteText.classList.remove("long-quote");  
    }
    quoteText.textContent= quote.text;

    // if author field is blank replaced with Unkown
    if(!quote.author){
    author.textContent="Unknown";
    }else{
        author.textContent= quote.author;
    }

}
// Get Quotes from API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try{
     const response = await fetch(apiUrl);
     apiQuotes = await response.json();
     newQuote();
    }catch(error){
    // Catch error here
     console.log(error);
    } 
}
// On load
getQuotes();

//Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listener
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

