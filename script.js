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

function addBook (title, year, author, pages, language, isRead, rating) {
    let newBook = new Book(title, year, author, pages, language, isRead, rating);
    myLibrary.push(newBook);
}

function submitBook () {
    title = document.getElementById("title-input").value;
    year = document.getElementById("year-input").value;
    author = document.getElementById("author-input").value;
    pages = document.getElementById("pages-input").value;
    language = document.getElementById("language-input").value;
    isRead = document.getElementById("status-input").checked;
    rating = document.getElementById("rating-input").value;
    const form = document.querySelector("form");
    addBook(title, year, author, pages, language, isRead, rating);
    form.reset();
    displayBook();
    displaySuccess();
}

function displaySuccess () {
    const successMessage = document.createElement("p");
    successMessage.textContent = "Your reco was successfully added to my collection!";
    modal.appendChild(successMessage);
}

(function enableSubmissions () {
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener("click", submitBook);
})();

addBook("Lord of The Rings", 1954, "J. R. R. Tolkien", 523, "English", true, 4);
addBook("Harry Potter", 1997, "J. K. Rowling", 354, "English", false, 3);

let i;
function displayBook() {
    for (i = 0 ; i < myLibrary.length ; i++) {
        let tempId = `book-${i}`;
        if (document.getElementById(tempId)) {}
        else {
            let newCard = document.createElement("div");
            newCard.classList.add("card");
            newCard.setAttribute("id", `book-${i}`);

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

            let cardContent = document.createElement("div");
            cardContent.classList.add("cardContent");
            cardContent.appendChild(titleDisplay);
            cardContent.appendChild(authorDisplay);
            cardContent.appendChild(smallerDisplay);
            newCard.appendChild(cardContent);

            let cardOptions = document.createElement("div");
            cardOptions.classList.add("cardOptions");
            const deleteIcon = document.createElement("img");
            deleteIcon.setAttribute("src", "deleteIcon.svg");
            deleteIcon.setAttribute("id", `${i}`);
            deleteIcon.classList.add("delete-icon");
            cardOptions.appendChild(deleteIcon);
            newCard.appendChild(cardOptions);

            gallery.appendChild(newCard);
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
    });
})();

let deleteIcons = document.querySelectorAll(".delete-icon");
deleteIcons = Array.from(deleteIcons);
deleteIcons.forEach(icon => {
    const index = icon.id;
    icon.addEventListener("click", () => {
        myLibrary.splice(index, 1);
        displayBook();
        const cardId = `book-${index}`;
        const cardNode = document.getElementById(cardId);
        gallery.removeChild(cardNode);
    });
});
