import { CarrinhoService } from "./carrinho";
import { Produto } from "../model/produto";
import { Carrinho } from "../model/carrinho";

describe("CarrinhoService", () => {
  let service: CarrinhoService;

  const produto1: Produto = {
    id: 1,
    nome: "Camiseta Básica",
    preco: 59,
    estoque: 20,
    categoria: "Camisetas",
    destaque: true,
    promocao: false,
    novidade: true,
  };

  const produto2: Produto = {
    id: 2,
    nome: "Calça Jeans Slim",
    preco: 149,
    estoque: 5,
    categoria: "Calças",
    destaque: false,
    promocao: true,
    novidade: false,
  };

  const produto3: Produto = {
    id: 3,
    nome: "Jaqueta de Couro",
    preco: 399,
    estoque: 0,
    categoria: "Jaquetas",
    destaque: true,
    promocao: false,
    novidade: false,
  };

  beforeEach(() => {
    service = new CarrinhoService();
  });

  describe("criar", () => {
    test("deve criar um carrinho vazio", () => {
      const carrinho = service.criar();

      expect(carrinho).toEqual({ itens: [] });
      expect(carrinho.itens).toHaveLength(0);
    });
  });

  describe("adicionarItem", () => {
    test("deve adicionar um novo item ao carrinho", () => {
      const carrinho = service.criar();

      service.adicionarItem(carrinho, produto1, 2);

      expect(carrinho.itens).toHaveLength(1);
      expect(carrinho.itens[0]).toEqual({
        ...produto1,
        quantidade: 2,
      });
    });

    test("deve lançar erro se a quantidade for menor ou igual a zero", () => {
      const carrinho = service.criar();

      expect(() => {
        service.adicionarItem(carrinho, produto1, 0);
      }).toThrow("A quantidade deve ser maior que zero");

      expect(() => {
        service.adicionarItem(carrinho, produto1, -1);
      }).toThrow("A quantidade deve ser maior que zero");
    });

    test("deve somar a quantidade quando o produto já existir no carrinho", () => {
      const carrinho = service.criar();

      service.adicionarItem(carrinho, produto1, 2);
      service.adicionarItem(carrinho, produto1, 3);

      expect(carrinho.itens).toHaveLength(1);
      expect(carrinho.itens[0].quantidade).toBe(5);
    });
  });

  describe("quantidadeDeItens", () => {
    test("deve retornar zero para um carrinho vazio", () => {
      const carrinho = service.criar();

      const total = service.quantidadeDeItens(carrinho);

      expect(total).toBe(0);
    });

    test("deve retornar a soma das quantidades dos itens", () => {
      const carrinho: Carrinho = {
        itens: [
          { ...produto1, quantidade: 2 },
          { ...produto2, quantidade: 3 },
        ],
      };

      const total = service.quantidadeDeItens(carrinho);

      expect(total).toBe(5);
    });
  });

  describe("calcularTotal", () => {
    test("deve retornar zero para um carrinho vazio", () => {
      const carrinho = service.criar();

      const total = service.calcularTotal(carrinho);

      expect(total).toBe(0);
    });

    test("deve calcular o valor total do carrinho", () => {
      const carrinho: Carrinho = {
        itens: [
          { ...produto1, quantidade: 2 }, // 59 * 2 = 118
          { ...produto2, quantidade: 1 }, // 149 * 1 = 149
        ],
      };

      const total = service.calcularTotal(carrinho);

      expect(total).toBe(267);
    });
  });

  describe("cenários integrando múltiplos métodos", () => {
    test("deve criar carrinho, adicionar itens e calcular quantidade total", () => {
      const carrinho = service.criar();

      service.adicionarItem(carrinho, produto1, 2);
      service.adicionarItem(carrinho, produto2, 1);

      const quantidade = service.quantidadeDeItens(carrinho);

      expect(quantidade).toBe(3);
    });

    test("deve criar carrinho, adicionar itens e calcular o total da compra", () => {
      const carrinho = service.criar();

      service.adicionarItem(carrinho, produto1, 2); // 118
      service.adicionarItem(carrinho, produto2, 1); // 149

      const total = service.calcularTotal(carrinho);

      expect(total).toBe(267);
    });

    test("deve acumular quantidade do mesmo produto e refletir nos cálculos", () => {
      const carrinho = service.criar();

      service.adicionarItem(carrinho, produto1, 1);
      service.adicionarItem(carrinho, produto1, 2);

      expect(service.quantidadeDeItens(carrinho)).toBe(3);
      expect(service.calcularTotal(carrinho)).toBe(177); // 59 * 3
    });

    test("deve adicionar três produtos diferentes e calcular quantidade e total corretamente", () => {
      const carrinho = service.criar();

      service.adicionarItem(carrinho, produto1, 1); // 59
      service.adicionarItem(carrinho, produto2, 2); // 298
      service.adicionarItem(carrinho, produto3, 1); // 399

      expect(service.quantidadeDeItens(carrinho)).toBe(4);
      expect(service.calcularTotal(carrinho)).toBe(756);
    });
  });
});