import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  useEffect(() => {
    fetchMovieHandler()
  }, [])

  async function fetchMovieHandler() {
    setIsLoading(true)
    setError(null)
    try {
      const resonse = await fetch('https://swapi.dev/api/films')
      if (!resonse.ok) {
        throw new Error("Something went wrong")
      }
      const data = await resonse.json()
      const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          };
        })
      setMovies(transformedMovies)
    } catch(error) {
      setError(error.message)
    }
    setIsLoading(false)
  }
  let content = <p> Found no movies</p>

  if (error) {
    content = <p>{error.message}</p>
  }
  if (isLoading) {
    content = <p>Loading...</p>
  }
  if (movies.length > 0) {
    content = <MoviesList movies= {movies} />
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
