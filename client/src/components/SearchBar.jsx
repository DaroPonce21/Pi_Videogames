import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getNames } from '../redux/actions'
import '../style/SearchBar.css'

export default function SearchBar () {
    const [state, setState] = useState('') //me creo un estado local cuyo valor incial es vacio
    const dispatch = useDispatch()

    function handleChange(e) { //cada vez que escriba algo en la barra de busqueda
        e.preventDefault()
        setState(e.target.value) //a mi estado incial lo seteo con el valor que voy ingresando en mi busqueda
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(state.length > 1) { //si escribo algo en mi barra de busqueda
            dispatch(getNames(state))
            setState('') //para limpiar mi busqueda
        } else {
            alert(`I don't enter anything in the search`)
        }
    }

    
    return (
        <>
            <input
                type='text'
                placeholder='Insert name'
                onChange={e => handleChange(e)}
                value={state}
                className='input'
                onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
            />
            <button
                type='submit'
                onClick={e => handleSubmit(e)}
                className='button'
            >
                <span><strong>Search!</strong></span>
            </button>
        </>
    )
}