import { useContext, useEffect, useState, type ChangeEvent } from "react";
import { AuthContext } from "../../context/AuthContext";
import type Usuario from "../../models/Usuarios";
import { atualizar } from "../../services/Services";
import { useNavigate } from "react-router-dom";
import { ToastAlerta } from "../../utils/ToastAlerta";

function AtualizarPerfil() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [usuarioEditado, setUsuarioEditado] = useState<Usuario>({
    id: usuario.id,
    nome: usuario.nome,
    usuario: usuario.usuario,
    foto: usuario.foto,
    senha: "",
  });

  useEffect(() => {
    if (usuario.token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/home");
    }
  }, [usuario.token]);

  useEffect(() => {
    setUsuarioEditado({
      id: usuario.id,
      nome: usuario.nome,
      usuario: usuario.usuario,
      foto: usuario.foto,
      senha: "",
    });
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioEditado({
      ...usuarioEditado,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const dadosParaEnviar = {
      id: usuarioEditado.id,
      nome: usuarioEditado.nome,
      usuario: usuarioEditado.usuario,
      senha: usuarioEditado.senha || "", // envia string vazia se não mudar senha
      foto: usuarioEditado.foto,
    };

    try {
      await atualizar("/usuarios/atualizar", dadosParaEnviar, () => {}, {
        headers: { Authorization: usuario.token },
      });

      alert("Perfil atualizado com sucesso! Faça login novamente.");
      handleLogout();
      retornar();
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar perfil!");
    }
  }
  function retornar() {
    navigate("/categorias");
  }
  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-cyan-800 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="bg-cyan-800 text-xl text-white font-bold">Atualizar Perfil</h2>

        <input
          type="text"
          name="nome"
          value={usuarioEditado.nome}
          onChange={atualizarEstado}
          placeholder="Nome"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="email"
          name="usuario"
          value={usuarioEditado.usuario}
          onChange={atualizarEstado}
          placeholder="E-mail"
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        />

        <input
          type="text"
          name="foto"
          value={usuarioEditado.foto}
          onChange={atualizarEstado}
          placeholder="URL da foto"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <input
          type="password"
          name="senha"
          value={usuarioEditado.senha || ""}
          onChange={atualizarEstado}
          placeholder="Nova senha (opcional)"
          className="w-full p-2 rounded bg-gray-700 text-white"
        />

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 w-full p-2 rounded text-white font-semibold"
        >
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

export default AtualizarPerfil;
