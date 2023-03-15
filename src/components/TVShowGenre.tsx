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
    <div className='w-full h-full md:h-3/5 flex flex-col pt-5 md:py-9 md:px-8 z-0'>
      <div className='flex flex-col items-center justify-center md:justify-start w-full'>
        <h1 className='w-5/6 md:w-5/6 text-start md:text-start text-2xl md:text-4xl text-white pt-10 md:pt-20 md:ml-40'>{name}</h1>
        <Carousel 
          withIndicators
          slideSize="20%"
          slideGap="md"
          containScroll= "keepSnaps"
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
          className="w-full md:w-5/6 h-3/5 mt-0 flex gap-10 z-0 justify-center items-center px-2 md:px-20 pt-2"
          onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        > 
          {show.map((show)=> (
            <Carousel.Slide>
              <div 
                className="h-full w-[250px] md:w-[250px] ml-4 md:ml-0 pt-2 md:pt-10 shadow-xl text-white font-extrabold hover:brightness-50 hover:scale-95 hover:z-2 cursor-pointer transition-all duration-500" 
                key={show.id}
              >
                <Link to={'/tv/' + show.id}>
                <img src= {imageURL + show.poster_path} alt={`${show.name}-poster`} className="h-full w-full bg-cover bg-no-repeat"/>
                </Link>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel >
    </div>
  </div>
  )
}

export default TVShowGenre