import React, { useState, useEffect, Fragment } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovieForm from "./Movies/UpdateMovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);//for saved list
  const [movieList, setMovieList] = useState([]);//for movie list
  const [refresh, setRefresh] = useState(true) //refrsh 

  const getMovieList = () => {//display movie list
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response))
      .finally(() => {
        setRefresh(false);
      })
  };

  const addToSavedList = movie => { //add to save
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {//display the movie list
    getMovieList();
  }, [refresh]);

  return (
    <Fragment>
      
      <SavedList list={savedList} /> 

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
      
      <Route path="/update-movies/:id">
        <UpdateMovieForm setMovieList={setMovieList} getMovieList={getMovieList}  setRefresh={setRefresh} />
      </Route>
      
    </Fragment>
  );
};

export default App;
