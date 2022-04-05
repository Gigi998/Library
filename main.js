// DOM elements
const addButtonEl = document.querySelector(".addButton");
const displayEl = document.querySelector(".displayBook");
const displayBookButton = document.querySelector(".displayButton");
const tableEl = document.querySelector(".table");

// Creating elements of input fields
let titleEl = document.getElementById("Title");
let authorEl = document.querySelector("#Author");
let pagesEl = document.querySelector("#pages");
let readEl = document.querySelector("#haveRead");

// Library list
let myLibrary = [];

// Event Listeners
addButtonEl.addEventListener("click", () => {
    if(titleEl.value == "" || authorEl.value == "" || pagesEl.value =="" || readEl.value == ""){
        alert("You missed something");
    }else{
        let book = new Book(titleEl.value, authorEl.value, pagesEl.value, readEl.value);
        myLibrary.push(book);
        clearInput()
    };
});

displayBookButton.addEventListener("click", displayBooks);


// Constructor
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
};

// Functions
function addBookToLibrary(){

    // Creating object using constructor
    let book = new Book(titleEl.value, authorEl.value, pagesEl.value, readEl.value);
    myLibrary.push(book);
    clearInput()

};

function displayBooks(){
    for (var i in myLibrary){
        let book = myLibrary[i];
        

        // Creating table row for each object
        const bk = document.createElement("tr");
        bk.classList.add("target");


        const titleTab = document.createElement("td");
        titleTab.innerHTML = book.title;

        const authorTab = document.createElement("td");
        authorTab.innerHTML = book.author;

        const pagesTab = document.createElement("td");
        pagesTab.innerHTML = book.pages;

        const readTab = document.createElement("td");
        readTab.innerHTML = book.read

        const removeButton = document.createElement("button");
        removeButton.classList.add("rmvButton");
        removeButton.type = "button";
        removeButton.innerHTML = "remove";
        // Remove button event listener


        // Appending created childs
        bk.appendChild(titleTab);
        bk.appendChild(authorTab);
        bk.appendChild(pagesTab);
        bk.appendChild(readTab);
        bk.appendChild(removeButton);

        displayEl.appendChild(bk);
    };
    myLibrary = [];
};


// Clear input fields function
function clearInput(){
    titleEl.value = "";
    authorEl.value = "";
    pagesEl.value = "";
    readEl.value = "";
}

// Remove the book from the library function
function removeBook(){
    
};



clearInput()
// Testing


