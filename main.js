//Initialize ToDo Array
const todoArray = [];
let tasksCompleted = 0;

const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();

    const input = document.querySelector('#input-field');
    if (!input.value) {
        showMessage('Please enter a task');
        return;
    }

    addTodo(input.value);
    input.value = ''; //clear input field
    clearMessage(); //Clear message
});

document.querySelector('ul').addEventListener('click', e => {
    if (e.target.id == 'button-check') {
        checkTodo(e);  
    } else if (e.target.id == 'button-delete') {
        deleteTodo(e);
    }
});

//Update TaskCompleted display
const display = document.querySelector('#tasks-completed');
display.innerHTML = 'Tasks Completed: ' + tasksCompleted;

updateDisplay(120);

function addTodo(todo) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');

    const iconCheck = '<i class="fa fa-check-square"></i>';
    const iconDelete = '<i class="fa fa-trash"></i>';
    li.innerHTML = `
        <span class="todo-item">${todo}</span>
        <button id="button-check">${iconCheck}</button>
        <button id="button-delete">${iconDelete}</button>
    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li);
}
function deleteTodo(e) {
    const item = e.target.parentNode;
    item.remove();
}
function checkTodo(e) {
    const item = e.target.parentNode;
    const icon = item.querySelector('#button-check i');
    if (item.style.textDecoration == 'line-through') {
        item.style.textDecoration = 'none';  
        icon.style.color = 'var(--colorButton)'; 
    } else {
        item.style.textDecoration = 'line-through';
        icon.style.color = 'var(--colorChecked)';
    }
}


function showMessage(text) {
    const message = document.querySelector('#message');
    message.innerHTML = text;
}
function clearMessage() {
    const message = document.querySelector('#message');
    message.innerHTML = '';   
}