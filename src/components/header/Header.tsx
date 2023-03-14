import Menu from "./Menu"
import {MagnifyingGlass, FilmSlate, X} from 'phosphor-react'
import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

interface HeaderProps {
  findMovie: (data: Array<MoviesDataType>) => void
}

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

const Header = ({findMovie}: HeaderProps) => {
  const [search, setSearch] = useState('')
  const [inputExists, setInputExists] = useState(false)
  const navigate = useNavigate()

  function handleSearch(e: {key: string}) {
    if (e.key === 'Enter'){
        setSearch('')
        navigate('/search/' + search)
      }
  }  

  return (
    <header className="max-w-full h-1/10 p-6 border-b-2 border-zinc-400 top-0 left-0 right-0 z-10">
        <nav className="flex items-center justify-between">
            <div className="flex gap-4 justify-center items-center xl:w-1/2">
              <Link to='/'>
                <div className="flex items-center justify-around gap-4 text-zinc-800 font-extrabold text-base ">
                  <FilmSlate size={32} color={'#ffffff'}/>
                  <p className="hidden xl:flex text-white">MyMDB</p>
                </div>
              </Link>
                <Menu/>
            </div>
            <div className="flex gap-4 justify-center items-center rounded-xl xl:w-1/2">
                <div 
                  className="p-2 rounded-full bg-transparent hover:cursor-pointer hover:bg-white/20 bg-opacity-50 transition-all duration-500"
                  onClick={()=> setInputExists(true)}
                >
                  <MagnifyingGlass size={20} color={'#ffffff'}/>
                </div>
                {inputExists && (
                  <motion.input 
                  /* initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.01 }} */
                  initial={{ width: '0' }}
                  animate={{ width: '200px' }}
                  transition={{ duration: 0.01}}
                  value={search}
                  type="text" placeholder="Search" className="outline-none bg-transparent border-b-1  border-white text-white transition-all duration-300" 
                  onChange={(e) => setSearch(e.target.value)} 
                  onKeyDown={handleSearch}
                  onBlur={() => setInputExists(false)}
                  autoFocus
                />
                )}
            </div>
        </nav>
    </header>
  )
}

export default Header