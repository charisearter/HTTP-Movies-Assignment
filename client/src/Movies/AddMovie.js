import React, {useState} from 'react'
import axios from 'axios'

const AddMovie = () => {

  const [addMovie, setAddMovie] =useState({
    title: '',
    director: '',
    metascore: '',
    actors: ''
  });


  const onChange = e => {
    setAddMovie({
      ...addMovie,
      [e.target.name]: e.target.value,
    });
    console.log(addMovie)
  };

  const onSubmit = (e) => {
    axios
      .post(`http://localhost:5001/api/movies/`, add)
      .then((res) => {
        props.history.push("/");
      })
      .catch((err) => console.log(err));
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>{addMovie.title}</h1>
      <p>{addMovie.director}</p>
      <p>{addMovie.metascore}</p>
      <p>{addMovie.stars}</p>
      <input
        name='title'
        placeholder='Title'
        value={addMovie.title}
        onChange={onChange}
      />
      <input
        name='director'
        placeholder='Director'
        value={addMovie.director}
        onChange={onChange}
      />
      <input
        name='metascore'
        placeholder='Metascore'
        value={addMovie.metascore}
        onChange={onChange}
      />
      <input
        name='stars'
        placeholder='Stars'
        value={addMovie.stars}
        onChange={onChange}
      />
    </form>
  );
};


export default AddMovie
