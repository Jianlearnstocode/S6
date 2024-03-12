// Get elements
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const clearCompletedBtn = document.getElementById('clear-completed');
const quoteDiv = document.getElementById('quote');

// Load todos from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    if (todo.completed) {
      li.classList.add('completed');
    }
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editTodo(index));
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    });
    const completeCheckbox = document.createElement('input');
    completeCheckbox.type = 'checkbox';
    completeCheckbox.checked = todo.completed;
    completeCheckbox.addEventListener('change', () => {
      todo.completed = !todo.completed;
      localStorage.setItem('todos', JSON.stringify(todos));
      renderTodos();
    });
    li.appendChild(completeCheckbox);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

renderTodos();

// Add new todo
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTodo = todoInput.value.trim();
  if (newTodo !== '') {
    todos.push({ text: newTodo, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    todoInput.value = '';
  }
});

// Edit todo
function editTodo(index) {
  const newText = prompt('Edit todo:', todos[index].text);
  if (newText !== null && newText.trim() !== '') {
    todos[index].text = newText.trim();
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }
}

// Clear completed todos
clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(todo => !todo.completed);
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
});

// Fetch quote of the day
fetch('https://api.quotable.io/random')
  .then(response => response.json())
  .then(data => {
    quoteDiv.textContent = `"${data.content}" - ${data.author}`;
  })
  .catch(error => console.error(error));