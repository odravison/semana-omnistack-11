const connection = require('../database/connection');

module.exports ={

  async create(request, response){
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    }).catch(error => {
      return response.json(error);
    });

    return response.json({ id });

  },

  async list(request, response){
    const { itemsPerPage = 5, page = 1 } = request.query;

    console.log(page);
    console.log(itemsPerPage);

    const [count] = await connection('incidents')
      .count();

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(itemsPerPage)
      .offset((page - 1) * itemsPerPage)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]).catch(async (error) => {
        return response.status(400).json({ error: error, description: 'Error while list incidents' });
      });

    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
    
  },

  async delete(request, response) {

    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id != ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();

  }

};