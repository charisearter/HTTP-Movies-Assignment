
//We are going to make it possible to update a movie's title, director, metascore, and stars (the actors/actresses).
// Done with thsi one...go back to App.js
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

// We have to make the initial values for the movies. Look at the serve.js

const initialValues = {
    id:'',
    title:'',
    director:'',
    metascore: 0, // I wonder if I can make this a number instead
    stars:[]
};

//make form
const UpdateMovieForm = (props) => {

    const { push } = useHistory();
    const { id } = useParams();
    const [ movieValues, setMovieValues ] = useState(initialValues);

    //useEffect for axios call
    useEffect(() => {
        axios
        // use backticks `` The ones next to the 1 and above the TAB
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            res.data.stars = res.data.stars.join(',')
            setMovieValues(res.data)
        })
        .catch(err => {
            console.log(err.message, 'Error in update axios call')
        });
    }, [id]); //this will be dependent onthe id of the movie

    //Make the onChange
    const onChange = e => {
        let name = e.target.name;
        let value = e.target.value

        setMovieValues({
            ...movieValues,
            [name]: value,
        });
    }; //ends onChange

    //Make onSubmit fn
    const onSubmit = e => {
        e.preventDefault();
        // Stars are split at the comma and returns stars as an array
        movieValues.stars = movieValues.stars.split(',');
        //Put axios call
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movieValues)
        .then(res => {
            setMovieValues(initialValues);
            props.getMovieList();
            push('/'); //goes to that component
            props.setRefresh(true);
        })
        .catch(err => {
            console.log(err.message, 'Error in update form onSubmit fn')
        });
    }; //ends onSubmit fn

    //Make the form first
    return (
        <div>
            <h2> Update Movie </h2>
            <form onSubmit={onSubmit}>
                <label> Movie Title: </label>
                <input 
                    type='text'
                    name='title'
                    onChange={onChange}
                    placeholder='Movie Title'
                    value={movieValues.title}
                />

                <label> Director: </label>
                <input 
                    type='text'
                    name='director'
                    onChange={onChange}
                    placeholder='Director(s)'
                    value={movieValues.director}
                />

                <label> Metascore: </label>
                <input 
                    type='text'
                    name='metascore'
                    onChange={onChange}
                    placeholder='Metascore'
                    value={movieValues.metascore}
                />

                <label> Stars: </label>
                <input 
                    type='text'
                    name='stars'
                    onChange={onChange}
                    placeholder='Stars'
                    value={movieValues.stars}
                />

                <button>Update Movie</button>
            </form>
        </div>
    );
};

export default UpdateMovieForm; // <-- Don't forget this!!


