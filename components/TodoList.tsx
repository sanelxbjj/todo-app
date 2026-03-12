"use client";

// This client component is responsible for:
// - Displaying the list of todos
// - Letting the user toggle completion via a checkbox
// - Letting the user delete individual todos
//
// It calls server actions to actually update the database.

import { useTransition } from "react";
import type { Todo } from "@/types/todo";
import { toggleTodoCompletion, deleteTodo } from "@/app/actions";

type Props = {
  todos: Todo[];
};

export function TodoList({ todos }: Props) {
  // useTransition lets us show a "working" state while a server action is running.
  const [isPending, startTransition] = useTransition();

  // When the checkbox is clicked, we call the server action to toggle completion.
  const handleToggle = (todo: Todo) => {
    startTransition(() => {
      toggleTodoCompletion(todo.id, todo.is_completed);
    });
  };

  // When the delete button is clicked, we call the server action to delete the todo.
  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    startTransition(() => {
      deleteTodo(id);
    });
  };

  if (todos.length === 0) {
    return (
      <p className="text-center text-sm text-zinc-500">
        You have no tasks yet. Add your first to-do above!
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex items-start justify-between rounded-md border border-zinc-200 bg-white px-3 py-2 shadow-sm"
        >
          <label className="flex flex-1 cursor-pointer items-start gap-2">
            <input
              type="checkbox"
              checked={todo.is_completed}
              onChange={() => handleToggle(todo)}
              disabled={isPending}
              className="mt-1 h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
            />

            <div className="flex-1">
              {/* Main title */}
              <span
                className={`block text-sm ${
                  todo.is_completed ? "text-zinc-400 line-through" : "text-zinc-800"
                }`}
              >
                {todo.title}
              </span>

              {/* Optional description shown below the title (only if not empty) */}
              {todo.description && todo.description.trim().length > 0 && (
                <p className="mt-1 text-xs text-zinc-500">{todo.description}</p>
              )}
            </div>
          </label>

          <button
            type="button"
            onClick={() => handleDelete(todo.id)}
            disabled={isPending}
            className="ml-3 text-xs font-medium text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

