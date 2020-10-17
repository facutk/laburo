import React, { useEffect, useState } from 'react';

import { getAllTodos, createTodo } from './api';

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
      description: draft
    };
    const newTodos = todos.concat(newTodo);

    setIsLoading(true);
    createTodo(newTodo)
      .then((response) => {
        setIsLoading(false);
        setTodos(response);
      })
      .catch(() => {
        setIsLoading(false)
      });

    setTodos(newTodos);
    setDraft(DRAFT_EMPTY);
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
          <li key={todo.description}>
            {todo.description}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
