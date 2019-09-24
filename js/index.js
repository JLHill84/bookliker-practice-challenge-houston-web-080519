const BOOKS_URL = "http://localhost:3000/books";
const USERS_URL = "http://localhost:3000/users";
const booksUL = document.getElementById("list");
const bookShowPanel = document.getElementById("show-panel");
const mainUserObject = {
  id: 1,
  username: "pouros"
};

async function fetchBooks() {
  const response = await fetch(BOOKS_URL);
  const bookSon = await response.json();
  displayBooks(bookSon);
}

async function newLike(book) {
  let bodyArray = new Array();
  for (let i = 0; i < book.users.length; i++) {
    let userObj = {
      id: book.users[i].id,
      username: book.users[i].username
    };
    bodyArray.push(userObj);
  }
  bodyArray.push(mainUserObject);
  console.log(bodyArray);
  const response = await fetch(`${BOOKS_URL}/${book.id}`, {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      users: bodyArray,
    })
  });
  let userLI = document.createElement("li");
    userLI.innerText = mainUserObject.username;
    document.getElementById('bookUL').appendChild(userLI);
}

function createBook(book) {
  let bookDiv = document.createElement("div");

  let bookHeader = document.createElement("h1");
  bookHeader.innerText = book.title;

  let bookDesc = document.createElement("p");
  bookDesc.innerText = book.description;

  let bookImg = document.createElement("img");
  bookImg.setAttribute("src", `${book.img_url}`);

  let bookUL = document.createElement("ul");
  bookUL.setAttribute('id', 'bookUL')

  let bookLikeBtn = document.createElement("button");
  bookLikeBtn.innerText = "Like Book";
  bookLikeBtn.addEventListener("click", function() {
    newLike(book);
  });

  for (let i = 0; i < book.users.length; i++) {
    let userLI = document.createElement("li");
    userLI.innerText = book.users[i].username;
    bookUL.appendChild(userLI);
  }

  bookDiv.appendChild(bookHeader);
  bookDiv.appendChild(bookImg);
  bookDiv.appendChild(bookDesc);
  bookDiv.appendChild(bookUL);
  bookDiv.appendChild(bookLikeBtn);
  bookShowPanel.appendChild(bookDiv);
}

function addBook(book) {
  if (bookShowPanel.hasChildNodes()) {
    // console.log("has child");
    bookShowPanel.lastChild.remove();
    createBook(book);
  } else {
    createBook(book);
  }
}

function displayBooks(bookSon) {
  for (let i = 0; i < bookSon.length; i++) {
    // console.log(bookSon[i]);
    let bookLI = document.createElement("li");
    // bookLI.setAttribute('href', `${BOOKS_URL}/${bookSon[i].id}`);
    bookLI.innerText = `${bookSon[i].title}`;
    bookLI.addEventListener("click", function() {
      addBook(bookSon[i]);
    });
    // bookLI.innerHTML = `<li><a href="$BOOKS_URL}/${bookSon[i].id}">${bookSon[i].title}</a></li>`;
    booksUL.appendChild(bookLI);
  }
}

document.addEventListener("DOMContentLoaded", fetchBooks);
