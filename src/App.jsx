import MovieList from "./components/movieList";
import MovieDetails from "./components/movieDetails";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Favourite from "./components/favourites";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { init } from "./store/favourite";
const Lazy = lazy(() => import("./components/lazy"));
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const persistData = localStorage.getItem("fav");
    if (persistData) {
      dispatch(init(JSON.parse(persistData)));
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie-detail/:movieId" element={<MovieDetails />} />
        <Route path="/favourite" element={<Favourite />} />
        <Route path="*" element={<h1>Page not found</h1>} />
        <Route
          path="/lazy"
          element={
            <Suspense fallback="Loadingg...">
              <Lazy />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
