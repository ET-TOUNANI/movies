import React from 'react'
import './App.css';
import Header from './includes/Header/Header';
import Main from './includes/Main/Main'
const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

function App() {
  return (
    <div className="App">

      <Header />
      <Main />
      
    </div>
  );
}


export default App;
