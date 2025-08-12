import type Categorias from "./Categorias";
import type Usuarios from "./Usuarios";

export default interface Produtos {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  disponibilidade: boolean;
  categoria: Categorias | null;
  usuario: Usuarios | null;
}
