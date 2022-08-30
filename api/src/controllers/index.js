const { default: axios } = require('axios');
const { Videogame, Genres } = require('../db.js')
//const {YOUR_API_KEY} = process.env 

//SOLICITUD PARA TRAERME MIS 100 VIDEOJUEGOS
//A LA API
const infoApi = async () => {
    let url = `https://api.rawg.io/api/games?key=e09a3b3d622c4885bc2c0a99c04248dc` //`https://api.rawg.io/api/games?key=${YOUR_API_KEY}`
    let videojuegos = []
    try {
        for (let i = 0; i < 5; i++) {
            const respuesta = await axios.get(url)
            respuesta.data.results.map(v => {
                videojuegos.push({
                    id: v.id,
                    name: v.name,
                    image: v.background_image,
                    rating: v.rating,
                    platforms: v.platforms?.map(el => el.platform.name),
                    genres: v.genres?.map(el => el.name)
                })
            });

            url = respuesta.data.next
        }
        return videojuegos

    } catch (e) {
        console.log(e)
    }
};

//A MI DB
const infoDB = async () => {
    try {
        return await Videogame.findAll({
            include: [{
                model: Genres,
                atributes: ['name'],
                throught: {
                    attributes: []
                }
            }]
        })
    } catch (e) {
        console.error(e)
    }
}

//UNO MIS DOS SOLICITUDES
const infoTotal = async () => {

    const apiData = await infoApi();
    const dbData = await infoDB();

    const infoCompleta = dbData.concat(apiData)
    return infoCompleta
}
//*************************************************************************** */

//SOLICITUD PARA MIS REQUEST POR QUERY
//A MI API
const nameApi = async (name) => {
    const infoSearch = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=e09a3b3d622c4885bc2c0a99c04248dc`)
    try {
        const vgSearch = await infoSearch.data.results.map(el => {
            return {
                id: el.id,
                name: el.name,
                image: el.background_image,
                rating: el.rating,
                platforms: el.platforms?.map(el => el.platform.name),
                genres: el.genres?.map(el => el.name)
            }
        })
        return vgSearch;
    } catch (e) {
        console.error(e)
    }
}
//************************************************************************************************** */

//SOLICITUD PARA MIS REQUEST POR PARAMS
//A MI ENDPOINT: https://api.rawg.io/api/games/{id}
const idApi = async (id) => {
    try {
        const rtaApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=e09a3b3d622c4885bc2c0a99c04248dc`)
        if (rtaApi) {
            const vgId = await rtaApi.data
            const info = {
                id: vgId.id,
                name: vgId.name,
                image: vgId.background_image,
                genres: vgId.genres?.map(g => g.name),
                description: vgId.description,
                released: vgId.released,
                rating: vgId.rating,
                platforms: vgId.platforms?.map(el => el.platform.name)

            }
            return info
        } else {
            return ("No hay un videojuego con ese id")
        }

    } catch (e) {
        console.error(e)
    }
}

//A MI DB
const idDb = async (id) => {
    try {
        return await Videogame.findByPk(id, {
            include: [{
                model: Genres,
                atributes: ['name'],
                throught: {
                    attributes: []
                }
            }]
        })
    } catch (e) {
        console.error(e)
    }
}

//UNO MIS DOS SOLICITUDES
const videogame = async (id) => {
    const dbID = id.includes("-")
    if (dbID) {
        const vgDb = await idDb(id);
        return vgDb
    } else {
        const vgApi = await idApi(id);
        return vgApi
    }
}


module.exports = {
    infoTotal,
    videogame,
    infoApi,
    infoDB,
    nameApi
}



