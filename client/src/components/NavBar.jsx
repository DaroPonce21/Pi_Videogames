import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { getAllVideogames } from "../redux/actions";
import { useDispatch } from "react-redux";
import '../style/Home.css'

export default function NavBar() {

    const dispatch = useDispatch()

    const handleRefresh = (e) => {
        e.preventDefault()
        dispatch(getAllVideogames())
    }

    return (
        <div>
            <div>
                <ul className='navbar'>
                    <li>
                        <Link to='/'><button className='welcome'><span>Welcome Page</span></button></Link>
                    </li>
                    <li>
                        <button className='welcome' onClick={e => { handleRefresh(e) }}><span>Reset videogames</span></button>
                    </li>
                    <li>
                        <Link to='/create' ><button className='welcome'><span>Create New Game</span></button></Link>
                    </li>
                    <li>
                        <SearchBar/>
                    </li>
                
                </ul>
            </div>
        </div>
    )
}