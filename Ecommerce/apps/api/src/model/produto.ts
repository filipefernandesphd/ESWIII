export type Produto = {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
  destaque?: boolean;
  promocao?: boolean;
  novidade?: boolean;
};