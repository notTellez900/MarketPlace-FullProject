import {Request, Response } from 'express';

import pool from '../database';

class ItemsController{

    public list (req: Request, res: Response) {
        try {
            pool.query('SELECT i.id, i.nombre, i.descripcion, i.imagen, i.fecha_creacion, i.precio, i.stock, c.id as id_Categoria, c.nombre as categoria_nombre FROM items i INNER JOIN categoria c ON i.id_Categoria = c.id', (error, results, fields) => {
                if (error){
                    console.log('Error al obtener los items: ', error);
                    res.status(500).json({message: 'Error al obtener los items'});
                }else{
                    res.json(results);
                }
            });
        } catch (error) {
            console.log('Error al obtener los items: ', error);
            res.status(500).json({message: 'Error al obtener los items'})
        }
    }

    public getOne(req: Request, res: Response){
        try {
            const { id } = req.params;
            pool.query('SELECT i.id, i.nombre, i.precio, i.descripcion, i.imagen, i.fecha_creacion, i.stock, c.id as id_Categoria, c.nombre as categoria_nombre FROM items i INNER JOIN categoria c ON i.id_Categoria = c.id WHERE i.id = ?', [id], (error, result, fields) =>{
                if (error){
                    console.log('Error al obtener los items: ', error);
                    res.status(500).json({message: 'Error al obtener el items'});
                }else{
                    return res.json(result[0]);
                }
            });
        } catch (error) {
            console.log('Error al obtener los items: ', error);
            res.status(500).json({message: 'Error al obtener el items'})
        }  
    }

    public async create (req: Request, res: Response){
        console.log(req.body);
        await pool.query('INSERT INTO items SET ?', [req.body]);
        res.json({message: "Item guardado"});
    }

    public async update(req: Request, res: Response){
        const { id } = req.params;
        await pool.query('UPDATE items SET ? WHERE id = ?', [req.body, id]);
        res.json({message: 'El item ha sido actualizado'});
        //res.json({text: 'Actualizando item ' + req.params.id});
    }

    public async delete(req: Request, res: Response){
        const {id} = req.params;
        await pool.query('DELETE FROM items WHERE id = ?', [id]);
        res.json({message: 'El item ha sido eliminado'});
    }
    
}

const itemsController = new ItemsController();
export default itemsController;