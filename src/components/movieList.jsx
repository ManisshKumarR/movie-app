import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { onAdd, onRemove } from "../store/favourite";

const MovieList = () => {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fav = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

  console.log(fav, "fav");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("https://dummyapi.online/api/movies");
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovieData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); // No need to track any dependencies since fetchMovies should run only once

  const isFavourite = useCallback(
    (id) => !!fav[id], // Check if the movie is in favorites
    [fav]
  );

  const renderMovies = () => {
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (movieData.length === 0) return <div>No movies available.</div>;

    return movieData.map((it) => (
      <div key={it.id} className="movie">
        <Link to={`/movie-detail/${it.id}`}>
          <h1>{it.movie}</h1>
        </Link>
        {!isFavourite(it.id) ? (
          <button onClick={() => dispatch(onAdd(it))}>Add to Favourite</button>
        ) : (
          <button onClick={() => dispatch(onRemove(it))}>
            Remove from Favourite
          </button>
        )}
      </div>
    ));
  };

  return (
    <div className="main">
      <div className="movie-heading">
        <h1>Trending Movies</h1>
      </div>
      <div className="movie-list">{renderMovies()}</div>
    </div>
  );
};

export default MovieList;
