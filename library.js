let myLibrary = [];

const inputForm = document.querySelector('form');
const table = document.querySelector('tbody');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');

document.querySelector('#new-book').addEventListener('click', () => {
  inputForm.style.visibility = "visible";
});

document.querySelector('#submit').addEventListener('click', (e) => {
  if (title.validity.valid && author.validity.valid && pages.validity.valid) {
    while (table.hasChildNodes()){
      table.removeChild(table.lastChild);
    }
    addBookToLibrary();
    inputForm.style.visibility = "hidden";
    e.preventDefault();
  }
});

class Book {
  constructor(title, author, pages, read) {
    this.title;
    this.author;
    this.pages;
    this.read;
    this.id;
  }
}

function addBookToLibrary() {
  const newBook = new Book();
  newBook.title = title.value;
  newBook.author = author.value;
  newBook.pages = pages.value;
  newBook.read = document.querySelector('#read').checked;
  newBook.id = myLibrary.length;
  myLibrary.push(newBook);
  libraryLooper(myLibrary);
}

function libraryLooper(myLibrary) {
  myLibrary.forEach(addBookToTable);
}

function addBookToTable(book) {
  const row = table.insertRow();

  const titleCell = row.insertCell(0);
  titleCell.textContent = book.title;

  const authorCell = row.insertCell(1);
  authorCell.textContent = book.author;

  const pagesCell = row.insertCell(2);
  pagesCell.textContent = book.pages;

  const readCell = row.insertCell(3);
  readCell.textContent = book.read;

  const readButton = row.insertCell(4);
  readButton.appendChild(markAsReadButton(book, readCell));

  const remove = row.insertCell(5);
  remove.appendChild(removeBook(row, book));

  table.appendChild(row);
}

function markAsReadButton(book, readCell) {
  const button = document.createElement('input');
  button.type = 'button';
  button.value = 'Read?';
  button.addEventListener('click', () => {
    if (book.read == "true") {
      book.read = "false";
      readCell.textContent = "false";
    }
    else {
      book.read = "true";
      readCell.textContent = "true";
    }
  })
  return button;
}

function removeBook(row, book) {
  const button = document.createElement('input');
  button.type = 'button';
  button.value = 'Remove';
  button.addEventListener('click', () => {
      let removed = myLibrary.splice(book.id, 1); 
      row.parentNode.removeChild(row);
      myLibrary.forEach(book => book.id = myLibrary.indexOf(book));
  })
  return button;
}