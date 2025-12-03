-- Change birth and death columns from TEXT to DATE
ALTER TABLE people
  ALTER COLUMN birth TYPE DATE USING NULL,
  ALTER COLUMN death TYPE DATE USING NULL;

-- Add comments
COMMENT ON COLUMN people.birth IS 'Birth date in YYYY-MM-DD format';
COMMENT ON COLUMN people.death IS 'Death date in YYYY-MM-DD format (NULL if alive)';
