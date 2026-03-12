// This TypeScript interface describes the shape of a single to-do item.
// It mirrors the columns defined in your Supabase `todos` table.
//
// Table: todos
// - id          UUID        (primary key, auto-generated)
// - title       Text        (the task description)
// - is_completed Boolean    (whether the task is done)
// - created_at  Timestamp   (when the task was created)

export interface Todo {
  // Unique identifier for this to-do item (UUID string).
  id: string;

  // The text of the to-do, e.g. "Buy groceries".
  title: string;

  // Whether the to-do is completed or still active.
  is_completed: boolean;

  // When the to-do was created in the database.
  // Supabase returns timestamps as strings by default (ISO 8601), so we keep it as string here.
  created_at: string;
}

