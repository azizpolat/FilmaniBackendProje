import { Link } from 'react-router-dom';

function Card({ movie, index }) {

  // resim uzerinde sayıların renk ayarlaması
  const r = +movie.rating;

  const color = r > 9 ? "orange" :r> 7.5 ? "green" : r> 5 ? "blue" : "red"
  return (
    <Link
      to={`/movie/${movie.id}`} // 'to' prop'u eklenmiştir
      className="border shadow p-3 rounded-md hover:bg-gray-200 cursor-pointer transition max-sm:flex max-sm:gap-5"
    >
      <div className="relative">
        <img
          className="rounded w-full max-w-[450px] max-h-[300px] object-cover max-sm:max-h-[150px]"
          src={`https://picsum.photos/500/70${index}`}
          alt="poster"
        />
        <span style={{background:color}} className="absolute right-[-10px] top-[-10px] font-semibold p-2 rounded-full text-white">
          {movie.rating}
        </span>
      </div>

      <div>
        <h3 className="font-bold text-2xl sm:text-lg mt-4 line-clamp-1">
          {movie.title}
        </h3>

        <div className="text-gray-400 flex gap-2">
          <p>{movie.year}</p>
          <p className="flex gap-2">
            {movie.genre.map((genre, i) => (
              <span key={i}>{genre}</span>
            ))}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Card;
