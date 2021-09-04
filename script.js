let myLibrary = [];
const form = document.querySelector("form");
const titleInput = document.getElementById("title-input");
const yearInput = document.getElementById("year-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const languageInput = document.getElementById("language-input");
const statusInput = document.getElementById("status-input");
const ratingInput = document.getElementById("rating-input");
const gallery = document.querySelector(".gallery");

function Book (title, year, author, pages, language, isRead, rating) {
    this.title = title;
    this.year = year;
    this.author = author;
    this.pages = Number(pages);
    this.language = language;
    this.isRead = isRead;
    this.rating = rating;
}

function addBook (title, year, author, pages, language, isRead, rating) {
    let newBook = new Book(title, year, author, pages, language, isRead, rating);
    myLibrary.push(newBook);
}

function submitBook () {
    title = titleInput.value;
    year = yearInput.value;
    author = authorInput.value;
    pages = pagesInput.value;
    language = languageInput.value;
    isRead = statusInput.checked;
    rating = ratingInput.value;
    addBook(title, year, author, pages, language, isRead, rating);
    form.reset();
}

(function enableSubmissions () {
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", submitBook);
})();

addBook("Lord of The Rings", 1954, "J. R. R. Tolkien", 523, "English", true, 4);
addBook("Harry Potter", 1997, "J. K. Rowling", 354, "English", false, 3);

(function displayBook() {
    for (let i = 0 ; i < myLibrary.length ; i++) {
        let bookNode = document.createElement("div");
        bookNode.classList.add("card");

        let titleDisplay = document.createElement("p");
        titleDisplay.textContent  = `${myLibrary[i].title} (${myLibrary[i].year})`;
        titleDisplay.classList.add("titleDisplay");

        let authorDisplay = document.createElement("p");
        authorDisplay.textContent = `by ${myLibrary[i].author}`;
        authorDisplay.classList.add("authorDisplay");

        let statusDisplay;
        myLibrary[i].isRead ?
           statusDisplay = "Read" :
           statusDisplay = "Currently reading";

        let ratingDisplay = "";
        for (count = 0; count < myLibrary[i].rating; count++) {
            ratingDisplay += '★';
        }

        let smallerDisplay = document.createElement("p");
        smallerDisplay.textContent = `${ratingDisplay} | ${myLibrary[i].pages} pages | ${myLibrary[i].language} | ${statusDisplay}`;
        smallerDisplay.classList.add("smallerDisplay");

        bookNode.appendChild(titleDisplay);
        bookNode.appendChild(authorDisplay);
        bookNode.appendChild(smallerDisplay);

        gallery.appendChild(bookNode);
    }
})()