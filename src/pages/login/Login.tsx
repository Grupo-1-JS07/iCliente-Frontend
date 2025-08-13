import { Link, useNavigate } from 'react-router-dom';
import { type ChangeEvent, useContext, useEffect, useState } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { AuthContext } from '../../context/AuthContext';
import type UsuarioLogin from '../../models/UsuarioLogin';

function Login() {
  const navigate = useNavigate();

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin,
  );

  useEffect(() => {
    if (usuario.token !== '') {
      navigate('/home');
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
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
          onSubmit={login}
        >
          <h2 className="text-cyan-300 text-3xl font-bold text-center mb-2">
            Entrar
          </h2>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="usuario"
              className="text-cyan-200 text-sm font-semibold"
            >
              E-mail
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="E-mail"
              className="bg-transparent border border-cyan-400/60 rounded px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder-cyan-400/60"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              autoComplete="username"
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
              placeholder="Senha"
              className="bg-transparent border border-cyan-400/60 rounded px-4 py-2 text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-400/80 placeholder-cyan-400/60"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
              autoComplete="current-password"
            />
          </div>
          <div className="flex justify-between text-xs text-cyan-400/80 mb-2">
            <span></span>
            <span className="hover:underline cursor-pointer">
              ESQUECEU A SENHA?
            </span>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-lg hover:from-cyan-300 hover:to-purple-400 text-white font-bold py-2 text-lg transition-all duration-200 neon-btn"
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
              <span>ENTRAR</span>
            )}
          </button>
          <hr className="border-cyan-400/30 w-full my-2" />
          <p className="text-cyan-200 text-center">
            Não tem uma conta?{' '}
            <Link
              to="/cadastro"
              className="text-purple-400 hover:underline font-semibold"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
