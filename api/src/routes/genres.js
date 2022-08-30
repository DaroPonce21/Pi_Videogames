const  axios = require('axios');
const { Router } = require('express');
const {Genres} = require('../db.js')
//const {YOUR_API_KEY} = process.env 

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const respuesta = await axios.get(`https://api.rawg.io/api/genres?key=e09a3b3d622c4885bc2c0a99c04248dc`)
        const genresApi = await respuesta.data.results.map(g => g.name)
        

        genresApi.map(e => Genres.findOrCreate({ 
            where: {name: e} //
        }))

        const allGenres = await Genres.findAll() 
        res.json(allGenres)

    }catch(e) {
        next(e)
    }

})

module.exports = router;