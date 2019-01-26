// Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Loaf all event listeners

loadEventListeners();

function loadEventListeners() {
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask);
    //Clear Tasks
    clearBtn.addEventListener('click', clearTasks);
    //Filter Tasks
    filter.addEventListener('keyup', filterTasks);
}

function addTask(e){
    if(taskInput.value === ''){
        alert("Add a task");
    }

    //create li element
    const li = document.createElement('li');
    
    //add class
    li.className = 'collection-item';

    //create text node
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    //add icon html

    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);

    //append li to the ul
    taskList.appendChild(li);

    // Store Local Storage
    storeTaskLocal(taskInput.value);

    //clear input
    taskInput.value = '';

    //prevent default behavior - submit event
    e.preventDefault();
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();
            
            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);

        }
    }
} 

function removeTaskFromLocalStorage(taskItem) {
    let tasks;

    if (localStorage.getItem('tasks') = null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEAch(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1);

        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function clearTasks() {
    //taskList.innerHTML = '';

    //Faster Way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    //clear from local storage
    clearTasksFromLocal();
}

function clearTasksFromLocal() {
    localStorage.clear();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    
    //can use forEach because using querySelectorAll returns a node list 
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;

            if(item.toLowerCase().indexOf(text) != -1){
                    task.style.display = 'block';
            }
            else {
                task.style.display = 'none';
            }
        }
    );
}

function storeTaskLocal(task) {
    let tasks;

    if(localStorage.getItem('tasks') = null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));

}

function getTasks() {
    let tasks;

    if (localStorage.getItem('tasks') = null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

        //create li element
        const li = document.createElement('li');

        //add class
        li.className = 'collection-item';

        //create text node
        li.appendChild(document.createTextNode(task));

        // create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';

        //add icon html

        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);

        //append li to the ul
        taskList.appendChild(li);
    });
}