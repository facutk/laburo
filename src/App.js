import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

const DRAFT_EMPTY = '';
const TodoList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [draft, setDraft] = useState(DRAFT_EMPTY);

  useEffect(() => {
    setIsLoading(true);
    fetch('/api/todos')
      .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
      })
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
    fetch('/api/todos',
      {
        method: 'POST',
        body: JSON.stringify(newTodo)
      })
      .then((response) => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        console.log(response)
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

const Main = () => {
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/status")
      .then(r => r.json())
      .then(({ status }) => {
        setIsLoading(false)
        setStatus(status);
      })
      .catch(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <div>
      <h3>react app</h3>

      {isLoading && "Loading..."}

      {!isLoading && (
        <>
          status: {status}
        </>
      )}
      <TodoList />
    </div>
  );
}

const About = () => {
  return <h2>About</h2>;
}

const Users = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch("/api/user/ram")
      .then(r => r.json())
      .then(setUser)
  }, []);

  return (
    <>
      <h2>Users</h2>
      <pre>
        {JSON.stringify(user, undefined, 2)}
      </pre>
    </>
  );
}

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
