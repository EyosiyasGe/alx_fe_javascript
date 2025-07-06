let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
let lastCategory = localStorage.getItem("selectedCategory") || "all";

const quoteList = document.getElementById("quoteList");
const categoryFilter = document.getElementById("categoryFilter");

// Display all quotes initially
displayQuotes();
populateCategories();
categoryFilter.value = lastCategory;
filterQuotes();

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
    displayQuotes();
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

  if (selected === "all") {
    displayQuotes(quotes);
  } else {
    const filtered = quotes.filter(q => q.category === selected);
    displayQuotes(filtered);
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}
