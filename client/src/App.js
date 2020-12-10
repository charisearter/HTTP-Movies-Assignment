import React, { useState, useEffect, Fragment } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovieForm from './Movies/UpdateMovieForm';

const App = () => {
  const [savedList, setSavedList] = useState([]); //saved List
  const [movieList, setMovieList] = useState([]); //movie List
  const [refresh, setRefresh] = useState(true); // refresh

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response))
      .finally(() => {
        setRefresh(false)
      })
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, [refresh]); //add refresh dependency

  return (
    <Fragment>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} getMovieList={getMovieList} />
      </Route>

      <Route path='/update-movies/:id'>
        <UpdateMovieForm setMovieList={setMovieList} getMovieList={getMovieList} setRefresh={setRefresh} />
      </Route>

    </Fragment>
  );
};

export default App;
//Last resort... start and restart servers.
// Ctrl C to stop
// Best bet is to wait 5 minutes as well as close the window from npm start
//push this up to git first