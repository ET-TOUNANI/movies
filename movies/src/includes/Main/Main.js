import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './main.css';
import './header.css';
const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";


function getClassByRate(vote) {
  if (vote >= 8) {
      return "green";
  } else if (vote >= 5) {
      return "orange";
  } else {
      return "red";
  }
}

function Main() {
  const [movies , setMovies]=useState([]);
  const [movieFind , setMovieFind] = useState(" ")//for search

  let searchMovie = event=>{
    setMovieFind(event.target.value)
  }

  //first load of website
  useEffect(()=>{
      axios.get(APIURL).then(res=>{
        setMovies(res.data.results);
      },[])
  },[])
  // search of a film 
  useEffect(()=>{
    let searchFilm=SEARCHAPI+movieFind;
      axios.get(searchFilm).then(res=>{
        if(res.data.results.length>0){
          console.log(res.data.results.length);
          setMovies(res.data.results);
        }         
        else{
          setMovies([]);
        }   
      },[])
  },[movieFind])// don't forget this

  
  return (
    <div>
      <div className="App-header" >
        <a className="Header-link " target="_blank" href="https://github.com/ET-TOUNANI/movies">

        <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" className="octicon octicon-mark-github v-align-middle">
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
      </svg>
      </a>
        <input type="text" name="search" onChange={searchMovie}  id="search" placeholder='Search ...'/>
      </div>
      <div className='Main'>
        {
        
          movies.map(movie=>{
            const { poster_path, title, vote_average, overview } = movie;
            return (
            <div key={movie.id} className="movie">
                    <img src={IMGPATH + poster_path} alt={title} />
                    <div className="movie-info">
                        <h3>{title}</h3>
                        <span className={getClassByRate(
                        vote_average
                        )}>{vote_average}</span>
                    </div>
                    <div className="overview">
                        <h3>Overview:</h3>
                        {overview}
                    </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Main