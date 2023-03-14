import { Star } from "phosphor-react"
import { Link } from "react-router-dom"

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

  interface MovieCardProps {
    movie: MoviesDataType
  }

  const imageURL = "https://image.tmdb.org/t/p/w500/"

const HomePageCards = ({movie} : MovieCardProps) => {
    

  return (
    <div 
        className="h-96 w-[300px] md:w-[250px] shadow-xl bg-zinc-300/5 text-white font-extrabold hover:brightness-50 hover:scale-95 hover:z-2 cursor-pointer transition-all duration-500" 
        key={movie.id}
    >
          <Link to={'/movie/' + movie.id}>
            <img src= {imageURL + movie.poster_path} alt="" className="h-5/6 w-full"/>
            <div className="h-1/5 flex items-center justify-around">
              <h1 className="w-44">{movie.title}</h1>
              <div className='flex items-center gap-2'>
                <Star weight="fill" fill='yellow'/>
                <p>{(movie.vote_average).toFixed(1)}</p>
              </div>
            </div>
          </Link>
    </div>
  )
}

export default HomePageCards