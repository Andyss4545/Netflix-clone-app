import React, { useEffect, useState } from "react";
import axios from "../Service/axiosService";
import requests from "../Service/Request";
import "../Banner.css";

let Banner = () => {
  const [movie, setMovie] = useState({
    film: [],
    errorMessage: "",
  });

  let { film } = movie;

  // use axiosservice to fetch NetflixOriginals from api requests
  // And get random Netflixorginals movies from request.data.results
  useEffect(() => {
    let fetchData = async () => {
      try {
        let request = await axios.get(requests.fetchNetflixOriginals);
        console.log(request.data.results);
        setMovie(() => ({
          film: request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ],
        }));

        return request;
      } catch (error) {
        setMovie(() => ({
          errorMessage: error,
        }));
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  // truncate or shorten the texts  in the overwiew in the netflix original tv shows

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <React.Fragment>
      {/* Add background image with url plus the path image */}
      <header
        className="banner"
        style={{
          background: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original${film?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner_contents">
          <h2 className="banner_title">
            {film?.title || film?.name || film?.original_name}
          </h2>

          <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>

          <h1 className="banner_description">
            {truncate(film?.overview, 150)}
          </h1>
        </div>
        <div className="banner_fadeBottom"></div>
      </header>
    </React.Fragment>
  );
};

export default Banner;
