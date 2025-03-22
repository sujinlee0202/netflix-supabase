"use server";

import { createServerSupabaseClient } from "@/utils/supabase/server";

interface ErrorObject {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

function handleError(error: ErrorObject | null) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  // const file = formData.get("file") as File;
  const files = Array.from(formData.entries()).map(
    ([name, file]) => file as File
  );

  const results = await Promise.all(
    files.map((file) =>
      supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
        .upload(file.name, file, { upsert: true })
    )
  );

  return results;
}

export async function searchFiles(keyword: string = "") {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .list(); // 전체 파일 목록 가져오기

  handleError(error);
  return data ? data.filter((file) => file.name.includes(keyword)) : [];
}

export async function deleteFile(fileName: string) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .remove([fileName]);

  handleError(error);
  return data;
}
