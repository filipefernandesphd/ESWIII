import { Produto } from "./produto";

// O ItemCarrinho é uma extensão do Produto, adicionando a quantidade do produto no carrinho
// Ele representa um item específico que o cliente deseja comprar, incluindo a quantidade desejada
// ItemCarrinho é tudo que Produto tem + um novo campo quantidade”
export type ItemCarrinho = Produto & {
  quantidade: number;
};

export type Carrinho = {
  itens: ItemCarrinho[];
};
