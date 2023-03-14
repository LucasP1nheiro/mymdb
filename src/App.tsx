import './styles/index.css'
import axios from 'axios'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './components/header/Header'
import Home from './pages/Home'
import PossibleSearches from './pages/PossibleSearches'
import Genres from './pages/Genres'
import MoviePage from './pages/MoviePage'
import GenreResults from './pages/GenreResults'
import Top100Movies from './pages/Top100Movies'
import TvShowsPage from './pages/TvShowsPage'
import { motion } from 'framer-motion'



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

function App() {
  const [search, setSearch] = useState(Array<MoviesDataType>)
  const [moviesByGenre, setMoviesByGenre] = useState(0)

  function findMovie(data: Array<MoviesDataType>) {
    setSearch(data)
  }

  function changeGenreId(id: number) {
    setMoviesByGenre(id)
  }

  return (
    <motion.div 
      className='main min-w-screen min-h-screen'
      initial={{opacity:0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <BrowserRouter>
        <Header findMovie={findMovie}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/genres' element={(
            <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center w-5/6 p-4 mt-20'>
              <Genres changeGenreId={changeGenreId}/>
            </div>
            </div>
          )}/>
          <Route path='/top100' element={<Top100Movies/>}/>
          <Route path='/tvshow' element={<TvShowsPage/>}/>
          <Route path={'/genres/:id'} element={<GenreResults moviesByGenre={moviesByGenre}/>}/>
          <Route path='/search/:id' element={(
            <div className='flex flex-col items-center'>
              <div className='flex flex-col items-center w-5/6 p-4 mt-20'>
                <PossibleSearches/>
              </div>
            </div>
          )}/>
          <Route path='/:description/:id' element={<MoviePage/>}/>
        </Routes>
      </BrowserRouter>
    </motion.div>
  )
}

export default App
