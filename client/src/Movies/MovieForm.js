import React, { Component } from 'react';
import Axios from 'axios';

class MovieForm extends Component {
  state= {
    id:'',
    title:'',
    director:'',
    metascore: 0,
    stars:[]
  }
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



render() {
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
 
      {this.state.stars.map(actor => {
        return <div> {actor} </div>; 
      })}
      
    </div>
  )
}

export default MovieForm;