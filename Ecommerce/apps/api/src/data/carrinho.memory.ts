import { Carrinho } from "../model/carrinho";

let carrinhos: Carrinho[] = [
  {
    itens: [
      {
        id: 1,
        nome: "Camiseta Básica",
        preco: 59,
        estoque: 20,
        categoria: "Camisetas",
        destaque: true,
        promocao: false,
        novidade: true,
        quantidade: 2,
      },
      {
        id: 2,
        nome: "Calça Jeans Slim",
        preco: 149,
        estoque: 5,
        categoria: "Calças",
        destaque: false,
        promocao: true,
        novidade: false,
        quantidade: 1,
      },
    ],
  },
  {
    itens: [
      {
        id: 3,
        nome: "Jaqueta de Couro",
        preco: 399,
        estoque: 0,
        categoria: "Jaquetas",
        destaque: true,
        promocao: false,
        novidade: false,
        quantidade: 1,
      },
    ],
  },
];

export function setCarrinhos(newCarrinhos: Carrinho[]): void {
  carrinhos = newCarrinhos;
}

export function getCarrinhos(): Carrinho[] {
  return carrinhos;
}

export function clearCarrinhos(): void {
  carrinhos = [];
}