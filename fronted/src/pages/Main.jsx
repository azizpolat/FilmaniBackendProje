import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import Card from "../components/Card";

function Main() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () => api.get("/movies").then((res) => res.data),
  });

  console.log(data);

  return (
     <div>
      <Hero />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className="p-4 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data.movies.map((movie, key) => (
            <Card movie={movie} key={key} index={key} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Main;
