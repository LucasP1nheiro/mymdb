import axios from 'axios'
import { CaretRight, Divide, Star, UsersThree } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'


interface MoviesDataType {
    tagline: string,
    backdrop_path: string,
    budget: number,
    genre_ids: Array<number>,
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
    vote_count: number
  }

  interface GenreType {
    [key: number]: string
  }

 const Top100Movies = () => {

    const possibleGenres = {
        28 : 'Action',
        12 : 'Adventure',
        16 : 'Animation',
        35 : 'Comedy',
        80: 'Crime',
        99: 'Documentary',
        18: 'Drama',
        10751: 'Family',
        14: 'Fantasy',
        36: 'History',
        27: 'Horror',
        10402: 'Music',
        9648: 'Mistery',
        10749: 'Romance',
        878: 'Science Ficiton',
        10770: 'TV Movie',
        53: 'Thriller',
        10752: 'War',
        37: 'Western'
      }  
    
  const [data, setData] = useState<MoviesDataType[]>([])
  const [render, setRender] = useState(0)
  const [titleSelected, setTitleSelected] = useState(false)
  
  if (render === 0) {
        axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=1')
        .then(response => {
            setData(response.data.results)
            axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=2')
            .then(response => {
                setData(data => data.concat(response.data.results))
                axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=3')
                .then(response =>{
                    setData(data => data.concat(response.data.results))
                    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=4')
                    .then(response => {
                        setData(data => data.concat(response.data.results))
                        axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=5')
                        .then(response => setData(data => data.concat(response.data.results)))
                    })
                })
            })
        })
      setRender(1)
  }

  const imageURL = "https://image.tmdb.org/t/p/w500/"

  console.log(data)

  return (
    <div className='min-h-full w-full'>
        <motion.div 
            className='text-center text-white text-2xl md:text-5xl font-extrabold py-8 '
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6}}
        >
            <h1>Top 100 movies of all time</h1>
        </motion.div>
        {data.map((movie, i)=>(
            <div key={movie.id}>
                {(i % 2 === 0) ? (
                    <motion.div 
                        className='max-h-1/6 h-1/6 w-full py-4 px-6 flex bg-gradient-to-br from-white/5 to-white/10 backdrop-opacity-50 shadow-xl'
                        initial={{ x: '-100vw' }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1}}
                    >
                        <Link to={'/movie/' + movie.id}>
                            <img src= {imageURL + movie.poster_path} alt="movie-poster" className="w-10 h-auto md:w-44 md:h-64 rounded-sm cursor-pointer hover:brightness-50 transition-all duration-300 hover:scale-95"/>
                        </Link>
                        <div className='flex flex-col md:flex-row text-white px-20 pr-20 gap-10 w-full justify-around'>
                            <div className='w-1/2 flex flex-col justify-around '>
                                <span className='flex items-center justify-start gap-4'>
                                    <Star size={32} weight='fill' fill='yellow'/>
                                    <p className='text-2xl'>{movie.vote_average}</p>
                                </span>
                                <span className='flex items-center justify-start gap-4'>
                                    <UsersThree size={32} weight='fill' fill='#fa601e'/>
                                    <p className='text-xl'>{movie.popularity}</p>
                                </span>
                                <span className='flex items-center justify-start gap-4'>
                                    {movie.genre_ids.map((genre, i) => (
                                        <p key={i} className='text-xl border-2 border-zinc-600 rounded-2xl text-center px-2'>{Object(possibleGenres)[genre]}</p>
                                    ))}
                                </span>
                            </div>
                            <div className='w-1/2 h-full min-h-full min-w-1/2 flex flex-col justify-around'>
                                    <div 
                                        onMouseLeave={() => setTitleSelected(false)} 
                                        className= 'w-full flex items-center justify-center gap-4'
                                    >
                                        <Link to={'/movie/' + movie.id}>
                                            <h1 onMouseEnter={() => setTitleSelected(true)} className='text-3xl min-h-0 hover:cursor-pointer'>{movie.title}</h1>
                                        </Link>
                                        {/* {titleSelected && (
                                            <Link to={'/movie/' + movie.id} className='absolute right-44 text-bold text-base text-cyan-300'>
                                                <motion.div 
                                                    initial={{ x: '-10px'}}
                                                    animate={{ x: '30px'}}
                                                    transition={{ duration: 0.5}}
                                                    className=' flex items-center justify-center'
                                                >
                                                    <p>See more</p>
                                                    <CaretRight size={20} color="#00ffff" weight="light"/>
                                                </motion.div>
                                            </Link>
                                        )}  */}                                     
                                    </div>
                                <p className='text-base hidden md:flex'>{movie.overview}</p>
                                <p className='text-base'>Release date: {movie.release_date.slice(0,4)}</p>
                            </div>
                        </div>
                    </motion.div>
                ): (
                    <motion.div 
                        className='max-h-1/6 h-1/6 w-full py-4 px-6 flex'
                        initial={{ x: '-100vw' }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1}}
                    >
                        <Link to={'/movie/' + movie.id}>
                            <img src= {imageURL + movie.poster_path} alt="" className="w-44 h-64 rounded-sm cursor-pointer hover:brightness-50 transition-all duration-300 hover:scale-95"/>
                        </Link>
                        <div className='flex text-white px-20 pr-20 gap-10 w-full justify-around'>
                            <div className='w-1/2 flex flex-col justify-around '>
                                <span className='flex items-center justify-start gap-4'>
                                    <Star size={32} weight='fill' fill='yellow'/>
                                    <p className='text-xl'>{movie.vote_average}</p>
                                </span>
                                <span className='flex items-center justify-start gap-4'>
                                    <UsersThree size={32} weight='fill' fill='#fa601e'/>
                                    <p className='text-xl'>{movie.popularity}</p>
                                </span>
                                <span className='flex items-center justify-start gap-4'>
                                    {movie.genre_ids.map((genre, i) => (
                                        <p key={i} className='text-xl border-2 border-zinc-600 rounded-2xl text-center px-2'>{Object(possibleGenres)[genre]}</p>
                                    ))}
                                </span>
                            </div>
                            <div className='w-1/2 h-full min-h-full min-w-1/2 flex flex-col justify-around'>
                                <div className='w-full flex items-center justify-cente'>
                                    <div 
                                        onMouseLeave={() => setTitleSelected(false)} 
                                        className= 'w-full flex items-center justify-center gap-4'
                                    >
                                        <Link to={'/movie/' + movie.id}>
                                            <h1 onMouseEnter={() => setTitleSelected(true)} className='text-3xl min-h-0 hover:cursor-pointer'>{movie.title}</h1>
                                        </Link>
                                        {/* {titleSelected && (
                                            <Link to={'/movie/' + movie.id} className='absolute right-44 text-bold text-base text-cyan-300'>
                                                <motion.div 
                                                    initial={{ x: '-10px'}}
                                                    animate={{ x: '30px'}}
                                                    transition={{ duration: 0.5}}
                                                    className=' flex items-center justify-center'
                                                >
                                                    <p>See more</p>
                                                    <CaretRight size={20} color="#00ffff" weight="light"/>
                                                </motion.div>
                                            </Link>
                                        )}  */}                                     
                                    </div>
                                </div>
                                
                                    <p className='text-base'>{movie.overview}</p>
                                    <p className='text-base'>Release date: {movie.release_date.slice(0,4)}</p>

                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        ))}
    </div>
  )
}

export default Top100Movies