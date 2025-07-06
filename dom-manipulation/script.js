// Sample local quotes
let quotes = [
  { text: "The only limit is your mind.", category: "Motivation" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Load quotes from localStorage
function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) quotes = JSON.parse(stored);
}

// Display random quote
function displayRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quoteText").textContent = quote.text;
  document.getElementById("quoteCategory").textContent = quote.category;
}

// Simulate server fetch (replace with real fetch in real app)
function fetchFromServer() {
  return new Promise((resolve) => {
    // Simulate server-side quotes
    const serverQuotes = [
      { text: "Dream big. Work hard.", category: "Motivation" },
      { text: "First, solve the problem. Then, write the code.", category: "Programming" }
    ];
    setTimeout(() => resolve(serverQuotes), 1000); // Simulate delay
  });
}

// Simulate server post (replace with real POST in real app)
function postToServer(newQuotes) {
  return new Promise((resolve) => {
    console.log("Posted to server:", newQuotes);
    setTimeout(() => resolve({ status: "success" }), 1000);
  });
}

// Sync with server
async function syncWithServer() {
  const serverQuotes = await fetchFromServer();
  let updated = false;

  // Conflict resolution: Server always wins
  for (let sq of serverQuotes) {
    if (!quotes.some(lq => lq.text === sq.text && lq.category === sq.category)) {
      quotes.push(sq);
      updated = true;
    }
  }

  if (updated) {
    saveQuotes();
    alert("Quotes updated from server.");
  }
}

// Periodically sync every 10 seconds
setInterval(syncWithServer, 10000);

// Manual add quote
function addQuote(text, category) {
  const newQuote = { text, category };
  quotes.push(newQuote);
  saveQuotes();
  postToServer([newQuote]); // simulate pushing to server
  displayRandomQuote();
}

// Load data on startup
window.onload = () => {
  loadQuotes();
  displayRandomQuote();
};
