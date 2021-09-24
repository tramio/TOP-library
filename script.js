let myLibrary = [];
const modal = document.getElementById("modal-box");
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

function addBookToLibrary (title, year, author, pages, language, isRead, rating) {
    // a new book object is created
    let newBook = new Book(title, year, author, pages, language, isRead, rating);
    // it is pushed to the library
    myLibrary.push(newBook);
}

function getValueOf(elementId) {
    const elementValue = document.getElementById(elementId).value;
    return elementValue;
}

function submitBook () {
    title = getValueOf("title-input");
    year = getValueOf("year-input");
    author = getValueOf("author-input");
    pages = getValueOf("pages-input");
    language = getValueOf("language-input");
    isRead = document.getElementById("status-input").checked;
    rating = getValueOf("rating-input");
    addBookToLibrary(title, year, author, pages, language, isRead, rating);
    const form = document.querySelector("form");
    form.reset();
    displayBook();
    displaySuccessMessage();
}

function displaySuccessMessage () {
    if (successMessageExists()) {
        const successMessage = document.createElement("p");
        successMessage.classList.toggle("success");
        successMessage.textContent = "Your reco was successfully added to my collection!";
        modal.appendChild(successMessage);
    }
}

// create successMessageExists

(function enableSubmissions () {
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", submitBook);
})();

function displayBook() {
    for (let i = 0 ; i < myLibrary.length ; i++) {
        let tempId = `book-${i}`;
        if (document.getElementById(tempId)) {}
        else {
            // Main container
            let newCard = document.createElement("div");
            newCard.classList.add("card");
            newCard.setAttribute("id", `book-${i}`);
            newCard.setAttribute("data-value", i);
            gallery.appendChild(newCard);

            // Content
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
                ratingDisplay += "★";
            }

            let smallerDisplay = document.createElement("p");
            smallerDisplay.textContent = `${ratingDisplay} | ${myLibrary[i].pages} pages | ${myLibrary[i].language} | ${statusDisplay}`;
            smallerDisplay.classList.add("smallerDisplay");

            // Content subcontainer
            let cardContent = document.createElement("div");
            cardContent.classList.add("cardContent");
            cardContent.appendChild(titleDisplay);
            cardContent.appendChild(authorDisplay);
            cardContent.appendChild(smallerDisplay);
            newCard.appendChild(cardContent);
                        
            // Actions subcontainer
            let cardOptions = document.createElement("div");
            cardOptions.classList.add("cardOptions");
            const deleteIcon = document.createElement("img");
            newCard .appendChild(cardOptions)
                    .appendChild(deleteIcon);

            // Actions
            (function createDeleteIcon() {
                deleteIcon.classList.add("delete-icon");
                deleteIcon.setAttribute("src", "deleteIcon.svg");
                deleteIcon.setAttribute("id", `${i}`);
                deleteIcon.setAttribute("data-value", i);
            })();

            const cardIndex = deleteIcon.dataset.value;
            const cardNode = document.getElementById(`book-${cardIndex}`);
            deleteIcon.addEventListener("click", () => {
                removeBookFromLibrary(cardIndex);
                removeBookFromDisplay(cardNode);
                reassignBookIndexesToDomElements();
            });
        }
    }
}

displayBook();

(function showForm () {
    const showFormBtn = document.getElementById("show-button");
    showFormBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });
})();

(function hideForm () {
    const hideFormBtn = document.getElementById("hide-button");
    hideFormBtn.addEventListener("click", () => {
        modal.style.display = "none";
        const successMessage = document.querySelector(".success");
        removeFromModalIfHasClassSuccess(successMessage);
    });
})();

function removeFromModalIfHasClassSuccess(element) {
    if (element.classList.contains("success")) {
        element.classList.toggle("success");
        modal.removeChild(element);
    }
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