let myLibrary = [];
let bookCardTemplate = document.querySelector('#book-card-template');
let nightModeButton = document.querySelector('#night-mode-button');
let htmlElement = document.querySelector('html');

nightModeButton.addEventListener('click',(e)=>{
    e.target.classList.toggle('night-mode');
    htmlElement.classList.toggle('night-mode');
})

function Book(title,author,pages,read){
    this.title =title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = ()=>{
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read?'already read':'not read yet'}.`
    }
}

function addBookToLibrary(bookToAdd){
    myLibrary.push(bookToAdd);
}

function displayAllBooks(){
    let container = document.querySelector('#books');
    myLibrary.forEach((book)=>{
        let bookElement = bookCardTemplate.firstElementChild.cloneNode(true);
        
        let title = bookElement.querySelector('.book-title');
        let author = bookElement.querySelector('.book-author');
        let pages = bookElement.querySelector('.book-pages');
        let read = bookElement.querySelector('.book-read');
        title.innerText = book.title; 
        author.innerText = book.author; 
        pages.innerText = book.pages; 
        read.innerText = book.read?'Read':'Not Read Yet'; 

        container.appendChild(bookElement);
    })
}


let lotr = new Book('Lord of The Rings','J.R.R Tolkien',1000,false);
let babuba = new Book('Droga Królów','Brandon Sanderson',2000,true);
console.log(lotr.info());
console.log(babuba.info());
addBookToLibrary(lotr);
addBookToLibrary(lotr);
addBookToLibrary(babuba);
addBookToLibrary(babuba);
addBookToLibrary(lotr);
displayAllBooks();