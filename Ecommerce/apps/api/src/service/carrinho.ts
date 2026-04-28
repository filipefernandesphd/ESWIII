import { Carrinho, ItemCarrinho } from "../model/carrinho";
import { Produto } from "../model/produto";

export class CarrinhoService {
  criar(): Carrinho {
    return { itens: [] };
  }

  adicionarItem(
    carrinho: Carrinho,
    produto: Produto,
    quantidade: number,
  ): void {
    if (quantidade <= 0) {
      throw new Error("A quantidade deve ser maior que zero");
    }

    const itemExistente = carrinho.itens.find(
      (item) => item.id === produto.id,
    );

    if (itemExistente) {
      itemExistente.quantidade += quantidade;
      return;
    }

    const novoItem: ItemCarrinho = {
      ...produto,
      quantidade,
    };

    carrinho.itens.push(novoItem);
  }

  quantidadeDeItens(carrinho: Carrinho): number {
    return carrinho.itens.reduce(
      (total, item) => total + item.quantidade,
      0,
    );
  }

  calcularTotal(carrinho: Carrinho): number {
    return carrinho.itens.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0,
    );
  }
}
