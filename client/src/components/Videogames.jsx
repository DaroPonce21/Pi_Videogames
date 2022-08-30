import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getAllVideogames } from "../redux/actions";
import CardVideogame from "./CardVideogame";
import Loading from './Loading'
import '../style/Home.css'

export const Videogames = ({currentGames}) => {
    const dispatch = useDispatch()
    const [carga, setCarga] = useState(true);

    React.useEffect(() => {
        dispatch(getAllVideogames()).then(() => setCarga(false)) //me traigo la action creators q me trae todos mis videojuegos de la API
    }, [dispatch])

    //const allVideogames = useSelector(state => state.allVideogames) //me traigo del reducer el estado en donde guarde todos mis videojuegos

    if (carga) {
        return <Loading />;
      }

    return (
        <div className='container'>
            {currentGames.length > 0 ?
            currentGames?.map(v => {
                return (<CardVideogame className='cardHome'
                    key={v.id}
                    id={v.id}
                    image={v.image ? v.image : v.name}
                    name={v.name}
                    genres={v.genres?.map(e => typeof (e) === 'object' ? e.name : e).join(', ')}
                    rating={v.rating}
                    />)}) : `We couldn't load the games, refresh the page`}

        </div>
    )
}