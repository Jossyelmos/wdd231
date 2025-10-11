const bookUrl = "https://openlibrary.org/search.json?q=harry+potter&limit=20";

document.addEventListener("DOMContentLoaded", () => {
    const books = document.querySelector("#results");
    const userSearch = document.querySelector("#search-input");
    const noBook = document.querySelector("#no-results");
    const form = document.querySelector("#search-form");
    const bookDetails = document.querySelector("#book-details");
    const historyBtn = document.querySelector("#history");
    const searchHistory = document.querySelector(".searchHistory");

    let currentBookLists = [];

    async function getBooks() {
        try {
            const response = await fetch(bookUrl);
    
            if (response.ok) {
                const data = await response.json();
                const randomBooks = data.docs.sort(() => 0.5 - Math.random());
                displayBook(randomBooks);
            } else {
                throw new  Error(await response.text());
            } 
        } catch (error) {
           console.log(error); 
        }
    };

    if (document.querySelector(".hero")) {
        getBooks();
    }


    function displayBook(booklists) {
        currentBookLists = booklists;
        books.innerHTML = "";

        booklists.forEach((book, index) => {
            const card = document.createElement('div');
            card.classList.add('book-card');
            card.setAttribute('data-index', index);

            const cover_image = document.createElement('img');
            if (book.cover_i) {
                cover_image.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`.replace('http://', 'https://');
                cover_image.crossOrigin = "anonymous";
                cover_image.loading = "lazy";
                cover_image.width = 128;
                cover_image.height = 192;
                cover_image.alt = `Cover of ${book.title}`;
                cover_image.setAttribute('loading', 'lazy');
            
                } else {
                    cover_image.alt = 'No cover image available';
                }

            const title = document.createElement('div');
            title.classList.add('book-title');
            title.textContent = book.title || "Untitled";

            const author = document.createElement('div');
            author.classList.add('book-author');
            author.textContent = book.author_name ? book.author_name.join(', ') : "Unknown Author";

            const publishYear = document.createElement('div');
            publishYear.classList.add('book-title');
            publishYear.textContent = book.first_publish_year || "Not available";

            card.appendChild(cover_image);
            card.appendChild(title);
            card.appendChild(author);
            card.appendChild(publishYear);

            books.appendChild(card)
        })
    };

    async function searchBooks() {
        try {
            const searchUrl = `https://openlibrary.org/search.json?q=${userSearch.value}&fields=key,title,author_name,cover_i,first_publish_year`;
            const response = await fetch(searchUrl);
            if (response.ok) {
                const data = await response.json();
                displayBook(data.docs);
                return data.docs;
            } else {
                return [];
            };
        } catch (error) {
            throw error;
        }
    };


    if (form) {
        form.addEventListener('submit', async(e) => {
            e.preventDefault();
            const query = userSearch.value.trim();
            if (!query) return;
        
            const results = await searchBooks();
            if (results && results.length > 0) {
                const history = JSON.parse(localStorage.getItem("searchResults")) || [];
                const timestampedEntry = {
                    query: query,
                    date: new Date().toLocaleString(),
                    results: results
                };
                history.push(timestampedEntry);
                localStorage.setItem("searchResults", JSON.stringify(history));
                localStorage.setItem("latestSearch", JSON.stringify(results)); // This creating a temporary storage for search results
                window.location.href = "library.html";
            } else {
                books.innerHTML = "";
                noBook.classList.remove('hidden');
            }
        });


        function getSearchHistory() {
            const history = JSON.parse(localStorage.getItem('searchResults', )) || [];
        
            if (!searchHistory) {
                console.warn("searchHistory element not found.");
                return;
            }
            
            searchHistory.innerHTML = "";
            
            history.forEach((entry, index) => {
                let userIndex = index + 1;
                const entryHTML = `
                <div class="history-entry">
                <p>${userIndex}</p>
                <p><strong>${entry.query}</strong></p>
                <p>${entry.date}</p>
                <p>(${entry.results.length})</p>
                </div>
            `;
            searchHistory.innerHTML += entryHTML;
            })
        };
        
        historyBtn.addEventListener('click', () => {
            getSearchHistory();
            searchHistory.classList.toggle('hidden');
        
        });    
    }


    // Dialog scripts
    function displayBookDetails(book) {
        if (bookDetails) {

            bookDetails.innerHTML = '';
            const coverSrc = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : 'images/placeholder-cover.jpg';
    
            bookDetails.innerHTML = `
            <button id="closeModal">❌</button>
            <h2>Title: ${book.title}</h2>
            <h3>Author: ${book.author_name ? book.author_name.join(', ') : "Unknown Author"}</h3>
            <img src= ${coverSrc} alt='Cover of ${book.title}' loading='lazy' />
            <p><strong>Editions</strong>: ${book.edition_count}</p>
            <p><strong>First Published:</strong>: ${book.first_publish_year}</p>
            
            `;
            const closeModal = document.querySelector("#closeModal");
            bookDetails.showModal();
            
            closeModal.addEventListener("click", () => {
            bookDetails.close();
            });
        }
    };

    if (books) {
        books.addEventListener('click', (e) => {
            const card = e.target.closest('.book-card')
            if (card) {
                const index = card.getAttribute("data-index");
                if (index !== null && currentBookLists[index]) {
                    displayBookDetails(currentBookLists[index]);
                }
            }
        });
    }

    // Loading search results in library.html
    const latestSearch = JSON.parse(localStorage.getItem("latestSearch"));
    if (latestSearch) {
        displayBook(latestSearch);
        localStorage.removeItem("latestSearch");
    }

    // Thankyou page info display
    if (window.location.pathname.includes("thankyou.html")) {
        window.addEventListener('DOMContentLoaded', () => {
        const formData = new URLSearchParams(window.location.search);
        console.log(formData);
        const formResult = document.querySelector("#formData");
        const timestamp = document.querySelector("#timestamp");
        
        const now = new Date().toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            });
        if (timestamp) {
            timestamp.value = now;
        }
        
        if (formResult) {
            formResult.innerHTML = `
                <h2>Form Entry for:</strong></h2>
                <p><strong>Name:</strong> ${formData.get('name')}</p>
                <p><strong>Email:</strong> ${formData.get('email')}</p>
                <p><strong>Message:</strong> ${formData.get('message')}</p>
                <p><strong>Date:</strong> ${now}</p>
            `;
            } else {
            console.error("Timestamp element not found");
            }
        })
    }
});

// FOOTER SCRIPTS

const year = document.querySelector("#currentyear");

const today = new Date();

year.innerHTML = today.getFullYear();
