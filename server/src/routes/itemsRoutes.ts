import { Router } from 'express';
import itemsController from '../controllers/itemsController';

class ItemsRoutes {

    public router : Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', itemsController.list);
        this.router.get('/:id', itemsController.getOne);
        this.router.post('/', itemsController.create);
        this.router.put('/:id', itemsController.update);
        this.router.delete('/:id', itemsController.delete);
    }

}


const itemsRoutes = new ItemsRoutes();
export default itemsRoutes.router;