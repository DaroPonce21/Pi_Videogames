import React from "react";
import '../style/Pagination.css'



const Paginado = ({ gamesPerPage, allGames, paginado }) => {

    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allGames / gamesPerPage); i++) {
        pageNumber.push(i)
    }
    return (
        <nav >
            <ul className='paginado'>
                {pageNumber && pageNumber.map(number => (
                    <li key={number}>
                        <button onClick={() => paginado(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}




export default Paginado
