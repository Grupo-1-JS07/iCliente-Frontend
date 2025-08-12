/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ChangeEvent, useState, useEffect, useContext } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { buscar, atualizar, cadastrar } from '../../../services/Services';
import type Produtos from '../../../models/Produtos';
import type Categoria from '../../../models/Categorias';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function FormProduto() {
  const navigate = useNavigate();
  const [produto, setProduto] = useState<Produtos>({disponibilidade: false,} as Produtos);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState(false);
  const [carregandoCategoria, setCarregandoCategoria] = useState(false);
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  const { id } = useParams<{ id: string }>();

  async function buscarCategorias() {
    setCarregandoCategoria(true);
    try {
      await buscar('/categorias', setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    }
    setCarregandoCategoria(false);
  }

  async function buscarProdutoPorId(id: string) {
    try {
      await buscar(`/produtos/${id}`, setProduto, {
        headers: { Authorization: token },
      });
      setCategoria(produto.categoria || ({} as Categoria));
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info');
      navigate('/');
    }
  }, [navigate, token]);

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarProdutoPorId(id);
    }
    // eslint-disable-next-line
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value,
    });
  }

  function buscarCategoriaPorId(id: string) {
    const cat = categorias.find((c) => c.id === Number(id));
    setCategoria(cat || ({} as Categoria));
    setProduto({ ...produto, categoria: cat || null });
  }

  async function gerarNovoProduto(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    if (id !== undefined) {
      try {
        await atualizar(`/produtos`, { ...produto, categoria }, setProduto, {
          headers: { Authorization: token },
        });
        ToastAlerta('Produto atualizado com sucesso!', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao atualizar o produto!', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/produtos`, { ...produto, categoria }, setProduto, {
          headers: { Authorization: token },
        });
        ToastAlerta('Produto cadastrado com sucesso!', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao cadastrar o produto!', 'erro');
        }
      }
    }
    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate('/produtos');
  }

return (
    <div className="container flex flex-col items-center justify-center mx-auto min-h-screen">
      <h1 className="text-4xl text-center my-8 text-cyan-300 font-extrabold drop-shadow-[0_2px_20px_rgba(0,255,255,0.7)]">
        {id === undefined ? "Cadastrar Produto" : "Editar Produto"}
      </h1>
      <form
        className="w-full max-w-lg flex flex-col gap-6 backdrop-blur-md bg-gradient-to-br from-[#1a0a3c]/80 to-[#0a0026]/80 border border-cyan-400/40 shadow-2xl rounded-2xl px-10 py-8 neon-box"
        onSubmit={gerarNovoProduto}
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className="text-cyan-200 text-sm font-semibold">
            Nome do Produto
          </label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            name="nome"
            className="bg-transparent border border-cyan-400/60 rounded px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder-cyan-400/60"
            value={produto.nome || ""}
            onChange={atualizarEstado}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className="text-cyan-200 text-sm font-semibold">
            Descrição do produto:
          </label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            name="descricao"
            className="bg-transparent border border-cyan-400/60 rounded px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder-cyan-400/60"
            value={produto.descricao || ""}
            onChange={atualizarEstado}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="descricao"
            className="text-cyan-200 text-sm font-semibold"
          >
            Preço do Produto:
          </label>
          <input
            type="number"
            placeholder="Preço do produto"
            name="preco"
            value={produto.preco || ""}
            onChange={(e) =>
              setProduto({ ...produto, preco: Number(e.target.value) })
            }
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="descricao"
            className="text-cyan-200 text-sm font-semibold"
          >
            Disponibilidade do produto:
          </label>
          <select
            name="disponibilidade"
            value={String(produto.disponibilidade)} // garante que sempre é string no select
            onChange={(e) =>
              setProduto({
                ...produto,
                disponibilidade: e.target.value === "true", // converte para boolean
              })
            }
          >
            <option value="true">Disponível</option>
            <option value="false">Indisponível</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="categoria"
            className="text-cyan-200 text-sm font-semibold"
          >
            Categoria do Produto
          </label>
          <select
            name="categoria"
            id="categoria"
            className="bg-transparent border border-cyan-400/60 rounded px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/80"
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
            required
            value={categoria.id || ""}
          >
            <option value="" selected disabled>
              Selecione uma Categoria
            </option>
            {categorias.map((categoria) => (
              <>
                <option value={categoria.id}> {categoria.descricao}</option>
              </>
            ))}
          </select>
        </div>
        <button
          className="rounded text-slate-100 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg hover:from-cyan-300 hover:to-purple-400 font-bold w-1/2 py-2 mx-auto flex justify-center neon-btn text-lg disabled:bg-slate-200"
          type="submit"
          disabled={carregandoCategoria}
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormProduto;
