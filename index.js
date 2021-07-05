/* eslint-disable no-use-before-define */

function Book(title, author, id) { //file has too many classes error

  //creates a book with title, author and id
  this.title = title;
  this.author = author;
  this.id = id;
}
  
class BookClass {
  // The constructor is automatically called when the class is created using the New keyword
  // on line 106
  constructor() {
    //create an empty book array
    this.books = [];

    //bind the methods to the class
    this.populateBooks = this.populateBooks.bind(this);
    this.addBook = this.addBook.bind(this);
    this.removeBook = this.removeBook.bind(this);

    //get the book-list element from the page
    this.bookList = document.querySelector('.book-list');

    //clears the content of the book-list element
    this.bookList.innerHTML = '';

    //get the add button from the page
    const addButton = document.getElementById('add-btn');

    //add a click event listener to the button
    addButton.addEventListener('click', this.addBook);

    // call populateBooks() to display the books already in the local storage
    this.populateBooks();
  }
  
  populateBooks() {
    // Checks if the localStorage has items
    if (localStorage.length > 0) {
      // clears the content of the bookList div
      // this.bookList.innerHTML = '';
      this.bookList.innerHTML = '<h1>Hello</h1>';

      //convert the books string from the localStorage to an array;
      const booksLS = JSON.parse(localStorage.getItem('books'));

      // clears the class's book array
      this.books = [];

      // loops over the array gotten from the localStorage
      booksLS.forEach((book) => {
        // adds the book into the class's book array
        this.books.push(book);

        // create some elements to display the book on the page
        const bookContainer = document.createElement('div');
        const bookTitle = document.createElement('p');
        bookTitle.innerHTML = book.title;
        const bookAuthor = document.createElement('p');
        bookAuthor.innerHTML = book.author;
        const separator = document.createElement('hr');

        const removeButton = document.createElement('button');
        // removeButton.classList.add('remove-btn');
        removeButton.innerHTML = 'Remove';

        //Add a click event listener to the remove button
        removeButton.addEventListener('click', () => {
          // calls the removeBook function and passes the current book's id
          this.removeBook(book.id)
        });

        // Adds the elements to the page
        bookContainer.append(bookTitle, bookAuthor, removeButton, separator);
        this.bookList.append(bookContainer);
      });
    }
  }
  
  addBook(e) {
    // Get the value from the form

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    // Generate a random book id
    const id = Math.random() * 100;

    // create a new book class
    const newBook = new Book(title, author, id);

    // add it to the books array
    this.books.push(newBook);

    //save it in the localStorage
    localStorage.setItem('books', JSON.stringify(this.books));

    //refreshes the books displayed on the page
    this.populateBooks();
    e.preventDefault();
  }
  
  removeBook(id) {
    // const removeButtons = document.querySelectorAll('.remove-btn');
    // let bookIndex = 0;
  
    // // Identify which book to remove
    // removeButtons.forEach((removeButton, index) => {
    //   if (e.target === removeButton) {
    //     bookIndex = index;
    //   }
    // });

    //add all the books where the id is different to a new array
    const newBooks = this.books.filter(
      (b) => ((b.id !== id))
    );

    //set the class's book to the new list of books
    this.books = newBooks;
  
    //save the new books to the browser's local storage
    localStorage.setItem('books', JSON.stringify(this.books));

    //refresh the books displayed on the page
    this.populateBooks();
  }
}
  
function initialize() {
  // create a new book class
  const bookClass = new BookClass();
}
  
// add load event listener 
window.addEventListener('load', initialize);
    