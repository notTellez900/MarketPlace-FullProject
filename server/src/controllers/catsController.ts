import {Request, Response } from 'express';

import pool from '../database';

class CatsController{

    public list (req: Request, res: Response) {

        try {
            pool.query('SELECT * FROM categoria', (error, results, fields) => {
                if (error){
                    console.log('Error al obtener los items: ', error);
                    res.status(500).json({message: 'Error al obtener las categorias'});
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
            pool.query('SELECT * FROM categoria WHERE id = ?', [id], (error, result, fields) =>{
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
        await pool.query('INSERT INTO categoria SET ?', [req.body]);
        res.json({message: "Categoria guardada"});
    }

    public async update(req: Request, res: Response){
        const { id } = req.params;
        await pool.query('UPDATE categoria SET ? WHERE id = ?', [req.body, id]);
        res.json({message: 'La categoria ha sido actualizado'});
        //res.json({text: 'Actualizando item ' + req.params.id});
    }

    public async delete(req: Request, res: Response){
        const {id} = req.params;
        await pool.query('DELETE FROM categoria WHERE id = ?', [id]);
        res.json({message: 'La categoria ha sido eliminado'});
    }
    
}

const catsController = new CatsController();
export default catsController;