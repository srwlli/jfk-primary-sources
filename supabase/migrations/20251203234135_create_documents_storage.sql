-- Storage policies for documents bucket
-- NOTE: The 'documents' bucket must be created via Supabase Dashboard or CLI:
--   supabase storage create documents --public
-- Or via the Dashboard: Storage > New Bucket > Name: "documents" > Public: Yes

-- Policy: Allow public read access to documents
CREATE POLICY "Public read access for documents"
ON storage.objects FOR SELECT
USING (bucket_id = 'documents');

-- Policy: Allow authenticated users to upload documents
CREATE POLICY "Authenticated users can upload documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'documents');

-- Policy: Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update documents"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'documents');

-- Policy: Allow authenticated users to delete documents
CREATE POLICY "Authenticated users can delete documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'documents');
