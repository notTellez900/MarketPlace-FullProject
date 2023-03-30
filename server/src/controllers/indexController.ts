import {Request, Response } from 'express';

class IndexController{

    public index (req: Request, res: Response) {
        res.json({text: 'APIS Is /api/items'});
    }
}

export const indexController = new IndexController();