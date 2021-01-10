//let myLibrary = [];

const inputForm = document.querySelector('form');

document.querySelector('#new-book').addEventListener('click', () => {
  inputForm.style.visibility = "visible";
})

document.querySelector('#submit').addEventListener('click', () => {
  addBookToLibrary();
  inputForm.style.visibility = "hidden";
})

function Book(title, author, pages, read) {
  this.title;
  this.author;
  this.pages;
  this.read;
}

function addBookToLibrary() {
  const newBook = Object.create(Book);
  newBook.title = document.querySelector('#title').value;
  newBook.author = document.querySelector('#author').value;
  newBook.pages = document.querySelector('#pages').value;
  newBook.read = document.querySelector('#read').checked; 
  //myLibrary.push(newBook);
  addBookToTable(newBook);
  //console.log(myLibrary);
}

function addBookToTable(newBook) {
  const table = document.querySelector('tbody');
  const row = table.insertRow();

  const titleCell = row.insertCell(0);
  titleCell.innerHTML = newBook.title;

  const authorCell = row.insertCell(1);
  authorCell.innerHTML = newBook.author;

  const pagesCell = row.insertCell(2);
  pagesCell.innerHTML = newBook.pages;

  const readCell = row.insertCell(3);
  readCell.innerHTML = newBook.read;

  const readButton = row.insertCell(4);
  readButton.appendChild(markAsReadButton(readCell));

  const remove = row.insertCell(5);
  remove.appendChild(removeBook(row));

  table.appendChild(row);
}

function markAsReadButton(readCell) {
  const button = document.createElement('input');
  button.type = 'button';
  button.value = 'Read?';
  button.addEventListener('click', () => {
    if (readCell.innerHTML == "true") {
      readCell.innerHTML = "false";
    }
    else {
      readCell.innerHTML = "true";
    }
  })
  return button;
}

function removeBook(row) {
  const button = document.createElement('input');
  button.type = 'button';
  button.value = 'Remove';
  button.addEventListener('click', () => {
    row.parentNode.removeChild(row);
  })
  return button;
}