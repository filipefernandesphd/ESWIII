import { Router } from "express";
import { CategoriaController } from "../controller/categorias";

const router = Router();
const categoriaController = new CategoriaController();

router.get("/categorias", (req, res) => categoriaController.index(req, res));

export default router;