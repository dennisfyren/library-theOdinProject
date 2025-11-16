const myLibrary = [];
const showBooks = document.querySelector('.books');
const showButton = document.querySelector('#show');
const addButton = document.querySelector('#new')
const newBook = document.querySelector('#newbook')

newBook.style.display = 'none';

function Book(title, author, pages, read) {
    if (!new.target){
        throw Error('You may want to use the new before Book');
    }
    this.UUID = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.getInfo = function() {
    return `${this.title} by ${this.author} and is ${this.pages} pages long. Read? ${this.read}`
}

function addBookToLibrary(book) {
    myLibrary.push(book);
  // take params, create a book then store it in the array
}
function listBooks(){
    showBooks.textContent = ''
    myLibrary.forEach((book) => {
    const textbox = document.createElement('div');
        
    showBooks.appendChild(textbox);
        const a = document.createElement('p')
        textbox.appendChild(a)
        a.textContent = `Title: ${book.title}`;

        const b = document.createElement('p')
        textbox.appendChild(b)
        b.textContent = `Author: ${book.author}`

        const c = document.createElement('p')
        textbox.appendChild(c)
        c.textContent = `Pages: ${book.pages}`

        const d = document.createElement('p')
        textbox.appendChild(d)
        d.textContent = `Already read: ${book.read}`
        d.setAttribute('id', 'read');

        const e = document.createElement('button')
        textbox.appendChild(e);
        e.setAttribute("id", book.UUID);
        e.textContent = 'Remove';

        e.addEventListener("click", function(){
            const objWithIdIndex = myLibrary.findIndex((obj) => obj.UUID === e.id)
            myLibrary.splice(objWithIdIndex, 1);
            listBooks()
    
        })
        const f = document.createElement('button')
        textbox.appendChild(f);
        f.textContent = 'Toggle Read';
        f.addEventListener("click", function() {
               const objWithIdIndex = myLibrary.findIndex((obj) => obj.UUID === e.id)
            if (myLibrary[objWithIdIndex].read === "Already read: Yes") {
            myLibrary[objWithIdIndex].read = "Already read: No";
            d.textContent = "Already read: No";
            } else {
                myLibrary[objWithIdIndex].read = `Already read: Yes`
                d.textContent = "Already read: Yes";
            }
            
        })

    })
};
function showForm() {
    
    if (newBook.style.display === "none") {
        newBook.style.display = "block";
    } else {
        newBook.style.display = "none";
    }       
}
function addBook() {
    const newTitle = document.querySelector('#new-title').value;
    const newAuthor = document.querySelector('#new-author').value;
    const newPages = document.querySelector('#new-pages').value;
    let newRead = document.querySelector('#new-read').checked;
    if (newRead === true) {
        newRead = 'Yes';
    } else {
        newRead = 'No';
    }
    if (newTitle === '' || newAuthor === '' || newPages === '') {
        alert('Please fill out the form before submitting');
    } else{
    const book = new Book(newTitle, newAuthor, newPages, newRead);
    addBookToLibrary(book);
    newBook.style.display = "none";
    listBooks()
}};
const theHobbit = new Book('The Hobbit', 'JRR Tolkien', '243', 'Yes')
const theLord = new Book('The Lord of the Rings', 'JRR Tolkien', '343', 'Yes')
addBookToLibrary(theHobbit);
addBookToLibrary(theLord);
