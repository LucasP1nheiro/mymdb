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

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/discover/tv?&api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&with_genres=${id}&sort_by=popularity.desc`)
        .then(response => setShows(response.data.results))
    }, [])

    console.log(show)
  return (
        <motion.div 
            className="w-5/6 h-3/5 flex flex-col py-9 px-8 gap-3 overflow-hidden z-0 items-center"
            initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ duration: 0.7}}
        >
            <h1 className='text-5xl text-white font-handLetter py-5'>{name}</h1>
            <Carousel 
                className='flex w-full gap-8 px-20'
                withIndicators
                slideSize="20%"
                slideGap="md"
                containScroll= "trimSnaps"
                /* breakpoints={[
                { maxWidth: 'md', slideSize: '50%' },
                { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
                ]} */
                previousControlIcon={(<div className='bg-white z-50 opacity-100 rounded-full hover:scale-125 duration-300'><CaretLeft size={50} weight='regular' color='#2f2f2a'/></div>)}
                nextControlIcon={(<div className='bg-white z-50 opacity-100 rounded-full hover:scale-125 duration-300'><CaretRight size={50} weight='regular' color='#2f2f2a'/></div>)}
                align="start" 
            >
                {show.map((show)=> (
                    <Carousel.Slide className='hover:scale-90 transition-all duration-500'>
                        <Link
                        to={'/tv/' + show.id} 
                        className="h-72 min-w-1/8 bg-gradient-to-br from-white/10 to-white/20 backdrop-opacity-50 shadow-xl text-white font-extrabold rounded-xl hover:brightness-50 hover:cursor-pointer transition-all duration-500" 
                        key={show.id}
                    >
                        <img src= {imageURL + show.poster_path} alt={`${show.name}-poster`} className="h-full w-full rounded-xl"/>
                  </Link>
                    </Carousel.Slide>
                ))}
            </Carousel>
        </motion.div>
  )
}

export default TVShowGenre