import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByGenres } from "../redux/actions";
import '../style/Home.css'


const Funcionalidades = ({ handleFilter, handleSort, handleSource }) => {

    const dispatch = useDispatch() //el useDispatch devuelve el metodo dispatch que permite dispatchar acciones
    const generos = useSelector(state => state.genres)// el useSelector lee un valor del estado del store(reducer) y se suscribe a las actualizaciones del mismo.
    //console.log(generos)

    useEffect(() => { //
        dispatch(getByGenres())
        //dispatch(getAllVideogames())
    }, [dispatch])


    return (
        <div >
            <ul className='navbar'>
                <li className='content-select'>
                    <select onChange={e => handleSort(e)}>
                        <option value="" >Sort by...</option>
                        <option value="A-Z" >A-Z</option>
                        <option value="Z-A" >Z-A</option>
                        <option value="RatingAsc">Rating up</option>
                        <option value="RatingDesc">Rating down</option>
                    </select>
                </li>
                <li className='content-select'>
                    <select id="genre" onChange={e => handleFilter(e)}>
                        <option value=''>Genres</option>
                        {generos && generos.map(g => {
                            return (
                                <option key={g.id} value={g.name}>{g.name}</option>
                            )
                        })}
                    </select>
                </li>
                <li className='content-select'>
                    <select onChange={e => handleSource(e)}>
                        <option value=''>Filter By Origin</option>
                        <option value="api">API</option>
                        <option value="created">Created</option>
                    </select>
                </li>
            </ul>

        </div>
    )
}

export default Funcionalidades