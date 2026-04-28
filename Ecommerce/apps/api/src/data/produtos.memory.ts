import { Produto } from "../model/produto";

let produtos: Produto[] = [
  {
    id: 1,
    nome: "Camiseta Básica",
    preco: 59,
    estoque: 20,
    categoria: "Camisetas",
    destaque: true,
    promocao: false,
    novidade: true,
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
  },
  {
    id: 3,
    nome: "Jaqueta de Couro",
    preco: 399,
    estoque: 0,
    categoria: "Jaquetas",
    destaque: true,
    promocao: false,
    novidade: false,
  },
  {
    id: 4,
    nome: "Tênis Casual",
    preco: 199,
    estoque: 15,
    categoria: "Calçados",
    destaque: false,
    promocao: true,
    novidade: true,
  },
  {
    id: 5,
    nome: "Bermuda Jeans",
    preco: 89,
    estoque: 8,
    categoria: "Bermudas",
    destaque: false,
    promocao: false,
    novidade: true,
  },
  {
    id: 6,
    nome: "Camisa Social",
    preco: 120,
    estoque: 12,
    categoria: "Camisas",
    destaque: true,
    promocao: false,
    novidade: false,
  },
];

export function setProdutos(newProdutos: Produto[]): void {
  produtos = newProdutos;
}

export function getProdutos(): Produto[] {
  return produtos;
}

export function clearProdutos(): void {
  produtos = [];
}