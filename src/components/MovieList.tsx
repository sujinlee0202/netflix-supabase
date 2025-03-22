"use client";

import { searchMovies } from "@/actions/movieActions";
// import { getAllMovies } from "@/actions/movieActions";
import MovieCard from "./MovieCard";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import useSearchStore from "@/store/useSearchStore";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function MovieList() {
  const keyword = useSearchStore((state) => state.keyword);
  // const { data, isLoading } = useQuery({
  //   queryKey: ["movie", keyword],
  //   queryFn: () => searchMovies({ search: keyword }),
  // });
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

  useEffect(() => {
    console.log(inView);
  }, [inView]); // inView가 변경될때마다 호출

  return (
    <div className='grid gap-1 md:grid-cols-4 grid-cols-3 w-full h-full'>
      {isFetching || (isFetchingNextPage && <div>Loading...</div>)}
      <>
        {data?.pages &&
          data.pages
            .map((movie) => movie.data)
            .flat()
            .map(
              (movie) => movie && <MovieCard key={movie.id} movie={movie} />
            )}
        <div ref={ref}></div>
      </>
    </div>
  );
}
