'use strict';

const todoInputEl = document.querySelector('.todo-input');
const addBtnEl = document.querySelector('.add-todo-btn');

const todoListEl = document.querySelector('.todo-list');

function createTodoItem(text, parent) {
  const itemEl = document.createElement('li');
  itemEl.className = 'todo-list-item';
  itemEl.innerHTML = `<span class="todo-list-item-text">${text}</span>
    <button class="edit-todo-btn">Редагувати</button>
    <button class="delete-todo-btn">Видалити</button>`;
  
  parent.append(itemEl);
}

addBtnEl.addEventListener('click', event => {
  const newTaskText = todoInputEl.value.trim();
  if (!newTaskText) {
    return;
  }

  createTodoItem(newTaskText, todoListEl);
  todoInputEl.value = '';
});

todoListEl.addEventListener('click', event => {
  event.stopPropagation();

  if (event.target.className === 'delete-todo-btn') {
    const todoItemEl = event.target.closest(".todo-list-item");
    const taskText = todoItemEl.querySelector('.todo-list-item-text').textContent;
    if (confirm(`Ти добре подумав і хочеш видалити ${taskText} ?`)) {
      todoItemEl.remove();
    }
  }
});