import React, { useState, useRef } from 'react';
import Movie from './Movie';

export default function MovieList() {
    const [movies, setMovie] = useState([]);
    const inputRef = useRef();

    function addMovie(event) {        
          const newId = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
          setMovie([...movies, {
              id: newId,
              title: inputRef.current.value,
          }])

          inputRef.current.value = "";
        
    }
    function deleteItem(id) {
      setMovie(movies.filter((item) => item.id !== id));
  }

  return (
      <div>
          <input className="form-control" ref={inputRef} placeholder="Add a new movie here..."  />
          <label for="rating-field">Betyg:</label>

                <select type="text" id="rating-field" className="form-control">
                    <option value="0">Välj betyg här...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>

                <input type="submit" class="btn btn-success mt-3" value="Spara film" onClick={addMovie}/>
          <ul className="list-group">
              {movies.map(movie => <Movie key={movie.id} item={movie} deleteItem={deleteItem} />)}
          </ul>
      </div>
  )
}

 