import axios from 'axios'
import { ArrowCircleUp, CaretRight, Divide, Star, UsersThree } from 'phosphor-react'
import { useEffect, useRef, useState } from 'react'
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


 const Top100Movies = () => {
    const [data, setData] = useState<MoviesDataType[]>([])
    const [render, setRender] = useState(0)
    const [hoveredId, setHoveredId] = useState<number | null>(null)
    const [isVisible, setIsVisible] = useState(false)
    const prevScrollPos = useRef(0)


    const goTop = () => {
        window.scroll(0, 0)
    }

    useEffect(() => {
        const toggleVisibility = () => {
          const currentScrollPos = window.pageYOffset;
    
          if (currentScrollPos > 50 && currentScrollPos > prevScrollPos.current) {
            setIsVisible(true)
          } else {
            setIsVisible(false)
          }
    
          prevScrollPos.current = currentScrollPos
        };
    
        window.addEventListener("scroll", toggleVisibility)
    
        return () => window.removeEventListener("scroll", toggleVisibility)
      }, [isVisible])

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


    return (
        <div className='min-h-full w-full'>
            <motion.div 
                className='text-center text-white text-3xl md:text-5xl font-extrabold py-8 '
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6}}
            >
                <h1>Top 100 movies of all time</h1>
            </motion.div>
            {data.map((movie, i)=>(
                <div key={movie.id}>
                    <motion.div 
                            className={i % 2 === 0 ? 
                                'min-h-full h-full md:h-1/6 w-full py-4 px-6 flex flex-col md:flex-row gap-5 md:gap-0 justify-center items-center bg-gradient-to-br from-white/5 to-white/10 backdrop-opacity-50 shadow-xl' : 
                                'min-h-full h-full md:h-1/6 w-full py-4 px-6 flex flex-col md:flex-row gap-5 md:gap-0 justify-center items-center shadow-xl'
                            }
                            initial={{ x: '-100vw' }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1}}
                        >   
                            <Link to={'/movie/' + movie.id}>
                                <h1 onMouseEnter={() => setHoveredId(movie.id)} className='text-2xl text-cyan-300 flex md:hidden min-h-0 hover:cursor-pointer'>{movie.title}</h1>
                            </Link>
                            <Link to={'/movie/' + movie.id} className='flex flex-col justify-center gap-10'>
                                <img src= {imageURL + movie.poster_path} alt="movie-poster" className="w-full h-full lg:w-44 lg:h-64 rounded-sm cursor-pointer hover:brightness-50 transition-all duration-300 hover:scale-95"/>
                                <div className='w-full hidden md:flex lg:hidden justify-around text-white'>
                                    <span className='flex items-center justify-start gap-2 md:gap-4'>
                                        <Star size={32} weight='fill' fill='yellow' className='h-6 md:h-auto'/>
                                        <p className='text-xl'>{movie.vote_average}</p>
                                    </span>
                                    <span className='md:flex items-center justify-start gap-4 hidden'>
                                        <UsersThree size={32} weight='fill' fill='#fa601e'/>
                                        <p className='text-xl'>{movie.popularity}</p>
                                    </span>
                                </div>
                            </Link>
                            <div className='flex flex-col md:flex-row text-white md:px-20 md:pr-20 gap-10 w-full justify-around'>
                                    <div className='w-full md:w-1/2 flex md:hidden lg:flex md:flex-col justify-around'>
                                        <span className='flex items-center justify-start gap-2 md:gap-4'>
                                            <Star size={32} weight='fill' fill='yellow' className='h-6 md:h-auto'/>
                                            <p className='text-xl'>{movie.vote_average}</p>
                                        </span>
                                        <p className='text-xl md:text-base flex md:hidden'>Release date: {movie.release_date.slice(0,4)}</p>
                                        <span className='md:flex items-center justify-start gap-4 hidden'>
                                            <UsersThree size={32} weight='fill' fill='#fa601e'/>
                                            <p className='text-xl'>{movie.popularity}</p>
                                        </span>
                                        <span className=' items-center justify-start gap-4 hidden lg:flex'>
                                            {movie.genre_ids.map((genre, i) => i < 2 && 
                                                (<p key={i} className='text-xl border-2 border-zinc-600 rounded-2xl text-center px-2'>{Object(possibleGenres)[genre]}</p>)
                                            )}
                                        </span>
                                    </div>
                                <div className='w-full xl:w-1/2 h-full min-h-full min-w-1/2 flex flex-col justify-around md:gap-10'>
                                        <div 
                                            onMouseLeave={() => setHoveredId(null)} 
                                            className= 'w-fit flex items-center justify-start gap-4'
                                        >
                                            <Link to={'/movie/' + movie.id} className='flex items-center w-fit'>
                                                <h1 onMouseEnter={() => setHoveredId(movie.id)} className='text-3xl lg:text-2xl text-cyan-300 hidden md:flex min-h-0 hover:cursor-pointer'>{movie.title}</h1>
                                                {(movie.id === hoveredId) && (
                                                    <motion.div 
                                                        initial={{ x: '0%', opacity: 0}}
                                                        animate={{ x: '30%', opacity: 1}}
                                                        transition={{ duration: 0.7}}
                                                        className='flex items-center justify-center text-cyan-300'
                                                    >
                                                        <p>See more</p>
                                                        <CaretRight size={20} color="#00ffff" weight="light"/>
                                                    </motion.div>
                                                )}  
                                            </Link>                                 
                                        </div>
                                    <p className='text-base hidden md:flex'>{movie.overview}</p>
                                    <p className='text-base hidden md:flex'>Release date: {movie.release_date.slice(0,4)}</p>
                                </div>
                            </div>
                        </motion.div>
                </div>
            ))}
            {isVisible && 
                <motion.div 
                    initial={{y: '100vh'}}
                    animate={{y: '0%'}}
                    transition={{duration: 1}}
                    className='fixed bottom-5 right-5 hover:cursor-pointer hover:-translate-y-1 transition-all duration-300'
                >
                    <ArrowCircleUp size={32} color="#00ffff" weight="fill" onClick={goTop}/>
                </motion.div>
            }
            
        </div>
    )
    }

export default Top100Movies