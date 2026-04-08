import { Router } from "express";
import { ProdutoController } from "../controller/produtos";

const router = Router();
const produtoController = new ProdutoController();

router.get("/produtos", (req, res) => produtoController.index(req, res));
router.get("/produtos/destaques", produtoController.destaques);
router.get("/produtos/novidades", produtoController.novidades);
router.get("/produtos/promocoes", produtoController.promocoes);
router.get("/produtos/categorias", produtoController.categorias);
router.get("/produtos/:id", (req, res) => produtoController.show(req, res));

export default router;