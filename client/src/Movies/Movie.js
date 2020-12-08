import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();
  
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const updateMovie = () => {
    push(`/update-movies/${params.id}`)
  }

  const deleteMovie = () => {
    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(res => {
      console.log(res)
      setMovieList(movieList.filter(item => item.id !== movie.id))
      //getMovieList();
      push('/') //push to the  movies page 
    })
    .catch(err => {
      console.log(err.message, 'Error in Movie component axios call')
    })
  }; //end delete Movefn

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...or movie was deleted</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>

      <div className='update-button' onClick={updateMovie}  >
        Update Movie
      </div>

      <div className='delete-button' onClick={deleteMovie}  >
        Delete Movie
      </div>
    </div>
  );
}

export default Movie;
//trying to see what is wrong with the delete function. There is no reason for it not to work
//Checked original project on other computer and works perfectly... So I am going page by page to see if I forgot some punctuation or a bracket somewhere