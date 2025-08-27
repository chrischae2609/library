const newBookBtn = document.getElementById("new-book");
const display = document.getElementById("book-display");
const formSection = document.getElementById("form-section")

let myLibrary = [];

function Book(title, author, pages, read) {
    // the constructor
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}


function addBookToLibrary(title, author, pages, read) {
    // take params, create a book then store it in the array
    let newBook = new Book(title, author, pages, read);
    for (const book of myLibrary) {
        bookTitle = book.title.replace(/\s/g,'').toLowerCase();
        bookAuthor = book.author.replace(/\s/g,'').toLowerCase();
        newBookTitle = newBook.title.replace(/\s/g,'').toLowerCase();
        newBookAuthor = newBook.author.replace(/\s/g,'').toLowerCase();
        if (bookTitle === newBookTitle && bookAuthor === newBookAuthor) {
            alert("book already exists");
            return;
        } else {
            continue;
        }
    }
    myLibrary.push(newBook);

    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.innerHTML = `
        <div class="info title">Title: ${newBook.title}</div>
        <div class="info author">Author: ${newBook.author}</div>
        <div class="info pages">Pages: ${newBook.pages}</div> 
        <div class="info read-status">
            ${newBook.read}
        </div>
        <div class="buttons">
            <button class="mark" type-"button"></button>
            <button class="remove" type="button">Remove</button>
        </div>
    `
    display.appendChild(bookCard);
    const markBtn = bookCard.querySelector(".mark");
    const readStatus = bookCard.querySelector(".read-status");

    if (newBook.read === "read") {
        markBtn.textContent = "mark not-read";
        readStatus.style.color = "rgb(10, 142, 10)";
    } else  {
        markBtn.textContent = "mark read";
        readStatus.style.color = "rgb(242, 66, 66)";
    }

    Book.prototype.readStatus = function() {
        if (newBook.read === "read") {
            newBook.read = "not-read";
            readStatus.textContent = "not-read";
            readStatus.style.color = "red"
            markBtn.textContent = "mark 'read'";
        } else { 
            newBook.read = "read";
            readStatus.textContent = "read";
            readStatus.style.color = "green";
            markBtn.textContent = "mark 'not-read'";
        }
    }

    markBtn.addEventListener("click", newBook.readStatus)

    const removeBtn = bookCard.querySelector(".remove");
    removeBtn.addEventListener("click", ()=>{
        myLibrary = myLibrary.filter(book => book.id !== newBook.id);
        bookCard.remove();
    })
}


newBookBtn.addEventListener("click", function() {
    newBookBtn.style.display = "none";
    if (document.querySelector(".book-form")) return;
    let form = document.createElement("form");
    form.classList.add("book-form");
    form.innerHTML = `
        <h3>Add a Book!</h3>
        <input class="title-form" type="text" required placeholder="Book Title">
        <input class="author-form" type="text" required placeholder="Book Author">
        <input class="pages-form" type="number" required placeholder="Number of Pages">
        <div id="checkbox">
            <input id="readCheck" type="checkbox" name="read">
            <label for="readCheck">Read</label>
        </div>
        <button id="save" type="button">Save</button>
        <button id="cancel" type="button">Cancel</button>
    `
    formSection.appendChild(form);


    const saveBtn = document.getElementById("save");
    saveBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        let title = form.querySelector(".title-form").value;
        let author = form.querySelector(".author-form").value;
        let pages = form.querySelector(".pages-form").value;
        let read = form.querySelector("#readCheck").checked ? "read" : "not-read"

        if (title === "" || author === "" || pages === "") {
            alert("Fill in all required info")
        } else {
            addBookToLibrary(title, author, pages, read);
        }
        form.remove();
        newBookBtn.style.display = "block";
    })

    const cancelBtn = document.getElementById("cancel");
    cancelBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        form.remove();
        newBookBtn.style.display = "block";
    })

    const checkbox = document.getElementById("readCheck");
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            Book.read = "read"
        } else {
            Book.read = "not-read";
        }
    })


})