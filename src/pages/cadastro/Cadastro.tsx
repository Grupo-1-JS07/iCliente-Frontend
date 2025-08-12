/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// import './cadastro.css'
import { RotatingLines } from 'react-loader-spinner';
import type Usuario from '../../models/Usuarios';
import { cadastrarUsuario } from '../../services/Services';
import { ToastAlerta } from '../../utils/ToastAlerta';

function Cadastro() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [confirmaSenha, setConfirmaSenha] = useState<string>('');

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate('/login');
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value);
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
        ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso');
      } catch (error) {
        ToastAlerta('Erro ao cadastrar o usuário!', 'erro');
      }
    } else {
      ToastAlerta(
        'Dados do usuário inconsistentes! Verifique as informações do cadastro.', 'info'
      );
      setUsuario({ ...usuario, senha: '' });
      setConfirmaSenha('');
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0026] via-[#1a0a3c] to-[#0a0026] animate-bg-move">
        <div className="flex flex-col items-center mb-8">
          <img
            src="/baixados.png"
            alt="Logo iCliente"
            className="w-32 h-32 mb-2 drop-shadow-[0_2px_20px_rgba(0,255,255,0.7)] select-none"
            draggable="false"
          />
          <span className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 tracking-widest select-none">
            iCLIENTE
          </span>
        </div>
        <form
          className="backdrop-blur-md bg-gradient-to-br from-[#1a0a3c]/80 to-[#0a0026]/80 border border-cyan-400/40 shadow-2xl rounded-2xl px-10 py-8 flex flex-col gap-6 w-full max-w-md neon-box"
          onSubmit={cadastrarNovoUsuario}
        >
          <h2 className="text-cyan-300 text-3xl font-bold text-center mb-2">
            Sign up
          </h2>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="nome"
              className="text-cyan-200 text-sm font-semibold"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="bg-transparent border border-cyan-400/60 rounded px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder-cyan-400/60"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="usuario"
              className="text-cyan-200 text-sm font-semibold"
            >
              Email
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Email"
              className="bg-transparent border border-cyan-400/60 rounded px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder-cyan-400/60"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              autoComplete="username"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="foto"
              className="text-cyan-200 text-sm font-semibold"
            >
              Foto (URL)
            </label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="URL da foto (opcional)"
              className="bg-transparent border border-cyan-400/60 rounded px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder-cyan-400/60"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="senha"
              className="text-cyan-200 text-sm font-semibold"
            >
              Senha
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha (mínimo 8 caracteres)"
              className="bg-transparent border border-cyan-400/60 rounded px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder-cyan-400/60"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              autoComplete="new-password"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="confirmarSenha"
              className="text-cyan-200 text-sm font-semibold"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="bg-transparent border border-cyan-400/60 rounded px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder-cyan-400/60"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
              autoComplete="new-password"
            />
          </div>
          <div className="flex justify-around w-full gap-8 mt-2">
            <button
              type="reset"
              className="rounded-xl bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 shadow-lg hover:from-red-300 hover:to-purple-400 text-white font-bold w-1/2 py-2 transition-all duration-200 neon-btn"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg hover:from-cyan-300 hover:to-purple-400 text-white font-bold w-1/2 py-2 flex justify-center transition-all duration-200 neon-btn"
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
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Cadastro;
