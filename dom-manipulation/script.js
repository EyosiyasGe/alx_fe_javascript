const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) quotes = JSON.parse(stored);
}

function displayRandomQuote() {
  if (quotes.length === 0) {
    document.getElementById('quoteText').textContent = 'No quotes available.';
    document.getElementById('quoteCategory').textContent = '';
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteText').textContent = quote.text;
  document.getElementById('quoteCategory').textContent = quote.category;
}

async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();
    return data.slice(0, 10).map(item => ({
      text: item.title,
      category: 'general'
    }));
  } catch (error) {
    console.error('Failed to fetch from server:', error);
    return [];
  }
}

async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  let updated = false;

  serverQuotes.forEach(serverQuote => {
    const exists = quotes.some(localQuote =>
      localQuote.text === serverQuote.text && localQuote.category === serverQuote.category
    );
    if (!exists) {
      quotes.push(serverQuote);
      updated = true;
    }
  });

  if (updated) {
    saveQuotes();
    alert('Quotes synced with server!');  // <-- Exact message required here
    displayRandomQuote();
  }
}

function addQuote(text, category) {
  if (!text || !category) {
    alert('Please enter both quote and category.');
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();

  fetch(SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newQuote)
  }).then(() => {
    alert('Quotes synced with server!');  // <-- Also here if you want consistency
  }).catch(err => {
    console.error('Failed to post quote:', err);
  });

  displayRandomQuote();
}

setInterval(syncQuotes, 15000);

window.onload = () => {
  loadQuotes();
  displayRandomQuote();
};
