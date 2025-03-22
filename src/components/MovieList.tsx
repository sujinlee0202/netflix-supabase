"use client";

import { searchMovies } from "@/actions/movieActions";
// import { getAllMovies } from "@/actions/movieActions";
import MovieCard from "./MovieCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useSearchStore from "@/store/useSearchStore";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import useFavoriteStore from "@/store/useFavoriteStore";

export default function MovieList() {
  const keyword = useSearchStore((state) => state.keyword);
  const { favorites } = useFavoriteStore();

  const { data, isFetchingNextPage, isFetching, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["movie", keyword],
      queryFn: ({ pageParam }) =>
        searchMovies({ search: keyword, page: pageParam, pageSize: 12 }),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.page ? lastPage.page + 1 : undefined;
      },
    });

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  const movies = data?.pages
    ?.map((page) => page.data)
    .flat()
    .filter((movie) => movie); // 전체 영화 목록

  const favoriteMovies = movies?.filter((movie) =>
    favorites.includes(movie.id)
  ); // 찜한 영화 목록
  const otherMovies = movies?.filter((movie) => !favorites.includes(movie.id)); // 나머지 영화 목록

  return (
    <div className='grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full'>
      {isFetching || (isFetchingNextPage && <div>Loading...</div>)}
      <>
        {favoriteMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        {otherMovies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
        <div ref={ref}></div>
      </>
    </div>
  );
}
