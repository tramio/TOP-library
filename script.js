let myLibrary = [];
const form = document.querySelector("form");
const titleInput = document.getElementById("title-input");
const authorInput = document.getElementById("author-input");
const pagesInput = document.getElementById("pages-input");
const languageInput = document.getElementById("language-input");
const statusInput = document.getElementById("status-input");

function Book (title, author, pages, language, isRead) {
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.language = language;
    this.isRead = isRead;
}

function addBook (title, author, pages, language, isRead) {
    let newBook = new Book(title, author, pages, language, isRead);
    myLibrary.push(newBook);
}

function submitBook () {
    title = titleInput.value;
    author = authorInput.value;
    pages = pagesInput.value;
    language = languageInput.value;
    isRead = statusInput.checked;
    addBook(title, author, pages, language, isRead);
    form.reset();
}

(function enableSubmissions () {
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", submitBook);
})();