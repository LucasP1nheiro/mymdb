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
    <header className="max-w-full h-1/10 p-3 md:p-6 shadow-2xl inset-0 z-10">
        <nav className="flex items-center justify-between lg:px-36 xl:px-72">
          <div className="hidden md:flex gap-4 justify-center items-center">
              <Link to='/'>
                <div className="flex items-center justify-around gap-4 text-zinc-800 font-extrabold text-base ">
                  <FilmSlate size={32} color={'#ffffff'}/>
                  <p className="hidden xl:flex text-white">MyMDB</p>
                </div>
              </Link>
                <Menu/>
            </div>
            {!inputExists && (
              <div className="flex md:hidden gap-4 justify-center items-center">
              <Link to='/'>
                <div className="flex items-center justify-around gap-4 text-zinc-800 font-extrabold text-base ">
                  <FilmSlate size={32} color={'#ffffff'}/>
                  <p className="hidden xl:flex text-white">MyMDB</p>
                </div>
              </Link>
                <Menu/>
            </div>
            )}
            <div className="flex gap-4 justify-center items-center rounded-xl">
                <div 
                  className="p-2 rounded-full bg-transparent hover:cursor-pointer hover:bg-white/20 bg-opacity-50 transition-all duration-500"
                  onClick={()=> setInputExists(true)}
                >
                  {inputExists ? <X size={20} color={'#ffffff'}/> : <MagnifyingGlass size={20} color={'#ffffff'}/>}
                </div>
                {inputExists && (
                  <motion.input 
                  initial={{ width: '0' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.01}}
                  value={search}
                  type="text" 
                  placeholder="Search" 
                  className="outline-none bg-transparent border-b-1 border-white text-white transition-all duration-300" 
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