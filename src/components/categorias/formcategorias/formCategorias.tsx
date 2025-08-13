/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useContext, useEffect, type ChangeEvent } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../../../context/AuthContext';
import type Categoria from '../../../models/Categorias';
import { buscar, atualizar, cadastrar } from '../../../services/Services';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function FormCategoria() {
  const navigate = useNavigate();

  const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
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
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate('/categorias');
  }

  async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
          ToastAlerta('A Categoria foi atualizada com sucesso!', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao atualizar a categoria!', 'erro');
        }
      }
    } else {
      try {
        await cadastrar(`/categorias`, categoria, setCategoria, {
          headers: { Authorization: token },
        });
          ToastAlerta('A Categoria foi cadastrada com sucesso!', 'sucesso');
      } catch (error: any) {
        if (error.toString().includes('401')) {
          handleLogout();
        } else {
          ToastAlerta('Erro ao cadastrar a categoria!', 'erro');
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="container flex flex-col items-center justify-center mx-auto min-h-screen">
      <h1 className="text-4xl text-center my-8 text-cyan-300 font-extrabold drop-shadow-[0_2px_20px_rgba(0,255,255,0.7)]">
        {id === undefined ? 'Cadastrar Squad/Area' : 'Editar Squad/Area'}
      </h1>
      <form
        className="w-full max-w-lg flex flex-col gap-6 backdrop-blur-md bg-gradient-to-br from-[#1a0a3c]/80 to-[#0a0026]/80 border border-cyan-400/40 shadow-2xl rounded-2xl px-10 py-8 neon-box"
        onSubmit={gerarNovaCategoria}
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="descricao"
            className="text-cyan-200 text-sm font-semibold"
          >
            Descrição do Squad/Area
          </label>
          <input
            type="text"
            placeholder="Descreva aqui sua Categoria"
            name="descricao"
            className="bg-transparent border border-cyan-400/60 rounded px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder-cyan-400/60"
            value={categoria.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            required
          />
        </div>
        <button
          className="rounded text-slate-100 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg hover:from-cyan-300 hover:to-purple-400 font-bold w-1/2 py-2 mx-auto flex justify-center neon-btn text-lg disabled:bg-slate-200"
          type="submit"
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
            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormCategoria;
