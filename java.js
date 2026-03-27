const myLibrary = [];
const showBooks = document.querySelector('.books');
const showButton = document.querySelector('#show');
const addButton = document.querySelector('#new')
const newBook = document.querySelector('#newbook')

newBook.style.display = 'none';


   
class book {
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.UUID = crypto.randomUUID();
    }
    addToLibrary(book){
        myLibrary.push(book);
    }
}

function addBook(){
    const newTitle = document.querySelector('#new-title').value;
    const newAuthor = document.querySelector('#new-author').value;
    const newPages = document.querySelector('#new-pages').value;
    let newRead = (document.querySelector('#new-read').checked === 'true') ? 'No' : 'Yes';
    if (newTitle === '' || newAuthor === '' || newPages === '') {
            alert('Please fill out the form before submitting');
    } else {
        const addedBook = new book(newTitle, newAuthor, newPages, newRead);
        addedBook.addToLibrary(addedBook);
        listBooks();
    }
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
            if (myLibrary[objWithIdIndex].read === 'Yes') {
                myLibrary[objWithIdIndex].read = 'No';
                listBooks()
            } else {
                myLibrary[objWithIdIndex].read = 'Yes';
                listBooks()
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

function showError(field, parent){
    const placement = parent;
    const messageBox = document.createElement("div");
    messageBox.classList.add("pop-up");
    const message = document.createElement("p");
    message.textContent = `Please fill in ${field.name} before submitting.`

    placement.appendChild(messageBox);
    messageBox.appendChild(message);

    setTimeout(() => {
        parent.lastChild.classList.add("hidden");
        setTimeout(() => {
            parent.removeChild(parent.lastChild);
        }, 1000)  
    } , 1500);
}



const submit = document.querySelector("#submit");
submit.addEventListener("click", () => {
    const title = document.querySelector("#new-title");
    const author = document.querySelector("#new-author");
    const pages = document.querySelector("#new-pages");

    let parent;
    let item;
    let valid;
    
    function validate(){
        if (title.value === ""){
            item = title;
            parent = document.querySelector("#input-title");
            valid = false;
        } else if (author.value === ""){
            item = author;
            parent = document.querySelector("#input-author");
            valid = false;
        } else if (pages.value === ""){
            item = pages;
            parent = document.querySelector("#input-pages");
            valid = false;
        }
        function displayError(){
            parent.classList.add("anchor");
            showError(item, parent);
            setTimeout(() => {
                parent.classList.remove("anchor");
            }, 2000) 
        }
        if (valid === false) {
            displayError()
        } else {
            addBook();
        }
    }
    validate();
})
