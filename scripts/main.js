let myLibrary = [];

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
        let bookElement = document.createElement('div');
        bookElement.style['background-color']='red';
        bookElement.style['margin']='10px';
        bookElement.innerText = book.info();
        container.appendChild(bookElement);
    })
}


let lotr = new Book('Lord of The Rings','J.R.R Tolkien',1000,false);
console.log(lotr.info());
addBookToLibrary(lotr);
addBookToLibrary(lotr);
displayAllBooks();