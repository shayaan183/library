const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function displayBooks() {
    const container = document.querySelector("#library-container");

    container.innerHTML = "";

    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");

        const title = document.createElement("h3");
        title.textContent = `${book.title}`;

        const author = document.createElement("p");
        author.textContent = `By: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${book.pages} pages`;

        const isRead = document.createElement("p");
        isRead.textContent = book.isRead ? "Read" : "Not yet read";

        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(isRead);

        container.appendChild(bookCard);
    });
}

addBookToLibrary("The Lord of the Rings", "J. R. R. Tolkien", 1178, true);
addBookToLibrary("1984", "George Orwell", 328, false)

displayBooks();