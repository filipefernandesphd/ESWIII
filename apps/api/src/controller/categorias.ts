import { Request, Response } from "express";
import { getCategorias } from "../data/categorias.memory";

export class CategoriaController {
    // GET /categorias
    index(req: Request, res: Response) {
        const categorias = getCategorias();
        return res.status(200).json(categorias);
    }
}