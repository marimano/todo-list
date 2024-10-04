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
  const { target } = event;
  const todoItemEl = target.closest(".todo-list-item");
  switch (target.className) {
    case 'delete-todo-btn': {
      const taskText = todoItemEl.querySelector('.todo-list-item-text').textContent;
      if (confirm(`Ти добре подумав і хочеш видалити ${taskText} ?`)) {
        todoItemEl.remove();
      }
      break;
    }

    case 'edit-todo-btn': {
      const taskText = todoItemEl.querySelector('.todo-list-item-text').textContent;
      todoItemEl.innerHTML = `<input class="todo-list-item-text" value="${taskText}" default-value="${taskText}"/>
        <button class="save-todo-btn">Зберегти</button>
        <button class="cancel-todo-btn">Закрити</button>`;
      break;
    }

    case 'save-todo-btn': {
      const updatedTaskText = target.previousElementSibling.value.trim();
      if (!updatedTaskText) {
        return;
      }

      todoItemEl.innerHTML = `<span class="todo-list-item-text">${updatedTaskText}</span>
        <button class="edit-todo-btn">Редагувати</button>
        <button class="delete-todo-btn">Видалити</button>`;
      break;
    }

    case 'cancel-todo-btn': {
      const oldTaskText = target.previousElementSibling.previousElementSibling.defaultValue;

      todoItemEl.innerHTML = `<span class="todo-list-item-text">${oldTaskText}</span>
        <button class="edit-todo-btn">Редагувати</button>
        <button class="delete-todo-btn">Видалити</button>`;
      break;
    }
  }
});