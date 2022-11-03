import './App.css';
import React  from 'react'
import Row from '../src/Row'
import requests from './Service/Request'
import Banner from './Components/Banner';
import NavBar from './Components/NavBar';

let App = () => {
     // set up Netflix front page row and fetch movie requests, pass title and as props to row.js
  return (
      <React.Fragment>
      
             <div className='app'>
                 <NavBar/>
                 <Banner/>
                 <Row title="NETFLIX ORIGINALS" 
                 fetchUrl={requests.fetchNetflixOriginals}
                   isLargeRow={true}
                  />
                 <Row title="Trending Now" fetchUrl={requests.fetchTrending}/>
                 <Row title="Top Rated" fetchUrl={requests.fetchTopRated}/>
                 <Row title="Action Movies" fetchUrl={requests.fetchActionMovies}/>
                 <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies}/>
                 <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}/>
                 <Row title="Romance Movies" fetchUrl={requests.fethRomanceMovies}/>
                 <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries}/>
             </div>
      </React.Fragment>
  )
}

export default App;
