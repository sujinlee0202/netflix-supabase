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

// export async function getAllMovies() {
//   const supabase = await createServerSupabaseClient();

//   const { data, error } = await supabase.from("movie").select("*");

//   handleError(error);

//   return data;
// }

// export async function searchMovies({ search = "" }) {
//   const supabase = await createServerSupabaseClient();

//   const { data, error } = await supabase
//     .from("movie")
//     .select("*")
//     .like("title", `%${search}%`);

//   handleError(error);

//   return data;
// }

export async function searchMovies({
  search,
  page,
  pageSize,
}: {
  search: string;
  page: number;
  pageSize: number;
}) {
  const supabase = await createServerSupabaseClient();

  const { data, error, count } = await supabase // count : 전체 데이터 갯수
    .from("movie")
    .select("*")
    .like("title", `%${search}%`)
    .range((page - 1) * pageSize, page * pageSize - 1); // 시작값, 끝나는 값값

  const hasNextPage = (count ?? 0) > page * pageSize;

  if (error) {
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
    };
  }

  return { data, page, pageSize, hasNextPage };
}

export async function getMovie(id: number) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("movie")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  handleError(error);

  return data;
}
