// DOM elements
const addButtonEl = document.querySelector(".addButton");
const displayEl = document.querySelector(".displayBook");
const displayBookButton = document.querySelector(".displayButton");
const tableEl = document.querySelector(".bodyTable");


// Creating elements of input fields
let titleEl = document.querySelector("#Title");
let authorEl = document.querySelector("#Author");
let pagesEl = document.querySelector("#pages");
let readEl = document.querySelector("#haveRead");

// Library list
let myLibrary = [];

// Event Listeners
addButtonEl.addEventListener("click", () => {
    // Checking input
    if(titleEl.value == "" || authorEl.value == "" || pagesEl.value =="" || readEl.value == ""){
        alert("You missed something");
    }else if(readEl.value != "yes" && readEl.value != "no"){
        alert("Type yes or no")
    }else{
        let book = new Book(titleEl.value, authorEl.value, pagesEl.value, readEl.value);
        myLibrary.push(book);
        clearInput()
    }
});

displayBookButton.addEventListener("click", displayBooks);
tableEl.addEventListener("click", removeBook);
tableEl.addEventListener("click", readBook);



// Class
class Book{
    constructor(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

// Functions
function displayBooks(){
    for (var i in myLibrary){
        let book = myLibrary[i];
        

        // Creating table row for each object
        const bk = document.createElement("tr");

        const titleTab = document.createElement("td");
        titleTab.innerHTML = book.title;

        const authorTab = document.createElement("td");
        authorTab.innerHTML = book.author;

        const pagesTab = document.createElement("td");
        pagesTab.innerHTML = book.pages;

        const readTab = document.createElement("td");
        readTab.classList.add("yesNoRead");
        readTab.innerHTML = book.read

        const removeButton = document.createElement("button");
        removeButton.classList.add("rmvButton");
        removeButton.type = "button";
        removeButton.innerHTML = "remove";

        const readButton = document.createElement("button");
        readButton.type = "button";
        readButton.innerHTML = "read"
        readButton.classList.add("readButton")


        // Appending created childs
        bk.appendChild(titleTab);
        bk.appendChild(authorTab);
        bk.appendChild(pagesTab);
        bk.appendChild(readTab);
        bk.appendChild(removeButton);
        bk.appendChild(readButton);

        tableEl.appendChild(bk);
        displayEl.appendChild(tableEl);
    }
    myLibrary =[];
}


// Clear input fields function
function clearInput(){
    titleEl.value = "";
    authorEl.value = "";
    pagesEl.value = "";
    readEl.value = "";
}

// Remove the book from the library function
function removeBook(e){
    const item = e.target;

    if(item.classList[0] === "rmvButton"){
        // Selecting row to remove
        const row = item.parentElement;
        row.remove();
    }
}

// Read check mark button
function readBook(e){
    const item = e.target;

    if(item.classList[0] === "readButton"){
        const read = item.parentElement;
        //Selecting Have read element
        let yesNoEl = read.querySelector(".yesNoRead");
        if(yesNoEl.innerHTML == "yes"){
            yesNoEl.innerHTML = "no";
            displayBooks();
        }else{
            yesNoEl.innerHTML = "yes";
            displayBooks();
        }     
    }
}

clearInput()
// Testing


