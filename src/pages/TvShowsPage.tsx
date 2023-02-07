import axios from "axios"
import { useEffect, useState } from "react"
import TVShowGenre from "../components/TVShowGenre"

interface GenreTypes {
    id: number,
    name: string
}

const TvShowsPage = () => {
    const [genres, setGenres] = useState<GenreTypes[]>([])

  useEffect(()=>{

    axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=c0ab09e8c5c085013b036d4c56c1d944&language=en-US')
    .then(response => setGenres(response.data.genres))
  }, [])  
    
  return (
    <div className="pb-20">
        {genres.map((genre, i)=>(
            <div key={genre.id} className="flex flex-col items-center justify-center min-h-full min-w-screen gap-4">
                <TVShowGenre id={genre.id} name={genre.name}/>
            </div>
        ))}
    </div>
  )
}

export default TvShowsPage