import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouteMatch } from 'react-router-dom'


const initialMovie = {
  title: '',
  director: '',
  metascore: '',
  stars: []
}

const UpdateMovie = props => {

  const [ movie, setMovie ] = useState( initialMovie )
  const match = useRouteMatch()

  useEffect( () => {
    const movieToUpdate = props.movies.find( movie => {
      console.log( 'Movie.id:', movie.id )
      console.log( 'match.params.id:', match.params.id )
      return movie.id === Number(match.params.id)
    })

    console.log( 'movieToUpdate', movieToUpdate )

    if ( movieToUpdate ) {
      setMovie( movieToUpdate )
    }
  }, [ props.movies, match.params.id ] )

  const changeHandler = e => {
    setMovie( { ...movie, [ e.target.name ]: e.target.value } )
    if( e.target.name === 'stars' ) {
      setMovie( { ...movie, stars: e.target.value.split( ',' )} )
    }
    console.log( 'Movie:', movie )
  }

  const handleSubmit = ( e ) => {
    e.preventDefault()
    axios
      .put( `http://localhost:5000/api/movies/${match.params.id}`, movie )
      .then( res => {
        console.log( '.put Res.data:', res.data )
        window.location.href = `/`
      })
      .catch( err => {
        console.log( 'Error:', err )
      })
  }

  const handleDelete = ( id ) => {
    axios
      .delete( `http://localhost:5000/api/movies/${match.params.id}` )
      .then( res => {
        console.log( '.put Res.data:', res.data )
      })
      .catch( err => {
        console.log( 'Error:', err )
      })
      window.location.href = `/`  
  }

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit = { handleSubmit }>
        <input
          type = 'text'
          name = 'title'
          onChange = { changeHandler }
          placeholder = 'Title'
          value = { movie.title }
        />
        <input
          type = 'text'
          name = 'director'
          onChange = { changeHandler }
          placeholder = 'Director'
          value = { movie.director }
        />
        <input
          type = 'number'
          name = 'metascore'
          onChange = { changeHandler }
          placeholder = 'Metascore'
          value = { movie.metascore }
        />
        <input
          type = 'text'
          name = 'stars'
          onChange = { changeHandler }
          placeholder = 'Stars'
          value = { movie.stars }
        />
        <button>Update Movie</button>
        <button onClick = { () => handleDelete( match.params.id ) }>Delort!</button>
      </form>
    </div>
  )
}

export default UpdateMovie