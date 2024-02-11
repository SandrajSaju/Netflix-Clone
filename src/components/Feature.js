import React,{useEffect,useState} from 'react'
import '../styles/Feature.css'
import axios from 'axios'
import Youtube from 'react-youtube'

const Feature = () => {
    const [movie,setMovie] = useState(null);
    const [trailer,setTrailer] = useState(null);
    const [playButton,setPlayButton]=useState("Play")

    const BASE_URL = "https://image.tmdb.org/t/p/original";

    useEffect(()=>{
        const getFeature=async()=>{
            const {data} = await axios.get("/.netlify/functions/getMovies");
            const rand = Math.floor(Math.random() * data.results.length);
            setMovie(data.results[rand]);
        }
        getFeature();
    },[]);

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                setTrailer(null);
            }           
        });
        return window.removeEventListener("scroll",null)
    },[])

    const truncate=(str,n)=>{
        return str.length>n?str.substr(0,n-1)+"...":str;
    }
    
    const handlePlay = async(id) => {
        if(trailer){
            setTrailer(null);
            setPlayButton("Play")
        }else{
            const {data} = await axios.get(`/.netlify/functions/getTrailer?id=${id}`);
            setTrailer(data);
            setPlayButton("Stop")
        }
    }

  return (
    <div className="Feature-container"
    style={
        {   backgroundImage:movie?`url(${BASE_URL}/${movie.backdrop_path})`:null,
            objectFit:"contain",
            backgroundPosition:"center center"
        }
            }>
                <div className="Feature-content" >
                    <h1 className="Feature-title">{movie && movie.title}</h1>
                    <div className='Feature-buttons'>
                        <button className='Feature-button' onClick={()=>handlePlay(movie.id)}>Play</button>
                        <button className='Feature-button'>More Info</button>
                    </div>
                        <p className="Feature-description">{movie && truncate(movie.overview,150)}</p>
                </div>
                <div className="Feature-mask">

                </div>
                {trailer && (
        <div className="Feature-trailer">
          <Youtube
            videoId={trailer}
            opts={{
              height: "500px",
              width: "100%",
              playerVars: { autoplay: 1 },
            }}
            className="Feature-trailer"
          />
        </div>
      )}

    </div>
  )
}

export default Feature