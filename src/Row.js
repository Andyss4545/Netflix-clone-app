import React, { useEffect, useState } from "react";
import axios from './Service/axiosService'
import './Row.css'
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer"

let base_URL = "https://image.tmdb.org/t/p/original"

let Row = ({title, fetchUrl, isLargeRow}) => {
      // title, fetchURL , isLargeRow are all props brought from App.js
      const [trailerUrl, seTrailerUrl] = useState("")
       
      // set the movies state with empty array 
      const [theMovies, setTheMovies] = useState({
             movies: [],
             errorMessage: ""
      })

      const {movies} = theMovies

      // A snippet of code which runs on a specific condition

//
      useEffect(() =>{
        let fetchData = async() => {
          // grab movie data from the api database
              try{
                const request = await axios.get(fetchUrl)
                setTheMovies(() => ({
                     movies: request.data.results
                }))

              }catch(error){
                   setTheMovies(() => ({
                        errorMessage: error
                   }))
              }
        }
         fetchData()
         // eslint-disable-next-line
      },[fetchUrl])

// set up youtube react to play trailer video
      const opts = {
          height: '390',
          width: '100%',
          playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          },
      }

      // set trailer url to play each movies trailer 
      const handleClick = (movie) => {
             if(trailerUrl){
                seTrailerUrl("")
             }else{
                   movieTrailer(movie?.title || movie?.name || movie?.source).then((url) => {
                        const urlParams = new URLSearchParams(new URL(url).search)
                        seTrailerUrl(urlParams.get("v"))
                   }).catch((error) => {
                         console.log(error)
                   })
             }
      }

     return(
        <React.Fragment>
            {/* <pre>{JSON.stringify(films)}</pre> */}
            <div className="row">
                <h2>{title}</h2>
                 <div className={"row_posters"}>
                        {
                         // show th length and  map throug movies array to display movies from api
                             movies?.length > 0 && movies.map((movie) => {
                                  return (
                                        <img 
                                        // call the handleClick  function and passed movie parameter in it to click
                                        onClick={() => handleClick(movie)}
                                        key={movie.id} 
                                        className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                                        src={`${base_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                                        alt={movie.name} />
                                  ) 
                             })
                        }
                 </div>
                 {/* set up youtube id and pass the trailerUrl state */}
                 {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
            </div>
        </React.Fragment>
     )
}

export default Row