import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Funtions from './Funtions'
import NavBar from "./NavBar";
import { Videogames } from "./Videogames";
import Paginado from './Paginado';
import { filterByGenres, filterBySource, orderBy, getAllVideogames } from "../redux/actions";
import '../style/Home.css'

export default function Home () {
    const allGames = useSelector(state => state.allVideogames)

    const [currentPage, setCurrentPage] = useState(1) 
    const gamesPerPage = 15
    const indexOfLastGame = currentPage * gamesPerPage 
    const indexOfFirstGame= indexOfLastGame - gamesPerPage 
    const currentGames = allGames.slice(indexOfFirstGame, indexOfLastGame) 

    const dispatch = useDispatch()

    const paginado = (pageNumber) => { 
        setCurrentPage(pageNumber)
    }


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage])

    function handleSort(e) {
        e.preventDefault()
        if(e.target.value === '') {
            dispatch(getAllVideogames())
        } else {
            dispatch(orderBy(e.target.value))
            setCurrentPage(1)
        }
    }

    function handleFilter(e) {
        e.preventDefault()
        if(e.target.value === '') {
            dispatch(getAllVideogames())
        } else {
            dispatch(filterByGenres(e.target.value))
            setCurrentPage(1)
        }
    }

    function handleSource(e) {
        e.preventDefault()
        if(e.target.value === '') {
            dispatch(getAllVideogames())
        } else {
            dispatch(filterBySource(e.target.value))
            setCurrentPage(1)
        }
    }

    return (
        <div className='home'>
            <div className='divNB'>
                <NavBar/>
            </div>
            <div className='divNBFun'>
            <Funtions handleSort={handleSort} handleFilter={handleFilter} handleSource={handleSource}/>
            </div>
            <div>
                <h1 className='h1home'>INSERT COIN</h1>
            </div>
            <div>
                <Videogames currentGames={currentGames}/>
            </div>
            <div>
                <Paginado 
                gamesPerPage={gamesPerPage} 
                allGames={allGames.length} 
                paginado={paginado} />
            </div>
        </div>
    )
}