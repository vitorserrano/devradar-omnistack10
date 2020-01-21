const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;
    
    const techsArray = parseStringAsArray(techs);
    
    const devs = await Dev.find({
      techs: {
        $in: techsArray, // Operador Lógico do Mongo, para pegar o que está dentro do techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point', 
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        }
      }
    });

    // Buscar todos devs num raio 10km
    // Filtrar por techs

    return response.json({ devs });
  }
}