import axios from "axios"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

interface MoviesDataType {
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
  }

  interface IdType {
    moviesByGenre: number
  }

  interface GenreListTypes {
    id: number,
    name: string,
  }

const GenreResults = ({moviesByGenre}: IdType) => {  
  
  const [data, setData] = useState<MoviesDataType[]>([])
  const params = useParams()
  const [render, setRender] = useState(0)
  const [genreList, setGenreList] = useState<GenreListTypes[]>([])
  

    if (render === 0) {
      axios.get(`https://api.themoviedb.org/3/discover/movie?&api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=1&with_genres=${params.id}&sort_by=popularity.desc`)
       .then((response) => {
          setData(response.data.results)
          axios.get(`https://api.themoviedb.org/3/discover/movie?&api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=2&with_genres=${params.id}&sort_by=popularity.desc`)
          .then((response)=> {
            setData(data => data.concat(response.data.results))
            axios.get(`https://api.themoviedb.org/3/discover/movie?&api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=3&with_genres=${params.id}&sort_by=popularity.desc`)
            .then((response)=> {
              setData(data => data.concat(response.data.results))
            })
          })
       })
       setRender(1)
    }
    console.log(data)
    useEffect(()=>{
      axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&')
      .then(response => {
        setGenreList(response.data.genres)
      })    
    }, [])

    
  

  const imageURL = "https://image.tmdb.org/t/p/w500/"

  return (
    <motion.div 
      className="flex flex-col w-full items-center py-10 gap-10"
      initial={{ x: '-100vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      {genreList.map((genre)=>(
          params.id == genre.id.toString() && (
            <h1 
              key={params.id} 
              className="text-3xl lg:text-4xl xl:text-5xl text-white font-extrabold">{genre.name} Movies
            </h1>
          )
        )
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 pb-20 lg:px-10 xl:px-0 grid-flow-row gap-28 items-center justify-center min-h-full w-4/5">      
        {data.map((movie) => 
          (<Link to={'/movie/' + movie.id}
            className="h-48 min-w-1/3 w-auto bg-no-repeat bg-center bg-cover backdrop-opacity-50 shadow-xl text-white font-extrabold rounded-xl hover:brightness-50 hover:scale-105 hover:z-2 cursor-pointer transition-all duration-500" 
            key={movie.id}
            style ={{backgroundImage: `url(${imageURL + movie.backdrop_path})`}}
            /* onClick={() => handleClick({id: genre.id, name: genre.name})} */
          >
            <div 
            className="h-full  w-full text-center flex items-center justify-center bg-gradient-to-br from-white/5 to-white/30 backdrop-opacity-50 shadow-xl p-2 text-white font-extrabold rounded-xl uppercase text-3xl">
            </div>
              <div className="p-2">
                <h1 className="text-center">{movie.title}</h1>
              </div>
            </Link>)
        )}
    </div>
    </motion.div>
  )
}

export default GenreResults