const create = document.getElementById('create');
const reset = document.getElementById('reset');
const grid = document.getElementsByClassName('grid')[0];
const title = document.getElementById('title');
const pagesR = document.getElementById('pages-r');
const pagesT = document.getElementById('pages-t');
const titleCB = document.getElementById('title-cb');
const pagesRCB = document.getElementById('pages-r-cb');
const pagesTCB = document.getElementById('pages-t-cb');
const checkbox = document.getElementById('completed');

let library = [];
let bookName = '';
let read = -1;
let total = 9;

pagesR.addEventListener('change',() => read = parseInt(pagesR.value))
pagesT.addEventListener('change',() => total = parseInt(pagesT.value))
title.addEventListener('change',() => bookName = title.value)

create.addEventListener('click',(e) => {
    e.preventDefault();
    addBook();
    cicle();
})

function addBook() {
    let validTitle = bookName.length >= 4 && bookName.length <= 30;
    let validTotal = total >= 10 && total <= 9999;
    let validRead = read >= 0 && read <= total;
    if (validTitle && validTotal && validRead) {
        let newbook = {name: bookName, complete: read, pages: total}
        library.push(newbook);
    } else {
        let titleText = '';
        let totalText = '';
        let readText = '';
        if (validTitle==false) titleText = 'Invalid title, please enter a title between 4-30 characters! '
        if (validTotal==false) totalText = 'Invalid page amount, please enter an amount between 10-9999. '
        if (validRead==false) readText = 'Invalid read amount, please enter a number lower than the total pages.'
        alert(titleText+totalText+readText)
    }
    title.value = '';
    pagesR.value = '';
    pagesT.value = '';
    bookName = '';
    read = -1;
    total = 9;
}

function cicle() {
    grid.innerHTML = '';
    for (let i = 0; i < library.length; i++) {
            const book = document.createElement('div');
            const p = document.createElement('p');
            const delButton = document.createElement('button');
            book.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16" onclick='compFunction(this)' data-indexnumber='${i}'>
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                        </svg>`;
                if (library[i].name.length > 18) {
                    p.classList.add('p-max');
                } else {
                    p.classList.add('p-min');
                }
            delButton.classList.add('delete');
            delButton.innerHTML= 'x';
            delButton.dataset.indexnumber=i.toString();
            delButton.addEventListener('click', (e) => delFunction(e));
            p.textContent=library[i].name;
            book.classList.add('book');
            book.appendChild(p);
            book.appendChild(delButton);
            p.dataset.indexnumber=i.toString();
            p.addEventListener('mouseover', (e) => currentBook(e));
            grid.appendChild(book);
    }
}

function compFunction(e) {
    let index = e.dataset.indexnumber;
    library[index].complete = library[index].pages;
}

function delFunction(e) {
    let index = e.target.dataset.indexnumber;
    library.splice(index, 1);
    cicle();
}

function currentBook(e) {
    let index = e.target.dataset.indexnumber;
    if (library[index].complete == library[index].pages) {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }
    titleCB.value = library[index].name;
    pagesRCB.value = library[index].complete;
    pagesTCB.value = library[index].pages;
}