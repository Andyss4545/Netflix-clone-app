import React, { useEffect, useState } from "react";
import axios from './Service/axiosService'
import './Row.css'
import Youtube from "react-youtube"
import movieTrailer from "movie-trailer"

let base_URL = "https://image.tmdb.org/t/p/original"

let Row = ({title, fetchUrl, isLargeRow}) => {
      // title, fetchURL , isLargeRow are all props brought from App.js
      const [trailerUrl, seTrailerUrl] = useState("")

      const [movies, setMovies] = useState({
             films: [],
             errorMessage: ""
      })

      const {films} = movies

      // A snippet of code which runs on a specific condition

//
      useEffect(() =>{
        let fetchData = async() => {
              try{
                const request = await axios.get(fetchUrl)
                setMovies(() => ({
                     films: request.data.results
                }))

              }catch(error){
                   setMovies(() => ({
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

      // set trailer url to play each moviels trailer 
      const handleClick = (film) => {
             if(trailerUrl){
                seTrailerUrl("")
             }else{
                   movieTrailer(film?.title || film?.name || film?.source).then((url) => {
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
                             films?.length > 0 && films.map((film) => {
                                  return (
                                        <img 
                                        onClick={() => handleClick(film)}
                                        key={film.id} 
                                        className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
                                        src={`${base_URL}${isLargeRow ? film.poster_path : film.backdrop_path}`} 
                                        alt={film.name} />
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