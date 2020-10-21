const TODOS_URL = '/api/todos';

export const getAllTodos = () => 
  fetch(TODOS_URL)
    .then((response) => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response.json();
    });

export const createTodo = (newTodo) => 
  fetch('/api/todos',
    {
      method: 'POST',
      body: JSON.stringify(newTodo)
    }
  )
    .then((response) => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response.json();
    });

export const deleteTodo = (deletedTodo) => 
  fetch(`/api/todos/${deletedTodo.id}`, {
      method: 'DELETE',
  })
    .then((response) => {
      if (!response.ok) {
          throw Error(response.statusText);
      }
      return response.json();
    });