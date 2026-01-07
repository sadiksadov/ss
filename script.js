let input = document.querySelector('.input');
let send = document.querySelector('.send');
let ul = document.querySelector('.list');
let body = document.querySelector("body");
let darklight = document.querySelector('.darklight');

window.onload = function () {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    if (notes.length === 0) {
        notes = ["pozvonit naste", "buyurtma berish", "uy ishlari"];
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    notes.forEach(note => createNote(note));
}

send.addEventListener('click', () => {
    let value = input.value.trim();
    if (value === '') {
        alert('Siz hech narsa yozmadingiz!');
        return;
    }
    createNote(value);
    saveToLocalStorage(value);
    input.value = '';
});

function createNote(text) {
    let li = document.createElement('li');
    li.classList.add('note');

    let p = document.createElement('p');
    p.textContent = text;
    li.appendChild(p);

    let knopki = document.createElement('div');
    knopki.classList.add('knopki');
    li.appendChild(knopki);

    let edit = document.createElement('span');
    edit.textContent = '🖋️';
    knopki.appendChild(edit);

    let delt = document.createElement('span');
    delt.textContent = '🗑️';
    knopki.appendChild(delt);


    delt.addEventListener('click', () => {
        li.remove();
        removeFromLocalStorage(text);
    });

 
    edit.addEventListener('click', () => {
        let newText = prompt("Tahrirlash:", text);
        if (newText !== null && newText.trim() !== '') {
            p.textContent = newText;
            updateLocalStorage(text, newText);
        }
    });

    ul.appendChild(li);
}

function saveToLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function removeFromLocalStorage(note) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.filter(n => n !== note);
    localStorage.setItem("notes", JSON.stringify(notes));
}

function updateLocalStorage(oldNote, newNote) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes = notes.map(n => n === oldNote ? newNote : n);
    localStorage.setItem("notes", JSON.stringify(notes));
}

let theme = localStorage.getItem("theme");
if (theme === "dark") {
    body.classList.add("dark-mode");
    darklight.textContent = "☀️";
} else {
    body.classList.remove("dark-mode");
    darklight.textContent = "🌙";
}

darklight.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem("theme", "dark");
        darklight.textContent = '☀️';
    } else {
        localStorage.setItem("theme", "light");
        darklight.textContent = '🌙';
    }
});
