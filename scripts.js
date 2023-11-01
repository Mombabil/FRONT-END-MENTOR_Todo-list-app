// light/dark mode
const theme = document.querySelector(".theme-mode");
const main = document.querySelector("main");
const backgroundHeader = document.querySelector("header");
const form = document.querySelector("form");
const todos = document.querySelector(".todos");
const todosList = document.querySelector(".todos-list");
const itemsLeft = document.querySelector(".items-left");
const all = document.querySelector(".all");
const active = document.querySelector(".active");
const completed = document.querySelector(".completed");
const clear = document.querySelector(".clear");

// Au clic sur l'icone du theme
theme.addEventListener("click", () => {
  // on toggle la classe light-mode au main
  main.classList.toggle("light-mode-main");
  // on toggle la classe light-mode au header
  backgroundHeader.classList.toggle("light-mode-header");
  //   on toggle la classe light-mode a l'input
  form.classList.toggle("light-mode-form");
  // on toggle la classe light-mode aux todos
  todos.classList.toggle("light-mode-todos");
  // on alterne entre une lune et un soleil pour le bouton selon le theme
  backgroundHeader.className === "light-mode-header"
    ? (theme.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>')
    : (theme.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>');
});

// A la validation du formulaire
// storage part
function storeList() {
  window.localStorage.todoList = todosList.innerHTML;
}
function getTodos() {
  if (window.localStorage.todoList) {
    todosList.innerHTML = window.localStorage.todoList;
  } else {
    todosList.innerHTML = "";
  }
}
getTodos();

// on ajoute un element
form.addEventListener("submit", (e) => {
  // on empeche le rechargement de page
  e.preventDefault();
  todosList.innerHTML += `<li class="todo" draggable="true"><span></span>${input.value}</li>`;
  // on reset l'input
  input.value = "";
  // on envoi dans le localstorage
  storeList();
  //   on compte le nombre de li présents
  let count = todosList.childElementCount;
  itemsLeft.textContent = count;
});
// on supprime un element
todosList.addEventListener("click", (e) => {
  if (e.target.classList.contains("check")) {
    e.target.remove();
  } else {
    e.target.classList.add("check");
    e.target.style.textDecoration = "line-through";
    e.target.style.color = "hsl(233, 14%, 35%)";
  }
  // on met a jour le localstorage en cas de suppression
  storeList();
  //   on compte le nombre de li présents
  let count = todosList.childElementCount;
  itemsLeft.textContent = count;
});

// on compte le nombre de li présents
let count = todosList.childElementCount;
itemsLeft.textContent = count;

// boutons settings
// affichage de tous les todos
all.addEventListener("click", () => {
  let todos = todosList.children;
  for (let i = 0; i < todos.length; i++) {
    todos[i].classList.remove("hide");
  }
});
// affichage des todos non completés
active.addEventListener("click", () => {
  let todos = todosList.children;
  for (let i = 0; i < todos.length; i++) {
    todos[i].classList.remove("hide");
    if (todos[i].classList.contains("check")) {
      todos[i].classList.add("hide");
    }
  }
});
// affichage des todos completés
completed.addEventListener("click", () => {
  let todos = todosList.children;
  for (let i = 0; i < todos.length; i++) {
    todos[i].classList.remove("hide");
    if (!todos[i].classList.contains("check")) {
      todos[i].classList.add("hide");
    }
  }
});
// supprimer les todos completés
clear.addEventListener("click", () => {
  let todos = todosList.children;
  for (let i = 0; i < todos.length; i++) {
    todos[i].classList.remove("hide");
    if (todos[i].classList.contains("check")) {
      todos[i].remove();
      storeList();
    }
  }
});

// drag & drop
let drags = todosList.children;
console.log(drags);
for (drag of drags) {
  drag.addEventListener("dragstart", (e) => {
    let selected = e.target;

    todosList.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    todosList.addEventListener("drop", (e) => {
      todosList.appendChild(selected);
      // selected = null;
      storeList();
    });
  });
}
