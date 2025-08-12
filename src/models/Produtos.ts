export default interface Produtos {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  disponibilidade: boolean;
  categoria: Categorias | null;
  usuario: Usuarios | null;
}
