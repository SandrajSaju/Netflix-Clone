const axios = require("axios");
require("dotenv").config();

exports.handler= async (event)=>{
    try{
        const genreId=event.queryStringParameters;
        const {data}=await axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId.id}&api_key=${process.env.TMDB_API_KEY}`);
        return{
            statusCode:200,
            body:JSON.stringify(data)
        }
    }catch(e){
        return{
            statusCode:500,
            body:e.toString()
        }
    }
};