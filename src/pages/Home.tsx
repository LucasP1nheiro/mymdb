import BestMovies from "../components/home/BestMovies"
import LatestReleases from "../components/home/LatestReleases"
import MostPopular from "../components/home/MostPopular"
import Upcoming from "../components/home/Upcoming"
import { motion } from "framer-motion"

const Home = () => {
  return (
    <motion.div 
      initial={{ x: '-100vw' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.7}}
      className="flex flex-col items-center md:items-start justify-center min-h-full min-w-screen gap-4 pb-20"
    >
      <h1 className="mt-20 md:mt-40 md:ml-60 text-white font-extrabold text-2xl md:text-4xl ">Top 20 movies of all time</h1>
      <BestMovies/>
      <h1 className="mt-20 md:ml-60 text-white font-extrabold text-2xl md:text-4xl ">Latest releases</h1>
      <LatestReleases/>
      <h1 className="mt-20 md:ml-60 text-white font-extrabold text-2xl md:text-4xl ">Most popular movies</h1>
      <MostPopular/>
      <h1 className="mt-20 md:ml-60 text-white font-extrabold text-2xl md:text-4xl ">Upcoming...</h1>
      <Upcoming/>
    </motion.div>
  )
}

export default Home