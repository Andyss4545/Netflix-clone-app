const API_Key = "fcc1310f0986050039f0a384e52bd006"

const requests = {
       fetchTrending: `/trending/all/week?api_key=${API_Key}&language=en-US`,
       fetchNetflixOriginals: `/discover/tv?api_key=${API_Key}&with_network=213`,
       fetchTopRated: `/movie/top_rated?api_key=${API_Key}&language=en=US`,
       fetchActionMovies: `/discover/movie?api_key=${API_Key}&with_genres=28`,
       fetchComedyMovies: `/discover/movie?api_key=${API_Key}&with_genres=35`,
       fetchHorrorMovies: `/discover/movie?api_key=${API_Key}&with_genres=27`,
       fethRomanceMovies: `/discover/movie?api_key=${API_Key}&with_genres=10749`,
       fetchDocumentaries: `/discover/movie?api_key=${API_Key}&with_genres=99`
}


export default requests