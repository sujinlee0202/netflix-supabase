import { getMovie } from "@/actions/movieActions";
import UI from "./UI";

export async function generateMetadata({ params }: any) {
  // Next.js에서는 params를 await 해야 함
  const { id } = await params;
  const movie = await getMovie(Number(id));

  return {
    title: movie?.title,
    description: movie?.overview,
    openGraph: {
      images: [movie?.image_url],
    },
  };
}

export default async function MovieDetail({ params }: any) {
  const { id } = await params;
  const movie = await getMovie(Number(id));

  return (
    <main className='py-16 flex items-center bg-blue-50 w-full absolute top-0 bottom-0 left-0 right-0'>
      {movie ? <UI movie={movie} /> : <div>Movie does not exist</div>}
    </main>
  );
}
