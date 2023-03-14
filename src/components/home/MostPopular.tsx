import {CaretLeft, CaretRight} from 'phosphor-react'
import axios from "axios"
import { useEffect, useState } from "react"
import HomePageCards from './HomePageCards'
import { Carousel } from '@mantine/carousel'
import { motion as m } from 'framer-motion'

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

const MostPopular = () => {
  const [data, setData] = useState(Array<MoviesDataType>)
  const [hover, setHover] = useState(false)
  const imageURL = "https://image.tmdb.org/t/p/w500/"

  useEffect(() => {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US&page=1')
    .then(response=> setData(response.data.results))
  }, [])

  return (
    <div className="flex items-center justify-center w-full"> 
    <Carousel
      withIndicators
        slideSize="20%"
        slideGap="md"
        containScroll= "trimSnaps"
        /* breakpoints={[
          { maxWidth: 'md', slideSize: '50%' },
          { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
        ]} */
        previousControlIcon={ hover && (
          <m.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 1}}
          >
            <CaretLeft size={50} weight='regular' color='#ffffff'/>
          </m.div>
        )}
        nextControlIcon={hover && (
          <m.div
            initial={{ opacity: 0}}
            animate={{ opacity: 1}}
            transition={{ duration: 1}}
          >
            <CaretRight size={50} weight='regular' color='#ffffff'/>
          </m.div>
        )}
        align="start" 
        className="w-5/6 h-3/5 mt-6 flex px-20 pt-2 gap-3 z-0 justify-center items-center"
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    >
      {data.map((movie)=>(
        <Carousel.Slide><HomePageCards movie={movie} /></Carousel.Slide>
      ))}
    </Carousel>
    </div>
  )
}

export default MostPopular