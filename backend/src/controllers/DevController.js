const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// index, show, store, update, destroy

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

      return response.json(devs);
  },

  // Async/Await = aguarda finalizar para depois devolver uma resposta
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username }); //Encontrar um registro

    if (!dev) {
      // Utilizado cráse, para passar variáveis 
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); 

      // Se nãao houver name, irá assumir o valor da coluna login
      const { name = login, avatar_url, bio } = apiResponse.data;

      // .split() dividir o array após a virgula 
      // .map() percorre array
      // .trim() remove espaçamento antes e depois
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude], // Primeiro Longitude, pois é assim que o mongo entende
      }
      
      dev = await Dev.create({       
        github_username, // Short Sintax
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })
    }   

    return response.json(dev);
  }
};