const todoArray= [];
let tasksCompleted = 0;

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
        checkTodo(e);  
    } else if (e.target.name == 'button-delete') {
        deleteTodo(e);
    }
});


function addTodo(todo) {
    const ul = document.querySelector('ul');
    const li = document.createElement('li');

    const iconCheck = '<i class="fa fa-check-square"></i>';
    const iconDelete = '<i class="fa fa-trash"></i>';
    li.innerHTML = `
        <span class="todo-item">${todo}</span>
        <button name="button-check" class="button-check">${iconCheck}</button>
        <button name="button-delete">${iconDelete}</button>
    `;
    li.classList.add('todo-list-item');
    ul.appendChild(li);

    todoArray.push({
        item: li, //Store all item HTML elements
        checked: false, //Keeping track of checking/completing
    });
    console.log('Todo Added');
    console.log(todoArray);
}
function deleteTodo(e) {

    const item = e.target.parentNode; //Get <li> item from clicked button
    const listItems = Array.from(document.querySelectorAll('li')); //Get NodeList for <li> (item) elements and convert it to Array
    const index = listItems.indexOf(item); //Get array index of the item
    item.remove(); //remove item element from html document
    
    if (todoArray[index].checked) { //Update tasksCompleted if item is checked when removed
        updateDisplay(--tasksCompleted);
    }
    todoArray.splice(index, 1); //Then finally remove/splice index from todo array 
    
    console.log('Todo Deleted');
    console.log(todoArray);
}
function checkTodo(e) {

    const item = e.target.parentNode;

    const listItems = Array.from(document.querySelectorAll('li'));
    const index = listItems.indexOf(item);
    if (todoArray[index].checked) {

        todoArray[index].checked = false;
        item.classList.remove('checked'); //Remove class element from html document
        updateDisplay(--tasksCompleted);
        
        console.log('Checked');

    } else {
        
        todoArray[index].checked = true;
        item.classList.add('checked'); //Add class element so we can style in CSS
        updateDisplay(++tasksCompleted);

        console.log('Checked');
    }
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