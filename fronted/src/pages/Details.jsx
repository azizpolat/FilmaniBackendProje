import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { MdDelete} from "react-icons/md";
import { FaRegHeart, FaRegBookmark, FaRegStar } from "react-icons/fa";
import { BiCameraMovie } from "react-icons/bi";

function Details() {
  // SİLME BASARILI ISE ANASATFAYA YONLENDİRME
  const navigate = useNavigate();

  // 1) url'de param olan film idsini al
  const { id } = useParams();

  // 2) api'dan film verilerini al
  const { data, error, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: async () => {
      const response = await api.get(`/movies/${id}`);
      return response.data;
    },
  });

  const movie = data;
  console.log(data);
  console.log(movie);

  const r = movie ? +movie.rating : 0;

  const color = r > 9 ? "orange" : r > 7.5 ? "green" : r > 5 ? "blue" : "red";

  const handleDelete = () => {
    api
    .delete(`/movies/${movie.id}`)
    .then((res) => navigate("/"))
    .catch((err) => console.log("hataa", err));
  };

  return (
    <div className="p-10">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        movie && (
          <>
            <div>
              <div className="flex justify-end">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white p-2 rounded-md hover:bg-red-400"
                >
                  <MdDelete />
                </button>
              </div>

              <div className="flex flex-col gap-10 items-center md:flex-row">
                <div>
                  <img
                    className="rounded-md"
                    src="https://picsum.photos/250/400"
                    alt="poster"
                  />
                </div>

                <div className="flex flex-col gap-10">
                  {/* başlık */}
                  <h1 className="text-3xl font-semibold">
                    {movie.title}
                    <span>({movie.year})</span>
                  </h1>
                  {/* skor */}
                  <p>
                    <span className="font-semibold me-3">İzleyici Skoru:</span>
                    <span
                      style={{ background: color }}
                      className="p-2 rounded-full text-white font-semibold"
                    >
                      {movie.rating}
                    </span>
                  </p>

                  <div className="flex gap-5">
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <FaRegHeart />
                    </button>
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <FaRegBookmark />
                    </button>
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <FaRegStar />
                    </button>
                    <button className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700">
                      <BiCameraMovie />
                    </button>
                  </div>

                  {/* kategoriler */}
                  <div className="flex gap-5 items-center">
                    <p className="font-semibold">Kategoriler:</p>
                    <p className="flex gap-3">
                      {movie.genre.map((genre, index) => (
                        <span key={index} className="bg-yellow-600 py-1 px-3 rounded-full text-white">
                          {genre}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default Details;
