import React, { useState, useRef } from 'react';
import Movie from './Movie';

export default function MovieList() {
  const [movies, setMovie] = useState([]);
  const inputRef = useRef();
  const ratingRef = useRef();
  const [validTitle, setValidTitle] = useState(false);
  const [validRating, setValidRating] = useState(false);


  function addMovie(event) {   
    event.preventDefault();
    if (validTitle && validRating) {
      const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
      setMovie([...movies, {
        id: newId,
        title: inputRef.current.value,
        rating: ratingRef.current.value
      }])

      inputRef.current.value = "";
      ratingRef.current.value = "0";
    } else {
      alert("Du måste fylla i en titel och ett betyg!")
    }     
  }
    
  function deleteItem(id) {
    setMovie(movies.filter((item) => item.id !== id));
  }
   
  function isValid(valid) {
    return 'form-control '+(valid ?'':'is-invalid');
  }

  const updateValidationTitle = () => {
    setValidTitle(inputRef.current.value !== "");
  }
  const updateValidationRate = () => {
    setValidRating(ratingRef.current.value !== "0");
  }

  const sortByTitle = () => {
    const sortedMovies = [...movies].sort((a, b) => {
        return a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1;
    });
    
    setMovie(sortedMovies);
  }
  const sortByRating = () => {
    const sortedMovies = [...movies].sort((a, b) => {
        return a.rating.toLowerCase() > b.rating.toLowerCase() ? 1 : -1;
    });

    setMovie(sortedMovies);
  }

  return (
      <div>
        <form>
          <fieldset>
            <legend>Lägg till en film</legend>
            <label htmlFor="title-field">Titel:</label>
            <input className={isValid(validTitle)} ref={inputRef} placeholder="Add a new movie here..." onKeyUp={updateValidationTitle}  />
            
            <label htmlFor="rating-field">Betyg:</label>
            <select type="text" id="rating-field" className={isValid(validRating)} ref={ratingRef} onChange={updateValidationRate}>
              <option value="0" >Välj betyg här...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <input type="submit" className="btn btn-success mt-3 mb-4" value="Spara film" onClick={addMovie}/>
            </fieldset>
        </form>

        <h2>Inlagda filmer</h2>
        <ul className="list-group d-grid gap-1 mb-2 mt-2">
            {movies.map(movie => <Movie key={movie.id} item={movie} deleteItem={deleteItem} />)}
        </ul>
        <input className="btn btn-primary mt-2 me-2" value="Sortera på titel" onClick={sortByTitle}/>
        <input className="btn btn-primary mt-2" value="Sortera på betyg" onClick={sortByRating}/>
      </div>
  )
}

 