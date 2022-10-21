"use strict";
const newBook = document.querySelector("#new-book");
const inputForm = document.querySelector("#input-form");
const formSubmit = document.querySelector("#submit");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const read = document.querySelector("#read");
const table = document.querySelector("tbody");
class Book {
    id;
    title;
    author;
    pages;
    read;
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}
const myLibrary = [];
newBook.addEventListener("click", () => {
    inputForm.style.visibility = "visible";
});
formSubmit.addEventListener("click", (e) => {
    if (title.validity.valid && author.validity.valid && pages.validity.valid) {
        addBookToLibrary();
        inputForm.style.visibility = "hidden";
        e.preventDefault();
    }
});
function addBookToLibrary() {
    const newBook = new Book(Math.random(), title.value, author.value, parseInt(pages.value), read.checked);
    myLibrary.push(newBook);
    addBookToTable(newBook);
}
function addBookToTable(newBook) {
    const row = table.insertRow();
    row.insertCell(0).textContent = newBook.title;
    row.insertCell(1).textContent = newBook.author;
    row.insertCell(2).textContent = newBook.pages.toString();
    const readCheckbox = document.createElement("input");
    readCheckbox.setAttribute("type", "checkbox");
    readCheckbox.checked = newBook.read;
    readCheckbox.addEventListener("change", () => (newBook.read = !newBook.read));
    row.insertCell(3).appendChild(readCheckbox);
    const removeBook = document.createElement("button");
    removeBook.setAttribute("value", "Remove");
    removeBook.addEventListener("click", () => {
        myLibrary.filter((book) => book.id === newBook.id);
        table.removeChild(row);
    });
    row.insertCell(4).appendChild(removeBook);
    table.appendChild(row);
}
