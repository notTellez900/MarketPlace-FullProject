"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const catsController_1 = __importDefault(require("../controllers/catsController"));
class ItemsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', catsController_1.default.list);
        this.router.get('/:id', catsController_1.default.getOne);
        this.router.post('/', catsController_1.default.create);
        this.router.put('/:id', catsController_1.default.update);
        this.router.delete('/:id', catsController_1.default.delete);
    }
}
const catsRoutes = new ItemsRoutes();
exports.default = catsRoutes.router;
