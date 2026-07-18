const myLibrary = [];

const container = document.querySelector("#library-container");
const bookDialog = document.querySelector("#book-dialog");
const bookForm = document.querySelector("#book-form");
const newBookButton = document.querySelector("#new-book-button");
const closeDialogButton = document.querySelector("#close-dialog-button");

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.toggleReadStatus = function() {
    this.isRead = !this.isRead;
    displayBooks();
}

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function removeBookFromLibrary(id) {
    const bookIndex = myLibrary.findIndex(book => book.id === id);

    if(bookIndex !== -1) {
        myLibrary.splice(bookIndex, 1);
    }

    displayBooks();
}

function displayBooks() {
    container.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");

        bookCard.setAttribute("data-id", book.id);

        const title = document.createElement("h3");
        title.textContent = `${book.title}`;

        const author = document.createElement("p");
        author.textContent = `By: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;

        const isRead = document.createElement("p");
        isRead.textContent = book.isRead ? "Read" : "Not yet read";

        const toggleReadButton = document.createElement("button");
        toggleReadButton.textContent = book.isRead ? "Mark as Unread" : "Mark as Read";
        toggleReadButton.classList.add("toggle-read-button");

        toggleReadButton.addEventListener("click", () => {
            book.toggleReadStatus();
        });

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove Book";
        removeButton.classList.add("remove-button");

        removeButton.addEventListener("click", () => {
            removeBookFromLibrary(book.id);
        });

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(isRead);
        bookCard.appendChild(toggleReadButton);
        bookCard.appendChild(removeButton);

        container.appendChild(bookCard);
    });
}

newBookButton.addEventListener("click", () => {
    bookDialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
    bookForm.reset();
    bookDialog.close();
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const titleValue = formData.get("title");
    const authorValue = formData.get("author");
    const pagesValue = parseInt(formData.get("pages"));
    const isReadValue = formData.has("isRead");

    addBookToLibrary(titleValue, authorValue, pagesValue, isReadValue);
    displayBooks();

    bookForm.reset();
    bookDialog.close();
});



addBookToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1178, true);
addBookToLibrary("1984", "George Orwell", 328, false);

displayBooks();