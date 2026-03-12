"use server";

// This file contains lightweight server actions that talk to Supabase.
// They are used by the page and client components to perform CRUD operations.

import { revalidatePath } from "next/cache";
import { supabase } from "@/lib/supabaseClient";
import type { Todo } from "@/types/todo";

// READ: Fetch all todos from the database, ordered by creation time (newest first).
export async function getTodos(): Promise<Todo[]> {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching todos:", error.message);
    return [];
  }

  // If there are no rows, Supabase returns null, so we coerce to an empty array.
  return (data as Todo[]) ?? [];
}

// CREATE: Add a new todo based on form data submitted from the page.
export async function addTodo(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();

  // If the input is empty or only spaces, do nothing.
  if (!title) {
    return;
  }

  const { error } = await supabase.from("todos").insert({ title });

  if (error) {
    console.error("Error adding todo:", error.message);
  }

  // Ask Next.js to re-render the home page so that the new todo appears.
  revalidatePath("/");
}

// UPDATE: Toggle the completion state of a todo.
// This action is called from a client component with the todo ID and current state.
export async function toggleTodoCompletion(id: string, isCompleted: boolean) {
  const { error } = await supabase
    .from("todos")
    .update({ is_completed: !isCompleted })
    .eq("id", id);

  if (error) {
    console.error("Error toggling todo:", error.message);
  }

  // Re-render the home page so the updated state is visible.
  revalidatePath("/");
}

// DELETE: Remove a todo permanently from the database.
export async function deleteTodo(id: string) {
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting todo:", error.message);
  }

  // Re-render the home page so the removed todo disappears from the list.
  revalidatePath("/");
}

