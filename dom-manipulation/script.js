const qout = document.getElementById('quoteDisplay');
const btn = document.getElementById('newQuote');

const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", category: "Wisdom" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Perseverance" },
  { text: "Happiness is not something ready made. It comes from your own actions.", category: "Happiness" },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", category: "Mindfulness" },
  { text: "It does not matter how slowly you go as long as you do not stop.", category: "Persistence" },
  { text: "A person who never made a mistake never tried anything new.", category: "Creativity" },
  { text: "You miss 100% of the shots you don’t take.", category: "Courage" }
];

const createAddQuoteForm = function () {
const newq = document.getElementById('newQuoteText').value.trim();
const catg = document.getElementById('newQuoteCategory').value.trim(); 


if ( newq !=='' && catg !==""){
    const sho = document.createElement('p');    
    sho.textContent = `${catg} ${newq}`
    qout.appendChild(sho);

    quotes.push({ text: newq, category: catg });

    const userjson = JSON.stringify(quotes);
    localStorage.setItem('quote', userjson);

    newq.value = '';
    catg.value = '';
    }

}
function showRandomQuote () 
{
const back = localStorage.getItem('quote');
if (!back) {
    console.log("No quotes found in localStorage.");
    return;
}
const dis = JSON.parse(back);

const randomidx =  Math.floor(Math.random() * dis.length);

const randstring = dis[randomidx];

qout.innerHTML = `"${randstring.text}" <br> <em>— ${randstring.category}</em>`;

}

btn.addEventListener('click',showRandomQuote )
