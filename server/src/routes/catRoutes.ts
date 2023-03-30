import { Router } from 'express';
import catsController from '../controllers/catsController';

class ItemsRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', catsController.list);
        this.router.get('/:id', catsController.getOne);
        this.router.post('/', catsController.create);
        this.router.put('/:id', catsController.update);
        this.router.delete('/:id', catsController.delete);
    }

}


const catsRoutes = new ItemsRoutes();
export default catsRoutes.router;