const newBook = document.querySelector("#new-book") as HTMLButtonElement;
const inputForm = document.querySelector("#input-form") as HTMLFormElement;
const formSubmit = document.querySelector("#submit") as HTMLButtonElement;
const title = document.querySelector("#title") as HTMLInputElement;
const author = document.querySelector("#author") as HTMLInputElement;
const pages = document.querySelector("#pages") as HTMLInputElement;
const read = document.querySelector("#read") as HTMLInputElement;
const table = document.querySelector("tbody")!;

class Book {
  id: number;
  title: string;
  author: string;
  pages: number;
  read: boolean;

  constructor(
    id: number,
    title: string,
    author: string,
    pages: number,
    read: boolean
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

const myLibrary: Book[] = [];

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
  const newBook = new Book(
    Math.random(),
    title.value,
    author.value,
    parseInt(pages.value),
    read.checked
  );
  myLibrary.push(newBook);
  addBookToTable(newBook);
}

function addBookToTable(newBook: Book) {
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
