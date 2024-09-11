const todoList = document.getElementById('todo-list');
let tasks;
let updateStatus = false;
const todoInput = document.getElementById('todo-input');
if(localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < JSON.parse(localStorage.getItem('tasks')).length; i++){
        showtasks(JSON.parse(localStorage.getItem('tasks'))[i].text)
        if(JSON.parse(localStorage.getItem('tasks'))[i].completed === true){
            document.querySelectorAll('li')[i].classList.toggle('completed');
        }
    }
}else{
    tasks = [];
}



document.getElementById('add-btn').addEventListener('click', function() {
    let task = {
        text: todoInput.value.trim(),
        completed: false
    };
    if (task.text !== "" && updateStatus === false) {
        
        tasks.push(task)
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // Append task to list
        showtasks(task.text)

        // Clear input field
        todoInput.value = '';
    }
});

// Read Operation
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
        e.target.parentElement.parentElement.remove();
        tasks = tasks.filter(task => task.text!== e.target.parentElement.parentElement.querySelector('span').innerText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
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
                document.getElementById('add-btn').textContent = 'Add task';
                todoInput.placeholder = 'Add a new task';
                updateStatus = false;
            }
        })
    }
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