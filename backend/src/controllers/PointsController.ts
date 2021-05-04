import {Request, Response} from 'express';
import knex from '../database/connection';

class PointsController {
    async index(req: Request, res: Response) {
        const { city, uf, items }= req.query;
        
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        
        const points = await knex('points')
            .join('point_items', 'points_id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('point.*');

        return res.json(points);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points')
            .where('id', id)
            .first();

            if (!point) {
                return res.status(400).json({ message : 'Point not found' });
            }

            const items = await knex('items')
                .join('point_items', 'items_id', '=', 'point_items.items_id')
                .where('point_items.point_id', id);

            return res.json({ point, items });
    }

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items //id dos items que o ponto irá realizar a coleta
        } = req.body;
    
        const trx = await knex.transaction();
    
        const point = await trx('points').insert({
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        });
    
        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];
    
        const point_items = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        });
    
        await trx('point_items').insert(point_items);
        
        await trx.commit(); //Faz os inserts na base de dados

        return res.json({ 
            id: point_id,
            ...point,    //spread operator (espelhamento), pega todas info de um objeto e retorna
        });   
    }
}

export default PointsController;