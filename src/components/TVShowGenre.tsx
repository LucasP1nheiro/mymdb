import axios from 'axios'
import { CaretLeft, CaretRight, Star } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Carousel } from '@mantine/carousel'

interface GenreType {
    id: number,
    name: string
}

interface MoviesDataType {
    id: number,
    poster_path: string,
    name: string,
    vote_average: number,
  }

const TVShowGenre = ({id, name}: GenreType) => {
    const [show, setShows] = useState<MoviesDataType[]>([])
    const imageURL = "https://image.tmdb.org/t/p/w500/"
    const [hover, setHover] = useState(false)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/tv?&api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&with_genres=${id}&sort_by=popularity.desc`)
        .then(response => setShows(response.data.results))
    }, [])

  return (
        <motion.div 
            className="w-full md:w-5/6 h-full md:h-3/5 flex flex-col pt-5 md:py-9 md:px-8 gap-10 overflow-hidden z-0 items-start"
            initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ duration: 0.7}}
        >
            <h1 className='text-2xl md:text-5xl text-white pt-10 md:pt-20 ml-4 md:ml-20'>{name}</h1>
            <Carousel 
                className='w-full md:w-full h-3/5 mt-6 flex gap-3 z-0 justify-center items-center px-4 pt-20 md:px-20 md:pt-0'
                withIndicators
                slideSize="20%"
                slideGap="md"
                containScroll= "trimSnaps"
                previousControlIcon={ hover && (
                    <motion.div
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1}}
                      transition={{ duration: 1}}
                    >
                      <CaretLeft size={50} weight='regular' color='#ffffff'/>
                    </motion.div>
                  )}
                  nextControlIcon={hover && (
                    <motion.div
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1}}
                      transition={{ duration: 1}}
          
                    >
                      <CaretRight size={50} weight='regular' color='#ffffff'/>
                    </motion.div>
                  )}
                align="start" 
                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            >
                {show.map((show)=> (
                    <Carousel.Slide className='h-96 w-[400px] md:w-[250px] shadow-xl font-extrabold hover:brightness-50 hover:scale-95 hover:z-2 cursor-pointer transition-all duration-500'>
                        <Link
                        to={'/tv/' + show.id} 
                        className="h-72 w-[100px] md:min-w-1/8 shadow-xl text-white font-extrabold hover:brightness-50 hover:cursor-pointer transition-all duration-500" 
                        key={show.id}
                    >
                        <img src= {imageURL + show.poster_path} alt={`${show.name}-poster`} className="h-full w-full bg-cover bg-no-repeat"/>
                  </Link>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </motion.div>
  )
}

export default TVShowGenre