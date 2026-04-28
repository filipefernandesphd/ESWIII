import { Request, Response } from "express";
import { getProdutos } from "../data/produtos.memory";

export class ProdutoController {
  // GET /produtos?categoria=...&nome=...&disponivel=...
  index(req: Request, res: Response) {
    const { categoria, nome, disponivel } = req.query;

    let produtos = getProdutos();

    if (categoria) {
      produtos = produtos.filter(
        (produto) =>
          produto.categoria.toLowerCase() === String(categoria).toLowerCase(),
      );
    }

    if (nome) {
      produtos = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(String(nome).toLowerCase()),
      );
    }

    if (disponivel === "true") {
      produtos = produtos.filter((produto) => produto.estoque > 0);
    }

    return res.status(200).json(produtos);
  }

  // GET /produtos/:id
  show(req: Request, res: Response) {
    const id = Number(req.params.id);

    const produto = getProdutos().find((p) => p.id === id);

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    return res.status(200).json(produto);
  }

  // GET /produtos/destaques
  destaques(req: Request, res: Response) {
    const produtos = getProdutos();
    const produtosEmDestaque = produtos.filter((produto) => produto.destaque === true);

    return res.status(200).json(produtosEmDestaque);
  }

  // GET /produtos/novidades
  novidades(req: Request, res: Response) {
    const produtos = getProdutos();
    const produtosEmNovidades = produtos.filter((produto) => produto.novidade === true);

    return res.status(200).json(produtosEmNovidades);
  }

  promocoes(req: Request, res: Response) {
    const produtos = getProdutos();
    const produtosEmPromocoes = produtos.filter((produto) => produto.promocao === true);

    return res.status(200).json(produtosEmPromocoes);
  }

  // GET /categorias
  categorias(req: Request, res: Response) {
    const produtos = getProdutos();

    const categorias = [
      ...new Set(produtos.map((produto) => produto.categoria)),
    ];

    return res.status(200).json(categorias);
  }

}