import axios from "axios"
import { motion } from "framer-motion"
import { Star } from "phosphor-react"
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
    name: string,
    video: boolean,
    vote_average: number,
    vote_count: number
  }

  const imageURL = "https://image.tmdb.org/t/p/w500/"

const PossibleSearches = () => {
  const params = useParams()
  const [search, setSearch] = useState<MoviesDataType[]>([])
  
  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/search/multi?query=${params.id}&api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=1&sort_by=vote_average`)
    .then((response) => {
      setSearch(response.data.results)
    })
  }, [params.id])

  return (
    <motion.div 
      className="grid grid-cols-4 grid-flow-row gap-28 items-center justify-center min-h-full w-full pb-20"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      {search.map((movie)=>(
        <div className="h-96 min-w-1/3 w-auto w- bg-gradient-to-br from-white/10 to-white/20 backdrop-opacity-50 shadow-xl p-2 text-white font-extrabold rounded-xl hover:cursor-pointer hover:scale-110 transition-transform duration-300" >
          {movie.title && (
            <Link to={'/movie/' + movie.id}
            key={movie.id}
          >
          <img src= {imageURL + movie.poster_path} alt="movie-poster-image" className="h-4/5 w-full rounded-xl"/>
          <div className="h-1/5 flex items-center justify-around">
            <div>
              <h1>{movie.title}</h1>
              <h1>{movie.name}</h1>
            </div>
            <div className='flex items-center gap-2'>
              <Star weight="fill" fill='yellow'/>
              <p>{movie.vote_average}</p>
            </div>
          </div>
        </Link>
          )}
          {movie.name && (
            <Link to={'/tv/' + movie.id}
            key={movie.id}
          >
          <img src= {imageURL + movie.poster_path} alt="movie-poster-image" className="h-4/5 w-full rounded-xl"/>
          <div className="h-1/5 flex items-center justify-around">
            <div>
              <h1>{movie.title}</h1>
              <h1>{movie.name}</h1>
            </div>
            <div className='flex items-center gap-2'>
              <Star weight="fill" fill='yellow'/>
              <p>{movie.vote_average}</p>
            </div>
          </div>
        </Link>
          )}
          
        </div>
      ))}
    </motion.div>
  )
}

export default PossibleSearches