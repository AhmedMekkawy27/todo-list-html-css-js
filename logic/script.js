const todoList = document.getElementById('todo-list');
let tasks;
let updateStatus = false;
const todoInput = document.getElementById('todo-input');

if(localStorage.getItem('tasks')){
    // Get tasks from local storage and display them on the page
    tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < JSON.parse(localStorage.getItem('tasks')).length; i++){
        showtasks(JSON.parse(localStorage.getItem('tasks'))[i].text)

        // Check if there are any completed tasks in the local storage
        if(JSON.parse(localStorage.getItem('tasks'))[i].completed === true){
            document.querySelectorAll('li')[i].classList.toggle('completed');
        }
    }
}else{
    // Initialize an empty array if no tasks are found in local storage
    tasks = [];
}

// Read Operation
document.getElementById('add-btn').addEventListener('click', function() {
    let task = {
        text: todoInput.value.trim(),
        completed: false
    };
    if (task.text !== "" && updateStatus === false) {
        // Update tasks array in the local storage if it exists
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // Show new task in ui
        showtasks(task.text)

        // Notify user that task has been added
        notify('Added')
        // Clear input field
        todoInput.value = '';
    }
});

// Read Function
function showtasks(tasks) { 
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.innerHTML = `
            <span>${tasks}</span>
            <div>
                <button class="edit-btn">Edit</button>
                <button class="remove-btn">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    
 }

 document.onclick = function(e){
    // Remove Operation
    if(e.target.classList.contains('remove-btn')){
        // Removing task from ui and upadating local storage
        e.target.parentElement.parentElement.remove();
        tasks = tasks.filter(task => task.text!== e.target.parentElement.parentElement.querySelector('span').innerText);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Notify user that task has been deleted
        notify('deleted')
    } 

    // Update Operation
    else if(e.target.classList.contains('edit-btn')){
        updateStatus = true;
        todoInput.focus();
        todoInput.placeholder = 'Update task';
        document.getElementById('add-btn').textContent = 'Update task';
        todoInput.value = e.target.parentElement.previousElementSibling.innerHTML;

        document.getElementById('add-btn').addEventListener('click', function(){
            if(todoInput.value !== '' && updateStatus === true){
                for(let i = 0; i < tasks.length; i++){
                    if(tasks[i].text === e.target.parentElement.previousElementSibling.innerHTML){
                        tasks[i].text = todoInput.value.trim();
                    }
                } 
                todoInput.value = e.target.parentElement.previousElementSibling.innerHTML = todoInput.value.trim();
                localStorage.setItem('tasks', JSON.stringify(tasks));
                todoInput.value = ''
                document.getElementById('add-btn').textContent = 'Add Task';
                todoInput.placeholder = 'Add a new task';
                updateStatus = false;
                notify('Updated')
            }
        })
    }
    
    // Complete/Incomplete Operation
    else if(e.target.classList.contains('todo-item')){
        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].text === e.target.parentElement.querySelector('span').innerText){
                tasks[i].completed =!tasks[i].completed;
                e.target.classList.toggle('completed');
            }
            
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
 }

 // show notification message
 function notify(message){
    document.querySelector('.message').textContent = `You ${message} a task`
    document.querySelector('.message').style.display = 'block';
    setTimeout(() => {
        document.querySelector('.message').style.display = 'none';
    }, 2000);
 }