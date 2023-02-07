import axios from "axios"
import { useEffect, useState } from "react"
import {CaretLeft, CaretRight, Star, TrendDown, TrendUp, UsersThree, VideoCamera} from 'phosphor-react'
import { Link, useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Carousel } from "@mantine/carousel"

interface GenreTypes{
    id: number,
    name: string
}

interface MoviesDataType {
    number_of_seasons: number,
    first_air_date: string,
    tagline: string,
    backdrop_path: string,
    budget: number,
    genres: Array<GenreTypes>,
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    revenue: number,
    runtime: number,
    title: string,
    vote_average: number,
    vote_count: number,
    name: string
  }

interface CastTypes{
    name: string
}

interface CrewTypes{
    name: string
}

  const imageURL = "https://image.tmdb.org/t/p/w500/"

const MoviePage = () => {
  const [data, setData] = useState<MoviesDataType>({
    number_of_seasons: 0,
    first_air_date: '',
    tagline: '', 
    backdrop_path:'', 
    budget: 0,
    genres: [{id:0 ,name: ''}], 
    id: 77, 
    original_language: '', 
    original_title: '', 
    overview: '', 
    popularity: 0, 
    poster_path: '', 
    release_date: '',
    revenue: 0,
    runtime: 0,
    title: '',
    vote_average: 0,
    vote_count: 0,
    name: ''
}) 



const [recomendedMovies, setRecomendedMovies] = useState(Array<MoviesDataType>)
const [cast, setCast] = useState<CastTypes[]>([{name: ''}, {name: ''}, {name: ''}])
const [crew, setCrew] = useState<CrewTypes[]>([{name:''}])
const params = useParams()

  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/${params.description}/${params.id}?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US`)
    .then(response => {
        setData(response.data)
    })
  }, [params.id])

 

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${data.id}/recommendations?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=1`)
    .then((response) => {
        setRecomendedMovies(response.data.results)
    })
  }, [data])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${data.id}/credits?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=1`)
    .then((response) => {
        setCast(response.data.cast)
        setCrew(response.data.crew)
    })
  }, [data])

  console.log(data.id)

  return (

    <div
    className="flex flex-col items-center gap-20 mt-10 min-h-full w-full text-white fixed">
        <motion.div 
            className="flex text-center justify-center min-h-full w-full "
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7}}
        >
            {data.title && (
                <h1 className="font-extrabold text-6xl font-">{data.title}</h1>
            )}
            {data.name && (
                <h1 className="font-extrabold text-6xl font-">{data.name}</h1>
            )}
        </motion.div>
        <div className="flex items-start justify-around">
            <div className=" min-w-1/3 w-1/5 mb-10 text-center flex flex-col gap-5">
                <motion.img 
                    src= {imageURL + data.poster_path} 
                    alt="" 
                    className="h-full w-full rounded-xl"
                    initial={{ x: '-100vw' }}
                    animate={{ x: 0 }}
                    transition={{ duration: 0.7}}
                />
                <motion.div 
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className="flex gap-5 items-center justify-around box-border"
                >
                    {data.genres.map((genre)=>(
                        <p key={genre.id} className="text-center px-2">{genre.name}</p>
                    ))}
                </motion.div>
                <div className="flex justify-around ">
                    <div className="flex items-center justify-between gap-2">
                        <Star size={32} weight='fill' fill="yellow"/>
                        <p>{(data.vote_average).toFixed(1)}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2 ">
                        <UsersThree size={32} weight='fill' fill="#fa601e"/>
                        <p>{data.popularity}</p>
                    </div>
                </div>
            </div>
            <motion.div 
                className="w-1/2 flex min-h-full flex-col gap-10 "
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
            >
                <div className="flex flex-col max-h-full gap-10 bg-gradient-to-br from-white/10 to-white/20 backdrop-opacity-50 shadow-xl p-4 rounded-xl">
                    {data.tagline && (<p className="text-2xl italic text-bold font-handLetter" >{data.tagline}</p>)}
                    {data.overview && (
                        <p className="text-lg">{data.overview}</p>
                    )}
                    <div className="flex justify-between">
                        {data.runtime && (<p className="text-lg">Duration: {data.runtime} min</p>)}
                        {data.number_of_seasons && (<p className="text-lg">Seasons: {data.number_of_seasons}</p>)}
                        {cast.length>2 && (<p className="text-lg">Actors: {cast[0].name}, {cast[1].name}, {cast[2].name}</p>)}
                        {cast.length<3 && (<p className="text-lg">Actors: {cast[0].name}, {cast[1].name}</p>)}
                    </div>
                    <div className="flex justify-between">
                        {data.release_date && (
                            <div className="flex items-center gap-4">
                            <VideoCamera size={32} weight='fill' fill="#fa0505"/>
                            <p className="text-lg">Release date: {data.release_date.slice(0,4)}</p>
                        </div>
                        )}
                        {data.first_air_date && (
                            <div className="flex items-center gap-4">
                                <VideoCamera size={32} weight='fill' fill="#fa0505"/>
                                <p className="text-lg">First live: {data.first_air_date.slice(0,4)}</p>
                            </div>
                        )}
                        {crew.length > 0 && (<p className="text-lg">Directed by: {crew[0].name}</p>)}
                    </div>
                    {typeof data.budget === 'number' && (
                        <div>
                        {(data.revenue - data.budget < 0)? (
                            <div className="flex items-center justify-start gap-2">
                                <TrendDown size={32} weight='fill' fill="red"/>
                             <p className="text-xl">U$$ {(data.revenue - data.budget).toLocaleString('en-US')}</p>
                            </div>
                        ):(
                            <div className="flex items-center justify-start gap-2">
                                <p className="text-xl">U$$ {(data.revenue - data.budget).toLocaleString('en-US')}</p>
                                <TrendUp size={32} weight='fill' fill="green"/>
                            </div>
                        )}
                    </div>
                    )}
                </div>
                <div className="min-h-full flex flex-col gap-4">
                    {recomendedMovies.length>0 && (<h1 className="text-2xl italic text-bold font-handLetter">More like this</h1>)}
                    <Carousel
                        withIndicators
                        slideSize="8%"
                        slideGap="lg"
                        containScroll= "trimSnaps"
                        /* breakpoints={[
                        { maxWidth: 'md', slideSize: '50%' },
                        { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                        ]} */
                        previousControlIcon={(<div className='bg-white z-50 opacity-100 rounded-full hover:scale-125 duration-300'><CaretLeft size={35} weight='regular' color='#27272a'/></div>)}
                        nextControlIcon={(<div className='bg-white z-50 opacity-100 rounded-full hover:scale-125 duration-300'><CaretRight size={35} weight='regular' color='#27272a'/></div>)}
                        align="start"  
                        className="flex h-60 px-16 pt-8"
                    >
                        {recomendedMovies.map((movie)=>(
                            <Carousel.Slide
                            className="h-10 min-w-1/8 bg-gradient-to-br from-white/10 to-white/20 backdrop-opacity-50 shadow-xl mx-2 px-2 pt-2 text-white font-extrabold rounded-xl cursor-pointer hover:scale-90 hover:z-2 hover:brightness-50 transition-all duration-300" 
                            >
                                <Link 
                                    key={movie.id}
                                    to={'/movie/' + movie.id}
                                >
                                    <img src= {imageURL + movie.poster_path} alt="movie-poster" className="h-4/5 w-full rounded-xl"/>
                                    <div className="h-1/5 flex items-center justify-around">
                                        <Star weight="fill" fill='yellow'/>
                                        <p>{(movie.vote_average).toFixed(1)}</p>
                                    </div>
                                </Link>
                            </Carousel.Slide>
                        ))}
                    </Carousel>
                </div>
            </motion.div>
        </div>
    </div>
  )
}
export default MoviePage