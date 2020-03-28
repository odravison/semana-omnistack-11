const connection = require('../database/connection');
const cryppto = require('crypto');

module.exports = {
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;
  
    const id = cryppto.randomBytes(4).toString('HEX');
  
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    }).catch(error => {
      return response.json(error);
    });
  
    return response.json({ id });
  },
  async list(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },

};