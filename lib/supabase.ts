import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uhpxzchujnxtsncgmiwn.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVocHh6Y2h1am54dHNuY2dtaXduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NjYxMTksImV4cCI6MjA2MzI0MjExOX0.I7bERHD26qk2Z6KMB-zxsONr4ZGEIWCj0OkR5WUWwhc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
