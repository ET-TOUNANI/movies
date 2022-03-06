import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './main.css';
const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

let main=null;

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
        
        const moviess=[res.data.results];
        console.log(moviess);
        setMovies(moviess);
      },[])
  },[])
  return (
    <div className='Main'>
      { main= document.querySelector('.Main')}
      
      {
       
        movies.map(movie=>{
          const { poster_path, title, vote_average, overview } = movie;

          const movieEl = document.createElement("div");
          movieEl.classList.add("movie");

          movieEl.innerHTML = `
              <img
                  src="${IMGPATH + poster_path}"
                  alt="${title}"
              />
              <div class="movie-info">
                  <h3>${title}</h3>
                  <span class="${getClassByRate(
                      vote_average
                  )}">${vote_average}</span>
              </div>
              <div class="overview">
                  <h3>Overview:</h3>
                  ${overview}
              </div>
          `;
             main.appendChild(movieEl);
             
        })
      }
    </div>
  )
}

export default Main