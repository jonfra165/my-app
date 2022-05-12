import React, { useState, useRef } from 'react';
import Movie from './Movie';

export default function MovieList() {
  const [movies, setMovie] = useState([]);
  const inputRef = useRef();
  const ratingRef = useRef();
  const [validTitle, setValidTitle] = useState(false);
  const [validRating, setValidRating] = useState(false);


  function addMovie(event) {   
    if (validTitle && validRating) {
      const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
      setMovie([...movies, {
        id: newId,
        title: inputRef.current.value,
        rating: ratingRef.current.value
      }])

      inputRef.current.value = "";
    } else {
      alert("Fyll i för fan!")
    }     
  }
    
  function deleteItem(id) {
    setMovie(movies.filter((item) => item.id !== id));
  }
   
  function isValid(valid) {
    return 'form-control '+(valid ?'':'is-invalid');
  }

  const updateValidationTitle = () => {
    setValidTitle(inputRef.current.value != "");
  }
  const updateValidationRate = () => {
    setValidRating(ratingRef.current.value != "0");
  }

  function sortByTitle() {
    const sortedMovies = [...movies].sort((a, b) => {
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    });

    setMovie(sortedMovies);
}
function sortByRating() {
  const sortedMovies = [...movies].sort((a, b) => {
      return a.rating.toLowerCase() > b.rating.toLowerCase() ? 1 : -1;
  });

  setMovie(sortedMovies);
}

  return (
      <div>

          <label for="rating-field">Titel:</label>
          <input className={isValid(validTitle)} ref={inputRef} placeholder="Add a new movie here..." onKeyUp={updateValidationTitle}  />
          <label for="rating-field">Betyg:</label>

                <select type="text" id="rating-field" className={isValid(validRating)} ref={ratingRef} onChange={updateValidationRate}>
                    <option value="0">Välj betyg här...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <input type="submit" className="btn btn-success mt-3" value="Spara film" onClick={addMovie}/>
                <input className="btn btn-primary mt-3" value="Sortera på titel" onClick={sortByTitle}/>
                <input className="btn btn-primary mt-3" value="Sortera på betyg" onClick={sortByRating}/>
          <ul className="list-group">
              {movies.map(movie => <Movie key={movie.id} item={movie} deleteItem={deleteItem} />)}
          </ul>
      </div>
  )
}

 