import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Axios from 'axios';

const initialValues = {

    id:'',
    title:'',
    director:'',
    metascore: '',
    stars:[]
  
};

//add stars function to add actors/actresses
addStars = () => {
  const { stars } = this.state;
  stars.push(this.state.actor);
  this.setState({ actor: '', stars })
};

//input Change function for input form
inputChange = e => {
  console.log(e.target.value);
  this.setState({ [e.target.name]: e.target.value })
};

// addMovie = () => {
//   const { stars, title, metaScore, director } = this.state;
//   const newMovie= { stars, title, metaScore, director };
//   const saveMovie = axios
//   .post('http://localhost:/api/movies', newMovie)
//   .then(res => {
//     this.props.history.push('/')
//   })
//   .catch(err => {
//     console.log(err.response.message)
//   })
// }
const UpdateMovieForm = (props) => {



  return(
    <div>
      <input 
        type='text' 
        placeholder='Movie Title' 
        value={this.state.title}
        onChange={this.inputChange}
        name='title'  
      />

<input 
        type='text' 
        placeholder='Director' 
        value={this.state.director}
        onChange={this.inputChange}
        name='director'  
      />

<input 
        type='text' 
        placeholder='Meta Score' 
        value={this.state.metaScore}
        onChange={this.inputChange}
        name='metaScore'  
      />

<input 
        type='text' 
        placeholder='Add actor(s)/ actress(es)' 
        value={this.state.actor}
        onChange={this.inputChange}
        name='actor'  
      />

      <button onClick={this.addStars}> Add Actor / Actress to List </button>
      {/* <button onClick={this.addMovie}> Save Movie </button> */}
      {this.state.stars.map(actor => {
        return <div> {actor} </div>; 
      })}
      
    </div>
  )
}

export default UpdateMovieForm;