import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import Todo from "./Todo";

function Todos({ API_URL }) {
  const queryClient = useQueryClient();
  const [todos, setTodos] = useState([]);
  const { isLoading, isError, data, error } = useQuery("todos", fetchTodoList);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  function fetchTodoList() {
    return fetch(`${API_URL}/todos`)
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        return data;
      });
  }

  /**
   * Todo update callback function
   */
  function updateTodoCallback(updatedTodo) {
    queryClient.setQueryData("todos", () => {
      setTodos((old) => {
        return old.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo;
          }
          return todo;
        });
      });
    });
  }

  return (
    <div>
      <h1>Todos</h1>
      <div>
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            API_URL={API_URL}
            updateTodoCallback={updateTodoCallback}
          />
        ))}
      </div>
    </div>
  );
}

export default Todos;
