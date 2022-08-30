const { Router } = require("express");
const videogamesRoute = require("./videogames.js")
const genresRoute = require('./genres.js')
const videogameRoute = require('./videogame.js')

const router = Router();

router.use('/videogames', videogamesRoute);
router.use('/genres', genresRoute)
router.use('/videogame', videogameRoute)


module.exports = router;