import React, { useState, useEffect, Fragment } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import UpdateMovieForm from './Movies/UpdateMovieForm';
import Movie from "./Movies/Movie";
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]); 
  const [movieList, setMovieList] = useState([]); 
  const [refresh, setRefresh] = useState(true)

  const getMovieList = () => { 
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response))
      .finally(() => {
        setRefresh(false);
      })
  };

  const addToSavedList = movie => { 
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [refresh]);

  return (

    <Fragment>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList}  />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} movieList={movieList} setMovieList={setMovieList} />
      </Route>

      <Route path='/update-movies/:id'>
        <UpdateMovieForm setMovieList={setMovieList} getMovieList={getMovieList} setRefresh={setRefresh}  />
      </Route>
    </Fragment>
  );
};

export default App;
