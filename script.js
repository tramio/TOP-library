let myLibrary = [];
let idOfNewBook = 0;
const modal = document.getElementById("modal-box");
const gallery = document.querySelector(".gallery");

function Book(title, year, author, pages, language, isRead, rating) {
    this.title = title;
    this.year = year;
    this.author = author;
    this.pages = Number(pages);
    this.language = language;
    this.isRead = isRead;
    this.rating = rating;
}

function getValueOf(elementId) {
    const elementValue = document.getElementById(elementId).value;
    return elementValue;
}

function createBook() {
    title = getValueOf("title-input");
    year = getValueOf("year-input");
    author = getValueOf("author-input");
    pages = getValueOf("pages-input");
    language = getValueOf("language-input");
    isRead = document.getElementById("status-input").checked;
    rating = getValueOf("rating-input");
    return newBook = new Book(title, year, author, pages, language, isRead, rating);
}

function addBookToLibrary (book) {
    myLibrary.push(book);
}

function resetForm() {
    const form = document.querySelector("form");
    form.reset();
}

(function enableSubmissions() {
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", () => {
        createBook();
        addBookToLibrary(newBook);
        createAndDisplayCard(newBook);
        resetForm();
    });
})();

function getvalueOfNewBook() {
    return valueOfNewBook = myLibrary.length - 1;
}

function setIdOfNewBook() {
    idOfNewBook++;
}

function createAndDisplayCard(book) {
    getvalueOfNewBook();
    // Container
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.setAttribute("id", `book-${idOfNewBook}`);
    newCard.setAttribute("data-value", valueOfNewBook);

    // Main subcontainer
    const cardMain = document.createElement("div");
    cardMain.classList.add("cardMain");

    // Title
    const cardH1 = document.createElement("p");
    cardH1.textContent  = `${book.title} (${book.year})`;
    cardH1.classList.add("cardH1");

    // Subtitle
    const cardH2 = document.createElement("p");
    cardH2.textContent = `by ${book.author}`;
    cardH2.classList.add("cardH2");

    // Content pre-formatting
    let statusDisplay;
    book.isRead ?
        statusDisplay = "Read" :
        statusDisplay = "Currently reading";

    let ratingDisplay = "";
    for (count = 0; count < book.rating; count++) {
        ratingDisplay += "★";
    }

    // Content
    const cardContent = document.createElement("p");
    cardContent.textContent = `${ratingDisplay} | ${book.pages} pages | ${book.language} | ${statusDisplay}`;
    cardContent.classList.add("cardContent");

    // Actions subcontainer
    const cardOptions = document.createElement("div");
    cardOptions.classList.add("cardOptions");
    const deleteIcon = document.createElement("img");

    // Actions
    (function createDeleteIcon() {
        deleteIcon.classList.add("delete-icon");
        deleteIcon.setAttribute("src", "deleteIcon.svg");
        deleteIcon.setAttribute("id", idOfNewBook);
        deleteIcon.setAttribute("data-value", valueOfNewBook);
    })();

    (function enableDeleteIcon() {
        deleteIcon.addEventListener("click", () => {
            const libraryIndex = deleteIcon.dataset.value;
            const cardValue = deleteIcon.dataset.value;
            const card = document.querySelector(`[data-value="${cardValue}"]`);
             removeBookFromLibrary(libraryIndex);
             removeBookFromDisplay(card);
             reassignBookIndexesToDomElements();
        });
    })();

    setIdOfNewBook();

    gallery.appendChild(newCard);
    newCard.appendChild(cardMain);
    cardMain.appendChild(cardH1);
    cardMain.appendChild(cardH2);
    cardMain.appendChild(cardContent);
    newCard .appendChild(cardOptions)
            .appendChild(deleteIcon);
}

(function showForm() {
    const showFormBtn = document.getElementById("show-button");
    showFormBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });
})();

(function hideForm() {
    const hideFormBtn = document.getElementById("hide-button");
    hideFormBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
})();

function hideElement(element) {
    element.style.display = "none";
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

function removeBookFromDisplay(node) {
    gallery.removeChild(node);
}

function reassignBookIndexesToDomElements(indexOfRemovedBook) {
    const cards = Array.from(document.querySelectorAll(".card"));
    const icons = Array.from(document.querySelectorAll(".delete-icon"));
    for (let i = 0; i < myLibrary.length; i++) {
        cards[i].dataset.value = i;
        icons[i].dataset.value = i;
    }
}