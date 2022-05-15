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
        return a.rating < b.rating ? 1 : -1;
    });

    setMovie(sortedMovies);
  }

  return (
    <div className='container mt-2'>
        <h1>Min Filmlista</h1>
            <h2>Lägg till en film</h2>
            <label htmlFor="title-field">Titel:</label>
            <input className={isValid(validTitle)} ref={inputRef} placeholder="Titel här..." onKeyUp={updateValidationTitle}  />
            
            <label htmlFor="rating-field">Betyg:</label>
            <select type="text" id="rating-field" className={isValid(validRating)} ref={ratingRef} onChange={updateValidationRate}>
              <option value="0" >Välj betyg här...</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <button type="button" className="btn btn-success mt-3 mb-4" value="Spara film" onClick={addMovie}>Spara film</button>

        <h2>Filmer i listan</h2>
        <ul className="list-group d-grid gap-1">
            {movies.map(movie => <Movie key={movie.id} item={movie} deleteItem={deleteItem} />)}
        </ul>
        <button type='button' className="btn btn-primary mt-2 me-2" onClick={sortByTitle}>Sortera på titel här</button>
        <button type='button' className="btn btn-primary mt-2" onClick={sortByRating}>Sortera på betyg här</button>
    </div>
  )
}

 