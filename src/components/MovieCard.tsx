"use client";

import useFavoriteStore from "@/store/useFavoriteStore";
import { Heart } from "lucide-react";
import Link from "next/link";
import useLocalStorage from "@/hooks/useLocalstorage";

export default function MovieCard({ movie }: any) {
  const favorites = useLocalStorage(
    useFavoriteStore,
    (state) => state.favorites
  );
  const actions = useLocalStorage(useFavoriteStore, (state) => state.actions);

  const isFavorite = favorites.includes(movie.id);

  const toggleFavorite = (e: any) => {
    e.stopPropagation();

    if (isFavorite) {
      actions.removeFavorite(movie.id);
    } else {
      actions.addFavorite(movie.id);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className='col-span-1 relative'>
        <img src={movie.image_url} alt={movie.title} className='w-full' />
        <Link href={`/movies/${movie.id}`}>
          <div className='absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300'>
            <p className='text-xl font-bold text-white'>{movie.title}</p>
          </div>
        </Link>
      </div>
      <button
        className={`favorite-btn p-2 rounded-full hover:bg-muted transition-colors ${
          isFavorite ? "text-red-500" : "text-muted-foreground"
        }`}
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          fill={isFavorite ? "currentColor" : "none"}
          className='w-5 h-5'
        />
      </button>
    </div>
  );
}
