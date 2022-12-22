import React from "react";
import { useMutation } from "react-query";

function Todo({ todo, API_URL, updateTodoCallback }) {
  const mutation = useMutation(
    (todo) => {
      return fetch(`${API_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...todo,
          id: undefined,
          created_at: undefined,
          updated_at: undefined,
        }),
      });
    },
    {
      onSuccess: (data, variables) => {
        console.log("Success", data);
        updateTodoCallback(variables);
      },
      onError: (error) => {
        console.log("Error", error);
      },
    }
  );
  return (
    <div>
      <span>{todo.name}</span>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => {
          mutation.mutate({
            ...todo,
            completed: !todo.completed,
          });
        }}
      />
    </div>
  );
}

export default Todo;
