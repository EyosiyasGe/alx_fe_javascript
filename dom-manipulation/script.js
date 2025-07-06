let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
let lastCategory = localStorage.getItem("selectedCategory") || "all";

const quoteList = document.getElementById("quoteList");
const categoryFilter = document.getElementById("categoryFilter");
const quoteDisplay = document.getElementById("quoteDisplay");

// Initial setup
populateCategories();
categoryFilter.value = lastCategory;
filterQuotes();
displayRandomQuote(); // Show a random quote on load

function addQuote() {
  const newQuoteText = document.getElementById("newQuoteText").value.trim();
  const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

  if (newQuoteText && newQuoteCategory) {
    const newQuote = {
      text: newQuoteText,
      category: newQuoteCategory
    };

    quotes.push(newQuote);
    saveQuotes();
    populateCategories();
    filterQuotes();
    displayRandomQuote(); // Update random quote on add
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }
}

function displayQuotes(filteredQuotes = quotes) {
  quoteList.innerHTML = "";
  filteredQuotes.forEach(q => {
    const p = document.createElement("p");
    p.textContent = `[${q.category}] ${q.text}`;
    quoteList.appendChild(p);
  });
}

function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}

function filterQuotes() {
  const selected = categoryFilter.value;
  localStorage.setItem("selectedCategory", selected);

  const filtered = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  displayQuotes(filtered);
  displayRandomQuote(filtered); // Show a random quote from the filtered list
}

function displayRandomQuote(source = quotes) {
  if (!source.length) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * source.length);
  const quote = source[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}
