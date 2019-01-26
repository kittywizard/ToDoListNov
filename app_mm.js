// Define UI Variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Loaf all event listeners

loadEventListeners();

function loadEventListeners() {
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

    //clear input
    taskInput.value = '';

    //prevent default behavior - submit event
    e.preventDefault();
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();

        }
    }
} 

function clearTasks() {
    //taskList.innerHTML = '';

    //Faster Way
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

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