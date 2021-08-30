let myLibrary = [];

function Book(title, author, pages, language, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.language = language;
    this.isRead = isRead;
}

function addBook(title, author, pages, language, isRead) {
    let newBook = new Book(title, author, pages, language, isRead);
    myLibrary.push(newBook);
}