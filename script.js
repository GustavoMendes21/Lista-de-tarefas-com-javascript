const Todos = JSON.parse(localStorage.getItem("Todos")) || []
renderTodos()


function saveLocalStorage() {
    localStorage.removeItem("Todos")
    localStorage.setItem("Todos", JSON.stringify(Todos))
}


function selectTodo (event) {
    event.target.classList.toggle("selected")
    const id = event.target.dataset.id

    Todos[id].completed = !Todos[id].completed
    saveLocalStorage()
}

function renderTodos() {
    const ulElement = document.querySelector(".todo-list")
    ulElement.innerHTML = ""

    Todos.forEach((todo, index) => {
        const ulElement = document.querySelector(".todo-list")
    
        const listElement = document.createElement("li")
        const paragraphElement = document.createElement("p")
        paragraphElement.setAttribute("onclick", "selectTodo(event)")
        paragraphElement.setAttribute("data-id", index)
        paragraphElement.classList.add("todo")
        paragraphElement.innerText = todo.task
        
        if(todo.completed) {
            paragraphElement.classList.add("selected")
        }

        ulElement.appendChild(listElement)
        listElement.appendChild(paragraphElement)
    
        const deleteBtnElement = document.createElement("button")
        deleteBtnElement.classList.add("delete-btn")
        deleteBtnElement.innerText = 'X'
        deleteBtnElement.setAttribute("onclick", "deleteTodo(event)")
        deleteBtnElement.setAttribute("data-id", index)
        listElement.appendChild(deleteBtnElement)
    })

}

function deleteTodo(event) {
    const id = event.target.dataset.id
    Todos.splice(id,1)
    
    renderTodos()
    saveLocalStorage()
}

function addTodo() {
    const todo = {
        task: getTodo(),
        completed: false
    }
    
    if(todo.task === "") {
        return
    }

    Todos.push(todo)

    renderTodos()
    saveLocalStorage()

}


function getTodo() {
    const taskInput = document.querySelector("#task-input")
    const taskText = taskInput.value

    return taskText
}

