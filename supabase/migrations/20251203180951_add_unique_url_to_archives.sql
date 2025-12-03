-- Add unique constraint on url for upsert support
ALTER TABLE archives ADD CONSTRAINT archives_url_unique UNIQUE (url);
