// This is the main page of the app.
// It is a Server Component that:
// - Fetches all todos from Supabase on the server
// - Renders the "Add todo" form (using a server action)
// - Renders the list of todos via a small client component

import { addTodo, getTodos } from "./actions";
import { TodoList } from "@/components/TodoList";

export default async function Home() {
  // Load all todos from the database.
  const todos = await getTodos();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-8 font-sans">
      <main className="w-full max-w-md rounded-2xl bg-white p-6 shadow-md">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-zinc-900">My To-Do List</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Add tasks, mark them as done, or delete them.
          </p>
        </header>

        {/* CREATE: simple form that posts directly to the addTodo server action */}
        <form action={addTodo} className="mb-6 space-y-2">
          {/* Short title for the task */}
          <input
            type="text"
            name="title"
            placeholder="What do you need to do?"
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          {/* Optional longer description for extra details */}
          <input
            type="text"
            name="description"
            placeholder="Add an optional description (e.g. details, notes)..."
            className="w-full rounded-md border border-zinc-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {/* READ, UPDATE, DELETE: handled by the TodoList client component */}
        <TodoList todos={todos} />
      </main>
    </div>
  );
}
