import React, { useEffect, useState } from 'react';

import { getAllTodos, createTodo, deleteTodo } from './api';

const DRAFT_EMPTY = '';

const TodoList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [draft, setDraft] = useState(DRAFT_EMPTY);

  useEffect(() => {
    setIsLoading(true);
    getAllTodos()
      .then((response) => {
        setIsLoading(false);
        setTodos(response);
      })
      .catch(() => {
        setIsLoading(false)
      });
  }, []);

  const handleDraftChange = (e) => {
    setDraft(e.target.value);
  }

  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      text: draft
      // add provisional id
    };

    const newTodos = [newTodo].concat(todos);
    setTodos(newTodos);

    setIsLoading(true);
    createTodo(newTodo)
      .then((response) => {
        setIsLoading(false);
        // Add better handling here
      })
      .catch(() => {
        setIsLoading(false)
      });

    
    setDraft(DRAFT_EMPTY);
  }

  const handleDelete = (todoItem) => {
    setIsLoading(true);
    deleteTodo(todoItem)
      .then(() => {
        setIsLoading(false);
        const newTodos = todos.filter((todo) => todo.id !== todoItem.id);
        setTodos(newTodos);
      })
      .catch(() => {
        setIsLoading(false)
      });
  }

  const addDisabled = !draft || isLoading;

  return (
    <>
      <h3>Todo List</h3>
      <form onSubmit={handleAddTodo}>
        <input value={draft} onChange={handleDraftChange} disabled={isLoading}/>
        <button disabled={addDisabled}>
          Add
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => handleDelete(todo)}>-</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
