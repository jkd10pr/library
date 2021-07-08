let myLibrary = [];

//global elements
let htmlElement = document.querySelector('html');
let bodyElement = document.querySelector('body');


//book contructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//prototype function - return info
Book.prototype.info = function(){
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}.`
}

//prototype function - toggle read property
Book.prototype.toggleRead = function(){
    this.read=this.read?false:true;
}

//functions for manipulating the library
function addBookToLibrary(bookToAdd) {
    myLibrary.push(bookToAdd);
    updateLocalStorage();
}

function deleteBookFromLibrary(e) {
    let indexToDelete = e.target.closest('.book-card').dataset.index;
    if (confirm(`Are you sure you want to delete "${myLibrary[indexToDelete].title}" from library?`)) {
        myLibrary.splice(indexToDelete, 1);
        updateLocalStorage();
        displayAllBooks();
        return;
    }
    else {
        return;
    }
}

//functions for displaying and manipulating DOM
function toggleReadState(e){
    let indexToToggle = e.target.closest('.book-card').dataset.index;
    myLibrary[indexToToggle].toggleRead();
    updateLocalStorage();
    displayAllBooks();
}

function displayAllBooks() {
    let container = document.querySelector('#books');

    while (container.children.length > 1) {
        container.removeChild(container.lastChild);
    }

    myLibrary.forEach((book, i) => {
        let bookElement = bookCardTemplate.firstElementChild.cloneNode(true);

        let title = bookElement.querySelector('.book-title');
        let author = bookElement.querySelector('.book-author');
        let pages = bookElement.querySelector('.book-pages');
        let read = bookElement.querySelector('.book-read');
        let deleteButton = bookElement.querySelector('.delete-button');
        let readCheckbox = bookElement.querySelector(".read-checkbox");

        title.innerText = book.title;
        author.innerText = book.author;
        pages.innerText = book.pages+' pages';
        read.innerText = book.read ? 'Read' : 'Not Read Yet';
        deleteButton.addEventListener('click', deleteBookFromLibrary);
        readCheckbox.addEventListener('click', toggleReadState);
        readCheckbox.checked = book.read;

        bookElement.dataset.index = i;
        container.appendChild(bookElement);
    })

    //fill the available space with empty cards
    while (container.children.length < 4) {
        let emptyCard = document.createElement('div');
        emptyCard.classList.add('book-card', 'book-card-hidden');
        container.appendChild(emptyCard);
    }

}

//form functions
function openForm(e) {
    bodyElement.classList.toggle('blur-background');
    bookFormArea.style.display = 'flex';
}

function closeForm(e) {
    if(e!== 'none' && e.target !== e.currentTarget) return;
    bodyElement.classList.toggle('blur-background');
    let inputs = document.querySelectorAll('.form-input');
    document.querySelector("input[type='checkbox']").checked = false;
    inputs.forEach(element => element.value = '')
    bookFormArea.style.display = 'none';
}

function submitForm() {
    let title = document.querySelector('#title-input').value;
    let author = document.querySelector('#author-input').value;
    let pages = document.querySelector('#pages-input').value;
    let read = document.querySelector('#read-input').checked;

    if (title === '' || author === '' || pages === '') {
        alert('Not all fields are filled!')
        return;
    }

    let newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);
    displayAllBooks();
    closeForm('none');
    return;
}

//toggle night mode
function toggleNightMode(e){
    e.target.classList.toggle('night-mode');
    htmlElement.classList.toggle('night-mode');
}

// //updating local storage
function updateLocalStorage(){
    localStorage.setItem('myLibrary',JSON.stringify(myLibrary));
}

// //getting local storage to myLibrary
function getLocalStorage(){
    let toLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    toLibrary.forEach((object)=>{
        // book.prototype=toggleRead;
        let bookObject = new Book(object.title,object.author,object.pages,object.read);
        myLibrary.push(bookObject)
    })
}

//template for cloning book cards
let bookCardTemplate = document.querySelector('#book-card-template');

//global buttons
let nightModeButton = document.querySelector('#night-mode-button');
let addBookButton = document.querySelector('#add-book-button');

//form buttons
let bookFormArea = document.querySelector('#add-book-form-area');
let confirmFormButton = document.querySelector('#confirm-add-button');
let cancelFormButton = document.querySelector('#cancel-add-button')

//global button event listeners
addBookButton.addEventListener('click', openForm)
nightModeButton.addEventListener('click', toggleNightMode)

//form event listeners 
cancelFormButton.addEventListener('click', closeForm);
confirmFormButton.addEventListener('click', submitForm)
bookFormArea.addEventListener('click',closeForm)

//few example books
// let lotr = new Book('Lord of The Rings', 'J.R.R Tolkien', 1000, false);
// let droga = new Book('Droga Królów', 'Brandon Sanderson', 2000, false);
// let diuna = new Book('Diuna','Frank Herbert',2000,true)
// addBookToLibrary(droga);
// addBookToLibrary(lotr);
// addBookToLibrary(diuna);
// displayAllBooks();

// let fromStorage = JSON.parse(localStorage.getItem('myLibrary'));

getLocalStorage();
displayAllBooks();