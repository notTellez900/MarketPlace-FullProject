"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const itemsController_1 = __importDefault(require("../controllers/itemsController"));
class ItemsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', itemsController_1.default.list);
        this.router.get('/:id', itemsController_1.default.getOne);
        this.router.post('/', itemsController_1.default.create);
        this.router.put('/:id', itemsController_1.default.update);
        this.router.delete('/:id', itemsController_1.default.delete);
    }
}
const itemsRoutes = new ItemsRoutes();
exports.default = itemsRoutes.router;
