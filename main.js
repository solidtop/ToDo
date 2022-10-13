loadTheme();

let todoArray = [];
let tasksCompleted = 0;

loadTodo();

//Handle submit event
const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();

    const input = document.querySelector('#input-field');
    if (!input.value) { //Exit early with message if input.value is falsey/empty
        showMessage('Please enter a task!');
        return;
    }

    addTodo(input.value);
    input.value = ''; //clear input field
    clearMessage(); 
});

//Handle click event from the list-item buttons
document.querySelector('ul').addEventListener('click', e => {
    if (e.target.name == 'button-check') {
        completeTodo(e);  
    } else if (e.target.name == 'button-delete') {
        deleteTodo(e);
    }
});

document.querySelector('#button-clear').addEventListener('click', clearAll);


function addTodo(todo, addToArray = true) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');

    const iconCheck = '<i class="fa fa-check-square"></i>';
    const iconDelete = '<i class="fa fa-trash"></i>';
    li.innerHTML = `
        <span class="todo-item">${todo}</span>
        <button name="button-check" class="button-check">${iconCheck}</button>
        <button name="button-delete" class="button-delete">${iconDelete}</button>
    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li);

   
    if (addToArray) {
        todoArray.push({
            todo: todo, //Store todo string
            isCompleted: false, //Keeping track of completing
        });
        saveTodo();
    }

    return li;
}
function deleteTodo(e) {

    const item = e.target.parentNode; //Get <li> item from clicked button
    const listItems = Array.from(document.querySelectorAll('li')); //Get NodeList for <li> (item) elements and convert it to Array
    const index = listItems.indexOf(item); //Get array index of the item
    item.remove(); //remove item element from html document
    
    if (todoArray[index].isCompleted) { //Update tasksCompleted if item is checked when removed
        updateDisplay(--tasksCompleted);
    }
    todoArray.splice(index, 1); //Then finally remove/splice index from todo array 
    saveTodo();
}
function completeTodo(e) {

    item = e.target.parentNode;
    
    const index = getIndexFromList(item);
    if (todoArray[index].isCompleted) {

        todoArray[index].isCompleted = false;
        item.classList.remove('completed'); //Remove class element from html document
        updateDisplay(--tasksCompleted);
    } else {
        
        todoArray[index].isCompleted = true;
        item.classList.add('completed'); //Add class element so we can style in CSS
        updateDisplay(++tasksCompleted);
    }
    saveTodo();
}
function clearAll() {
    if (todoArray.length > 0) {
        const ul = document.querySelector('ul');
        ul.replaceChildren();

        updateDisplay(0);
        todoArray = [];
        saveTodo();
    }
}


function saveTodo() {
    localStorage.setItem('todo', JSON.stringify(todoArray));
}
function loadTodo() {
    jsonStr = localStorage.getItem('todo');
    if (!jsonStr) return;

    todoArray = JSON.parse(jsonStr);
    todoArray.forEach(todo => {
        let item = addTodo(todo.todo, false); 
        if (todo.isCompleted) {
            const index = getIndexFromList(item);
            item.classList.add('completed'); 
            updateDisplay(++tasksCompleted);  
        }
    });
}

function getIndexFromList(item) {
    const listItems = Array.from(document.querySelectorAll('li'));
    return listItems.indexOf(item);   
}

function updateDisplay(tasks) {
    const display = document.querySelector('#tasks-completed');
    display.innerHTML = 'Completed: ' + tasks;
}

function showMessage(text) {
    const message = document.querySelector('#message');
    message.innerHTML = text;
}
function clearMessage() {
    const message = document.querySelector('#message');
    message.innerHTML = '';   
}



document.querySelector('#switch-theme').addEventListener('change', switchTheme);

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }

}
function loadTheme() {
    const theme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', theme);

    if (theme === 'light') {
        document.querySelector('#switch-theme').checked = true;
    } else {
        document.querySelector('#switch-theme').checked = false;
    }
}