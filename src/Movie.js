import React from 'react'

export default function Movie(props) {
    function getStars(number){
        let stars = [];
        for(var i = 0; i < number; i++) {
            stars.push(<img src="/star.png" alt="Star" />);
        }
        return stars;
        
    };
    return (
        <li className="list-group-item">
            { props.item.title }
            {getStars(props.item.rating)}
            <button className="btn btn-sm btn-danger float-end" onClick={() => {props.deleteItem(props.item.id)}}>X</button>
        </li>
    )
}