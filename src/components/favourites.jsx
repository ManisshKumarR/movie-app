import { Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onRemove } from "../store/favourite";

const Favourite = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [rating, setRating] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fav = useSelector((state) => state.favorite);

  const dispatch = useDispatch();

  useEffect(() => {
    applyFilters();
  }, [fav, rating, searchQuery]);

  const applyFilters = () => {
    if (fav) {
      let data = Object.values(fav);

      if (rating === "Above9") {
        data = data.filter((it) => it.rating >= 9);
      } else if (rating === "Below9") {
        data = data.filter((it) => it.rating < 9);
      }

      if (searchQuery) {
        data = data.filter((it) =>
          it.movie.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      setFilteredData(data);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleRating = (val) => {
    setRating(val);
  };

  return (
    <>
      <div>
        <h1>Favourite</h1>
        <div className="fav-main">
          <div className="left-session">
            <div
              className={`rating ${rating === "" ? "active" : ""}`}
              onClick={() => handleRating("")}
            >
              All Rating
            </div>
            <div
              className={`rating ${rating === "Above9" ? "active" : ""}`}
              onClick={() => handleRating("Above9")}
            >
              Top Rated Movies
            </div>
            <div
              className={`rating ${rating === "Below9" ? "active" : ""}`}
              onClick={() => handleRating("Below9")}
            >
              Rated Below 9
            </div>
          </div>
          <div className="right-session">
            <div>
              <input onChange={handleChange} placeholder="Search movie" />
            </div>
            <div>
              <Table className="table-main" striped bordered hover>
                <thead>
                  <tr>
                    <th>Movie</th>
                    <th>Rating</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((it, index) => (
                    <tr key={index}>
                      <td>{it.movie}</td>
                      <td>{it.rating}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            dispatch(onRemove(it));
                          }}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourite;
