import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios'; 

//First, make the initialValues, look at server.js to see what you need
const initialValues = {
    id:'',
    title:'',
    director:'',
    //I think we can make this a number, but for now leave as a string
    metascore:'', 
    stars:[]
};

const UpdateMovieForm = (props) => {
    const { push } = useHistory();
    const { id } = useParams();
    //set movie value state
    const [ movieValues, setMovieValues ] = useState(initialValues);

    //useEffect for axios.get to get the movies

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                res.data.stars = res.data.stars.join(',')
                setMovieValues(res.data)
            })
            .catch(err => {
                console.log(err.message, 'Error in GET in UpdateForm Component')
            });
    }, [id]); //add dependecy id

    // onChange fn
    const onChange = e => {
        let name = e.target.name;
        let value = e.target.value;

        //set Movie Values
        setMovieValues({
            ...movieValues,
            [name]: value,
        });
    };

    //make onSubmit
    const onSubmit = e => {
        e.preventDefault();
        // splits at comma, returns stars as an array
        movieValues.stars = movieValues.stars.split(',');
        // onSubmit uses axios call PUT
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movieValues)
            .then(() => { //will change back to res if doesn't work
                setMovieValues(initialValues)
                props.getMovieList();
                push('/') //pushing to main movie page
                props.setRefresh(true); //this state is in App component
            })
            .catch(err => {
                console.log(err.message, 'Error in onSUbmit PUT axios call')
            });
    };
// Done with this, I think. Now go to App.js which I skipped over completely

return (
    // Make the form
    <div>
        <h2> Update Item </h2>
        <form onSubmit={onSubmit} >

            <label> Movie Title:  </label>
            <input 
                type='text'
                name='title'
                onChange={onChange}
                placeholder='Movie Title'
                value={movieValues.title}
            />

            <label> Movie Director:  </label>
            <input 
                type='text'
                name='director'
                onChange={onChange}
                placeholder='Director'
                value={movieValues.director}
            />

            <label> Metascore:  </label>
            <input 
                type='text'
                name='metascore'
                onChange={onChange}
                placeholder='Metascore'
                value={movieValues.metascore}
            />

            <label> Stars:  </label>
            <input 
                type='text'
                name='stars'
                onChange={onChange}
                placeholder='Actor(s) / Actress(es)'
                value={movieValues.stars}
            />

            {/* Add a button */}
            <button> Update Movie </button>

        </form>
    </div>
);

};

export default UpdateMovieForm; //<-- Don't forget this!!

