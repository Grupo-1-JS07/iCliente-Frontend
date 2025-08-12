import type Produtos from "./Produtos";

export default interface Categoria {
  id: number;
  categoria: string;
  produto?: Produtos[] | null;
}
