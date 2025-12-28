-- Add due_date column to todos table
ALTER TABLE todos ADD COLUMN IF NOT EXISTS due_date DATE;

-- Create index for faster queries by due_date
CREATE INDEX IF NOT EXISTS idx_todos_due_date ON todos(due_date);