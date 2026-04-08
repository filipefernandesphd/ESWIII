export type Categoria = {
  id: number;
  categoria: string;
};

let categorias: Categoria[] = [
  {
    id: 1,
    categoria: "Camisetas"
  },
  {
    id: 2,
    categoria: "Calças"
  },
  {
    id: 3,
    categoria: "Jaquetas"
  },
  {
    id: 4,
    categoria: "Calçados"
  },
  {
    id: 5,
    categoria: "Bermudas"
  },
  {
    id: 6,
    categoria: "Camisas"
  },
];

export function setCategorias(newCategorias: Categoria[]): void {
  categorias = newCategorias;
}

export function getCategorias(): Categoria[] {
  return categorias;
}

export function clearCategorias(): void {
  categorias = [];
}