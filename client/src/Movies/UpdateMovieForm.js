import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialValues = {
    id:'',
    title:'',
    director:'',
    metascore: '',
    stars:[]
  
};

const UpdateMovieForm = (props) => {

  const { push } = useHistory();
  const { id } = useParams();
  const [movieValues, setMovieValues] = useState(initialValues);

  
    useEffect(() => {
      axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
          console.log(res);
          res.data.stars = res.data.stars.join(',')
          setMovieValues(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [id]);
  
    const onChange = (e) => {
      let name = e.target.name;
      let value = e.target.value;
  
      setMovieValues({
        ...movieValues,
        [name]: value,
      });
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
    movieValues.stars = movieValues.stars.split(','); //splits at comma, returns stars as array
    console.log(movieValues.stars)
      axios
        .put(`http://localhost:5000/api/movies/${id}`, movieValues)
        .then((res) => {
          console.log(res);
          setMovieValues(initialValues);
          props.getMovieList();
          push("/");
          props.setRefresh(true);
      
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    return (
      <div>
        <h2>Update Item</h2>
        <form onSubmit={onSubmit}>
          <input
            type='text'
            name='title'
            onChange={onChange}
            placeholder='title'
            value={movieValues.title}
          />
  
          <input
            type='text'
            name='director'
            onChange={onChange}
            placeholder='director'
            value={movieValues.director}
          />
  
          <input
            type='text'
            name='metascore'
            onChange={onChange}
            placeholder='metascore'
            value={movieValues.metascore}
          />
  
          <input
            type='text'
            name='stars'
            onChange={onChange}
            placeholder='stars'
            value={movieValues.stars}
          />
  
          <button>Update Movie</button>
        </form>
      </div>
    );
  };
  
  export default UpdateMovieForm;