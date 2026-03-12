// This file creates a single shared Supabase client instance.
// We import and reuse this client anywhere we need to talk to the database.

import { createClient } from "@supabase/supabase-js";

// Read the Supabase URL and Anon key from environment variables.
// These should be defined in your `.env.local` file:
// - NEXT_PUBLIC_SUPABASE_URL
// - NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Basic safety check: if these are missing, throw an error early.
// This helps you notice misconfigured environment variables during development.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your `.env.local` file.",
  );
}

// Create and export the Supabase client.
// We use the "anon" public key, which is safe to expose to the browser,
// as long as your Supabase row-level security (RLS) policies are configured correctly.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

