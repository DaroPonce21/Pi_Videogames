import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getVideogame } from "../redux/actions";
import Loading from './Loading'
import '../style/Detail.css'

export default function Detail(props) {
    const [carga, setCarga] = useState(true);
    const { id } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideogame(id)).then(() => setCarga(false))
    }, [dispatch, id])

    const myVideogame = useSelector(state => state.videogame)

    if (carga) {
        return <Loading />;
    }

    var regex = /(<([^>]+)>)/gi;

    return (
        <div className="divDetail">
            <Link to='/home'><button id="home" className="welcome"><span>Home</span></button></Link>
            <Link to='/create'>
                <button className="welcome"><span>Create Videogame</span></button>
            </Link>

            <div>
                <h1 className="name">{myVideogame.name}</h1>
                <ul className="asd">
                    <li>
                        <div>
                            <img src={myVideogame.image} alt={myVideogame.name} className='image' />
                        </div>
                    </li>
                    <li>
                        <div>
                            <h2 className="caracts">Genres:</h2>
                            <ul className="allTemps">
                                <li>{myVideogame.genres?.map(g => (g.name ? g.name : g)).join('| ')}</li>
                            </ul>

                            <h2 className="caracts">Released: </h2>
                            <p>📅 {myVideogame.released}</p>
                            <h2 className="caracts">Rating</h2>
                            <p>⭐ {myVideogame.rating}</p>
                            <h2 className="caracts">Description:</h2>
                            <p >📌{myVideogame.description?.replace(regex, '').replace('&#39', '')}</p>
                            <h2 className="caracts">Plataforms:</h2>
                            <p className="last">🎮: {myVideogame.platforms?.join(', ')}</p>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
    )
}