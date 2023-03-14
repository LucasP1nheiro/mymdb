import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Action from "../assets/action.svg"
import Animation from "../assets/Animation.svg"
import Adventure from "../assets/adventure.svg"
import Comedy from "../assets/comedy.svg"
import Crime from "../assets/crime.svg"
import Documentary from "../assets/documentary.svg"
import Drama from "../assets/drama.svg"
import Family from "../assets/family.svg"
import Fantasy from "../assets/fantasy.svg"
import History from "../assets/history.svg"
import Horror from "../assets/horror.svg"
import Mistery from "../assets/mistery.svg"
import Music from "../assets/music.svg"
import Romance from "../assets/romance.svg"
import ScienceFiction from "../assets/scienceFiction.svg"
import Thriller from "../assets/thriller.svg"
import TvMovie from "../assets/tvMovie.svg"
import War from "../assets/war.svg"
import Western from "../assets/western.svg"
import { motion } from 'framer-motion'

interface GenresProps{
  changeGenreId: (id: number) => void
}

interface GenreTypes{
    id: number,
    name: string
}

const Genres = ({changeGenreId}: GenresProps) => {
  const  [genres, setGenres] = useState(Array<GenreTypes>)  
  const pictureArray = [Action, Adventure, Animation, Comedy, Crime, Documentary, Drama, Family, Fantasy, History, Horror, Music, Mistery, Romance, ScienceFiction, TvMovie, Thriller, War, Western]
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&')
    .then(response => setGenres(response.data.genres))
  }, []) 

  
  return (
    <motion.div 
      initial={{ x: '-100vw', opacity: 0}}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 pb-20 lg:px-10 xl:px-0 grid-flow-row gap-28 items-center justify-center min-h-full w-full"
    >
        {genres.map((genre, i)=>(
              <Link to={`/genres/${genre.id}`}>
                <div 
                className="h-48 min-w-1/3 w-auto bg-no-repeat bg-center bg-cover backdrop-opacity-50 shadow-xl text-white font-extrabold rounded-md hover:brightness-50 hover:scale-105 hover:z-2 cursor-pointer transition-all duration-500" 
                key={genre.id}
                style ={{backgroundImage: `url(${pictureArray[i]})`}}
                onClick={() => changeGenreId(genre.id)}
              >
                <div 
                className="h-full  w-full text-center flex items-center justify-center bg-gradient-to-br from-white/5 to-white/30 backdrop-opacity-50 shadow-xl p-2 text-white font-extrabold rounded-md uppercase text-3xl">
                  <h1>{genre.name}</h1>
                </div>
                </div>
              </Link>)
        )}
    </motion.div>
  )
}

export default Genres