"use client";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import useSearchStore from "@/store/useSearchStore";

export default function Header() {
  const search = useSearchStore((state) => state.keyword);
  const setSearch = useSearchStore((state) => state.setKeyword);

  return (
    <header className='z-100 fixed top-0 left-0 right-0 py-2 px-4 bg-gray-900 flex items-center justify-between h-14'>
      <nav className='flex gap-4'>
        <div className='text-red-500 text-2xl font-bold'>TMDBFLIX</div>
        <ul className='flex items-center text-white gap-4'>
          <li>Movies</li>
          <li>Dramas</li>
        </ul>
      </nav>

      <div className='w-full max-w-72 flex items-center gap-2 border border-white rounded-md px-2 text-white bg-transparent'>
        <Search className='text-gray-400' size={18} />
        <Input
          type='text'
          placeholder='Search Movies'
          className='flex-1 border-0 outline-none bg-transparent'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </header>
  );
}
