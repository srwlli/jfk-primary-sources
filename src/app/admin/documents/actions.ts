"use server"

import { createClient } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"
import { DocumentCategory, DocumentAgency } from "@/types/document"

// Use service role for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface DocumentFormData {
  title: string
  slug: string
  description?: string
  date?: string
  category: DocumentCategory
  agency: DocumentAgency
  agency_other?: string
  source?: string
  document_number?: string
  pages?: number
  summary?: string
  transcript?: string
  related_people?: string[]
  related_locations?: string[]
  related_incidents?: string[]
  related_investigations?: string[]
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100)
}

export async function createDocument(formData: DocumentFormData) {
  try {
    const slug = formData.slug || generateSlug(formData.title)

    const { data, error } = await supabase
      .from('documents')
      .insert({
        title: formData.title,
        slug,
        description: formData.description || null,
        date: formData.date || null,
        category: formData.category,
        agency: formData.agency,
        agency_other: formData.agency === 'other' ? formData.agency_other : null,
        source: formData.source || null,
        document_number: formData.document_number || null,
        pages: formData.pages || null,
        summary: formData.summary || null,
        transcript: formData.transcript || null,
        related_people: formData.related_people || [],
        related_locations: formData.related_locations || [],
        related_incidents: formData.related_incidents || [],
        related_investigations: formData.related_investigations || [],
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating document:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/documents')
    revalidatePath('/admin/documents')

    return { success: true, data }
  } catch (err) {
    console.error('Error creating document:', err)
    return { success: false, error: 'Failed to create document' }
  }
}

export async function updateDocument(id: string, formData: Partial<DocumentFormData>) {
  try {
    const updateData: Record<string, unknown> = {}

    if (formData.title !== undefined) updateData.title = formData.title
    if (formData.slug !== undefined) updateData.slug = formData.slug
    if (formData.description !== undefined) updateData.description = formData.description || null
    if (formData.date !== undefined) updateData.date = formData.date || null
    if (formData.category !== undefined) updateData.category = formData.category
    if (formData.agency !== undefined) updateData.agency = formData.agency
    if (formData.agency_other !== undefined) updateData.agency_other = formData.agency_other || null
    if (formData.source !== undefined) updateData.source = formData.source || null
    if (formData.document_number !== undefined) updateData.document_number = formData.document_number || null
    if (formData.pages !== undefined) updateData.pages = formData.pages || null
    if (formData.summary !== undefined) updateData.summary = formData.summary || null
    if (formData.transcript !== undefined) updateData.transcript = formData.transcript || null
    if (formData.related_people !== undefined) updateData.related_people = formData.related_people || []
    if (formData.related_locations !== undefined) updateData.related_locations = formData.related_locations || []
    if (formData.related_incidents !== undefined) updateData.related_incidents = formData.related_incidents || []
    if (formData.related_investigations !== undefined) updateData.related_investigations = formData.related_investigations || []

    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabase
      .from('documents')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating document:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/documents')
    revalidatePath(`/documents/${data.slug}`)
    revalidatePath('/admin/documents')

    return { success: true, data }
  } catch (err) {
    console.error('Error updating document:', err)
    return { success: false, error: 'Failed to update document' }
  }
}

export async function deleteDocument(id: string) {
  try {
    // First get the document to find the file URL
    const { data: doc } = await supabase
      .from('documents')
      .select('file_url, slug')
      .eq('id', id)
      .single()

    // Delete file from storage if exists
    if (doc?.file_url) {
      const path = doc.file_url.split('/documents/')[1]
      if (path) {
        await supabase.storage.from('documents').remove([path])
      }
    }

    // Delete the document record
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting document:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/documents')
    revalidatePath('/admin/documents')

    return { success: true }
  } catch (err) {
    console.error('Error deleting document:', err)
    return { success: false, error: 'Failed to delete document' }
  }
}

export async function uploadDocumentFile(documentId: string, formData: FormData) {
  try {
    const file = formData.get('file') as File
    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    // Get document slug for file naming
    const { data: doc } = await supabase
      .from('documents')
      .select('slug')
      .eq('id', documentId)
      .single()

    if (!doc) {
      return { success: false, error: 'Document not found' }
    }

    // Generate unique filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf'
    const fileName = `${doc.slug}-${Date.now()}.${ext}`

    // Upload to storage
    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      })

    if (uploadError) {
      console.error('Error uploading file:', uploadError)
      return { success: false, error: uploadError.message }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(fileName)

    // Update document with file info
    const { error: updateError } = await supabase
      .from('documents')
      .update({
        file_url: urlData.publicUrl,
        file_type: ext,
        file_size: file.size,
        updated_at: new Date().toISOString()
      })
      .eq('id', documentId)

    if (updateError) {
      console.error('Error updating document with file info:', updateError)
      return { success: false, error: updateError.message }
    }

    revalidatePath('/documents')
    revalidatePath(`/documents/${doc.slug}`)

    return { success: true, url: urlData.publicUrl }
  } catch (err) {
    console.error('Error uploading file:', err)
    return { success: false, error: 'Failed to upload file' }
  }
}

export async function getDocuments() {
  const { data, error } = await supabase
    .from('documents')
    .select('id, slug, title, category, agency, date, created_at')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error('Error fetching documents:', error)
    return []
  }

  return data
}

export async function getDocument(id: string) {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching document:', error)
    return null
  }

  return data
}
