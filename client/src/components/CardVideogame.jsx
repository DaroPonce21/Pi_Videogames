import React from "react";
import { NavLink } from "react-router-dom";
import '../style/Card.css'

export default function CardVideogame({ image, name, genres, rating, id }) {
    return (
        <div className="cards">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <h1>{name}</h1>
                        <img src={image} alt={`${name}`} className='imageGame' />
                    </div>
                    <div className="flip-card-back">
                        <h1>{name}</h1>
                        <h2>Genres:</h2>
                        <h4>{genres}</h4>
                        <h2>Rating:</h2>
                        <h4>⭐ {rating}</h4>
                        <NavLink to={`/detail/${id}`}><span>Show more</span></NavLink>
                    </div>
                </div>

            </div>

        </div>

    )
}