import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './App.css';
import Section from './components/Section'
import MenuBar from './components/MenuBar';
import Feature from './components/Feature';

function App() {

  const [genres,setGenres]=useState(null)

  useEffect(()=>{
    const getGenres=async()=>{
      const {data}=await axios.get('/.netlify/functions/getGenres');
      setGenres(data.genres);
    };
    getGenres();
  },[])

  console.log(genres);

  return (
    <div className="App">
      <MenuBar />
      <Feature />
      <Section genre={{name:"Netflix Trending"}} functionName="getTrending" isLarge/>
      {genres?genres.map((genre)=> <Section genre={genre} key={genre.id} functionName="getMovies" />):null}
    </div>
  );
}

export default App;
