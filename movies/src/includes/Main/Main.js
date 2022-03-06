import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './main.css';
const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
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
  
  useEffect(()=>{
      axios.get(APIURL).then(res=>{
        setMovies(res.data.results);
      },[])
  },[])
  return (
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
  )
}

export default Main