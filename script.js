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
    this.toggleIsRead = function() {
        if (this.isRead == true) {
            this.isRead = false
        }
        else {
            this.isRead = true
        }
    }
}

function getValueOf(elementId) {
    const elementValue = document.getElementById(elementId).value;
    return elementValue;
}

function createBook() {
    return newBook = new Book(title, year, author, pages, language, isRead, rating);
}

function getTitle() {
    return title = getValueOf("title-input");
}

function getYear() {
    return year = getValueOf("year-input");
}

function getAuthor() {
    return author = getValueOf("author-input");
}

function getPages() {
    return pages = getValueOf("pages-input");
}

function getLanguage() {
    return language = getValueOf("language-input");
}

function getIsRead() {
    return isRead = document.getElementById("status-input").checked;
}

function getRating() {
    return rating = getValueOf("rating-input");
}

function allFieldsAreFilled() {
    getTitle();
    getYear();
    getAuthor();
    getPages();
    getLanguage();
    getIsRead();
    getRating();

    const answer =
    (title !== "")
    && (year !== "")
    && (author !== "")
    && (pages !== "")
    && (language !== "")
    && ((rating !== "") && (rating <= 5));
    
    return answer;
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
        if (allFieldsAreFilled()) {
            createBook();
            addBookToLibrary(newBook);
            createAndDisplayCard(newBook);
            resetForm();
        }
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
    setStatusDisplay();

    function setStatusDisplay() {
        book.isRead ?
        statusDisplay = "Read" :
        statusDisplay = "Currently reading";
    }

    let ratingDisplay = "";
    for (count = 0; count < book.rating; count++) {
        ratingDisplay += "★";
    }

    // Content
    const cardContent = document.createElement("p");
    cardContent.classList.add("cardContent");
    setCardContent();

    function setCardContent() {
        cardContent.textContent = `${ratingDisplay} | ${book.pages} pages | ${book.language} | ${statusDisplay}`;
    }

    // Actions subcontainer
    const cardOptions = document.createElement("div");
    cardOptions.classList.add("cardOptions");
    const deleteIcon = document.createElement("img");

    // Actions
    (function createDeleteIcon() {
        deleteIcon.classList.add("delete-icon");
        deleteIcon.setAttribute("src", "icon-delete.svg");
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

    function updateStatusDisplay() {
        setStatusDisplay();
        setCardContent();
    }

    (function createButtonToToggleIsRead() {
        const buttonToToggleIsRead = document.createElement("img");
        cardOptions.appendChild(buttonToToggleIsRead);

        function enableButtonToToggleIsRead() {
            buttonToToggleIsRead.setAttribute("data-value", valueOfNewBook);
            buttonToToggleIsRead.addEventListener("click", () => {
                book.toggleIsRead();
                updateToggleBtnAppearance();
                updateStatusDisplay();
            });
        }

        function updateToggleBtnAppearance() {
            book.isRead == true ?
              buttonToToggleIsRead.setAttribute("src", "icon-read.svg") :
              buttonToToggleIsRead.setAttribute("src", "icon-unread.svg");
        }

        enableButtonToToggleIsRead();
        updateToggleBtnAppearance();
    })();

    setIdOfNewBook();

    gallery.appendChild(newCard);
    newCard.appendChild(cardMain);
    cardMain.appendChild(cardH1);
    cardMain.appendChild(cardH2);
    cardMain.appendChild(cardContent);
    newCard .appendChild(cardOptions);
    cardOptions.appendChild(deleteIcon);
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