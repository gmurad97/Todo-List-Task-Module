document.addEventListener('DOMContentLoaded', function() {
    const MAX_TASKS = 5;
    const todoList = document.getElementById('todo_list');
    const addButton = document.getElementById('todo_add_btn');
    let sortDirection = 'asc';

    addButton.addEventListener('click', addTaskInput);
    todoList.addEventListener('click', function(event) {
        if (event.target.classList.contains('todo__item-icon')) {
            removeTaskInput(event.target);
        }
    });

    const sortIcon = document.getElementById('todo_sort');
    sortIcon.addEventListener('click', function() {
        sortList();
    });

    function addTaskInput() {
        if (todoList.children.length < MAX_TASKS) {
            const taskInput = createTaskInput();
            const removeButton = createRemoveButton();
            const taskItem = document.createElement('li');
            taskItem.classList.add('todo__item');
            taskItem.setAttribute('data-uid', todoList.children.length + 1);
            taskItem.appendChild(taskInput);
            taskItem.appendChild(removeButton);
            todoList.appendChild(taskItem);
        } else {
            alert("Limit!5 input!");
        }
    }

    function createTaskInput() {
        const taskInput = document.createElement('input');
        taskInput.setAttribute('type', 'text');
        taskInput.setAttribute('class', 'todo__item-input');
        taskInput.setAttribute('name', 'backend_name[]');
        taskInput.setAttribute('placeholder', 'Please enter todo item');
        return taskInput;
    }

    function createRemoveButton() {
        const removeButton = document.createElement('i');
        removeButton.classList.add('fa-solid', 'fa-xmark', 'todo__item-icon');
        return removeButton;
    }

    function removeTaskInput(icon) {
        const taskItem = icon.parentElement;
        if (todoList.children.length > 1) {
            taskItem.remove();
        }
    }

    function sortList() {
        const tasks = Array.from(todoList.children);
        tasks.sort((a, b) => {
            const textA = a.querySelector('.todo__item-input').value.toUpperCase();
            const textB = b.querySelector('.todo__item-input').value.toUpperCase();
            return sortDirection === 'asc' ? textA.localeCompare(textB) : textB.localeCompare(textA);
        });
        todoList.innerHTML = '';
        tasks.forEach(task => todoList.appendChild(task));
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    }
});
