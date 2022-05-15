import React from 'react'

export default function Movie(props) {
    function getStars(number){
        let stars = [];
        for(var i = 0; i < number; i++) {
            stars.push(<img src="/star.png" alt="Star" className="float-end" />);
        }
        return stars;
        
    };
    return (
        <li className="list-group-item px-2 bg-light border">
            { props.item.title }
            <button className="btn btn-sm btn-danger ms-1 float-end" onClick={() => {props.deleteItem(props.item.id)}}>X</button>
            {getStars(props.item.rating)}
        </li>
    )
}