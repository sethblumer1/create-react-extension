
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://tridvqtnafgvkszwhlcr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyaWR2cXRuYWZndmtzendobGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4OTYxMzYsImV4cCI6MjAxMjQ3MjEzNn0.lDmnKLT6jYaqBUxueVp4rthRRfFhUJyPAQ6pO5KBTx8'
export const supabase = createClient(supabaseUrl, supabaseKey)