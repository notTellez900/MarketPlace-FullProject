"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ItemsController {
    list(req, res) {
        try {
            database_1.default.query('SELECT i.id, i.nombre, i.descripcion, i.imagen, i.fecha_creacion, i.precio, i.stock, c.id as id_Categoria, c.nombre as categoria_nombre FROM items i INNER JOIN categoria c ON i.id_Categoria = c.id', (error, results, fields) => {
                if (error) {
                    console.log('Error al obtener los items: ', error);
                    res.status(500).json({ message: 'Error al obtener los items' });
                }
                else {
                    res.json(results);
                }
            });
        }
        catch (error) {
            console.log('Error al obtener los items: ', error);
            res.status(500).json({ message: 'Error al obtener los items' });
        }
    }
    getOne(req, res) {
        try {
            const { id } = req.params;
            database_1.default.query('SELECT i.id, i.nombre, i.precio, i.descripcion, i.imagen, i.fecha_creacion, i.stock, c.id as id_Categoria, c.nombre as categoria_nombre FROM items i INNER JOIN categoria c ON i.id_Categoria = c.id WHERE i.id = ?', [id], (error, result, fields) => {
                if (error) {
                    console.log('Error al obtener los items: ', error);
                    res.status(500).json({ message: 'Error al obtener el items' });
                }
                else {
                    return res.json(result[0]);
                }
            });
        }
        catch (error) {
            console.log('Error al obtener los items: ', error);
            res.status(500).json({ message: 'Error al obtener el items' });
        }
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO items SET ?', [req.body]);
            res.json({ message: "Item guardado" });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE items SET ? WHERE id = ?', [req.body, id]);
            res.json({ message: 'El item ha sido actualizado' });
            //res.json({text: 'Actualizando item ' + req.params.id});
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM items WHERE id = ?', [id]);
            res.json({ message: 'El item ha sido eliminado' });
        });
    }
}
const itemsController = new ItemsController();
exports.default = itemsController;
