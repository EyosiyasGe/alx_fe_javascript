const SERVER_URL = 'https://jsonplaceholder.typicode.com/posts'; // Mock API URL

let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from localStorage
function loadQuotes() {
  const stored = localStorage.getItem('quotes');
  if (stored) quotes = JSON.parse(stored);
}

// Display a random quote
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

// Fetch quotes from server (simulate)
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    const data = await response.json();
    // Map to quote format, take first 10 for simulation
    return data.slice(0, 10).map(item => ({
      text: item.title,
      category: 'general'
    }));
  } catch (error) {
    console.error('Failed to fetch from server:', error);
    return [];
  }
}

// Sync local quotes with server quotes
async function syncWithServer() {
  const serverQuotes = await fetchQuotesFromServer();

  let updated = false;
  for (const sq of serverQuotes) {
    const exists = quotes.some(lq => lq.text === sq.text && lq.category === sq.category);
    if (!exists) {
      quotes.push(sq);
      updated = true;
    }
  }

  if (updated) {
    saveQuotes();
    alert('Quotes updated from server.');
    displayRandomQuote();
  }
}

// Add a new quote locally and simulate posting to server
function addQuote(text, category) {
  if (!text || !category) {
    alert('Please enter both quote and category.');
    return;
  }

  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  alert('Quote added locally.');

  // Simulate POST to server (not persisted in JSONPlaceholder)
  fetch(SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newQuote)
  }).then(() => {
    alert('Quote synced with server.');
  }).catch(err => {
    console.error('Failed to post quote:', err);
  });

  displayRandomQuote();
}

// Periodic sync every 15 seconds
setInterval(syncWithServer, 15000);

// On page load
window.onload = () => {
  loadQuotes();
  displayRandomQuote();
};
