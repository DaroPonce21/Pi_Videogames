import React from 'react'
import { Link } from 'react-router-dom'
import '../style/Landing.css'
import imagen from '../style/gamer4.jpg'


export default function LandingPage() {
    return (
        <div className='landing'>
            <img src={imagen} alt="" className='imagen' />
            <div className='divText'>INSERT COIN</div>
            <div className='divSubText'>By Gamers for Gamers</div>
            <Link to='/home'><button className='welcomeLanding'><span>START</span></button></Link>
        </div>


    )
}
