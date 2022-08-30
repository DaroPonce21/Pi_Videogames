import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideogame, getByGenres, getPlatforms } from "../redux/actions";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import Generico from '../style/generico.png'
import '../style/Create.css'

function validate(input) {
  let errors = {}
  if (!input.name) {
    errors.name = 'A name is required'
  } else if (!input.name.length > 50) {
    errors.name = 'the name is too long'
  }

  if (!input.description) {
    errors.description = 'A description is required'
  } else if (!input.name.length > 50) {
    errors.name = 'the description is too long (max 100 characters)'
  }

  if (!input.released) {
    errors.released = 'release date required'
  }


  if (!input.rating) {
    errors.rating = 'A score is required'
  } else if (input.rating > 5 || input.rating < 0) {
    errors.rating = 'the valid score is between 0 and 5'
  }


  return errors
}

export default function Create() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const generos = useSelector((state) => state.genres)
  const plataformas = useSelector(state => state.platforms)
  const allNames = useSelector(state => state.allVideogames)
  const [errors, setErrors] = useState({})
  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: []
  });


  useEffect(() => {
    dispatch(getByGenres())
    dispatch(getPlatforms())
  }, [dispatch])


  function handleSubmit(e) {
    e.preventDefault();
    let noRepeat = allNames.filter(n => n.name === input.name)
    if (noRepeat.length !== 0) {
      alert('Ya existe un juego con ese nombre, por favor elija otro')
    } else if (!Object.getOwnPropertyNames(errors).length && input.name && input.description && input.released && input.rating) {

      if (!input.image) {
        input.image = Generico
      }
      dispatch(createVideogame(input));
      alert("Felicidades, el juego fue creado exitosamente.");
      setInput({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
      });
      navigate('/home')
    } else {
      alert('El juego no se creo, revise los campos')
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(validate({
      ...input,
      [e.target.name]: [e.target.value]
    })
    )
  }

  function handleGenres(e) {
    if (!input.genres.includes(e.target.value)) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      })
    }
  }

  function handlePlatforms(e) {
    if (!input.platforms.includes(e.target.value)) {
      setInput({
        ...input,
        platforms: [...input.platforms, e.target.value]
      })
    }
  }

  function handleDeleteG(e) {
    setInput({
      ...input,
      genres: input.genres.filter((gen) => gen !== e)
    });
  }

  function handleDeleteP(e) {
    setInput({
      ...input,
      platforms: input.platforms.filter((plat) => plat !== e)
    });
  }


  return (

    <div className="divCreate">
      <Link to='/home'><button className="buttonHome">Home</button> </Link>
      <h1 className="title">Create your video game</h1>
      <h3 className="subtitle">Playing Hideo Kojima</h3>
      <div className="super">
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <label><strong>Name: </strong></label>
            <input type="text" value={input.name} placeholder='Name' name='name' onChange={e => handleChange(e)}/>
            {errors.name && (
              <p className="error">{errors.name}</p>
            )}
          </div>

          <div>
            <label><strong>Description: </strong></label>
            <textarea type="text" value={input.description} name='description' placeholder='This game is great' onChange={e => handleChange(e)} />
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </div>

          <div>
            <label><strong>Rating: </strong></label>
            <input input type="number" min="0" max="5" step="0.01" value={input.rating} placeholder='4.5' name='rating' onChange={e => handleChange(e)} />
            {errors.rating && (
              <p className="error">{errors.rating}</p>
            )}
          </div>

          <div>
            <label><strong>Released: </strong></label>
            <input type="date" id="start" value={input.released} max='01/01/2023' placeholder='21/02/1990' name='released' onChange={e => handleChange(e)} />
            {errors.released && (
              <p className="error">{errors.released}</p>
            )}
          </div>

          <div>
            <label><strong>Imagen: </strong></label>
            <input type="text" value={input.image} name='image' placeholder='https://...com' onChange={e => handleChange(e)} />

          </div>

          <div>
            <select onChange={e => handleGenres(e)}>
              <option value='selected' hidden >Genres:</option>
              {generos?.sort(function (a, b) {
                if (a.name < b.name) return -1
                if (a.name > b.name) return 1
                return 0
              }).map(gen => {
                return (
                  <option value={gen.name} key={gen.id}>{gen.name}</option>
                )
              })}
            </select>
            {input.genres.map(e => {
              return (
                <ul className="allSelecction" key={e}>
                  <li>
                    <p className="selecction"><strong>{e}</strong></p>
                    <button onClick={() => handleDeleteG(e)} className='x'>X</button>
                  </li>
                </ul>
              )
            })}
          </div>

          <div>
            <select onChange={e => handlePlatforms(e)}>
              <option value='selected' hidden >Platforms:</option>
              {plataformas?.sort(function (a, b) {
                if (a.name < b.name) return -1
                if (a.name > b.name) return 1
                return 0
              }).map(pla => {
                return (
                  <option value={pla} key={pla}>{pla}</option>
                )
              })}
            </select>
            {input.platforms.map(e => {
              return (
                <ul className="allSelecction" key={e}>
                  <li>
                    <p className="selecction"><strong>{e}</strong></p>
                    <button onClick={() => handleDeleteP(e)} className='x'>X</button>
                  </li>
                </ul>
              )
            })}
          </div>

          <button type="submit" className="boop" ><strong>Create!</strong></button>

        </form>
      </div>
    </div>
  )
}
