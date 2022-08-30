const { Router } = require('express');
require('dotenv').config();
const { videogame } = require('../controllers')
const {Videogame, Genres} = require('../db.js')
//const {YOUR_API_KEY} = process.env 

const router = Router();

router.get('/:idVideogame', async (req, res, next) => {
    const {idVideogame} = req.params 
    let data = await videogame(idVideogame)

    try {
        data ? res.send(data) : res.status(404).send('El id ingresado no coincide con un videojuego en particular')

    } catch(e) {
        next(e)
    }
})

router.post('/', async (req, res, next) => {
    const {name, image, genres, released, rating, platforms, description} = req.body
    try {
        let newVideogame = await Videogame.create ({ 
            name,
            image,
            released,
            rating,
            platforms,
            description
        })
        const relacion = await Genres.findAll({ 
            where: { 
                name: genres
            }
        })
        await newVideogame.addGenres(relacion)
        res.json(newVideogame)

    } catch(e) {
        next(e)
    }
})

router.delete("/:id", async function (req, res) {
    const { id } = req.params;
    try {
        if (id) {
            await Videogame.destroy({
                where: { id: id },
            });
            res.send({ msg: "Game deleted" });
        }
    } catch (error) {
        console.log(error);
    }
});


module.exports = router;
