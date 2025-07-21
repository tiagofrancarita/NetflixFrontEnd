import { useEffect, useState } from "react";
import axios from "axios";

export default function GerenciarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [modalAberta, setModalAberta] = useState(false);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    buscarUsuarios();
  }, []);

  const buscarUsuarios = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .get("http://localhost:8080/netflix/usuarios/listarTodos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  };

  const confirmarInativacao = (id) => {
    setUsuarioSelecionado(id);
    setModalAberta(true);
  };

  const inativarUsuario = () => {
    const token = localStorage.getItem("accessToken");
    axios
      .put(
        `http://localhost:8080/netflix/usuarios/inativarPorId/${usuarioSelecionado}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setUsuarios((prev) =>
          prev.map((u) =>
            u.id === usuarioSelecionado ? { ...u, ativo: false } : u
          )
        );
        setMensagem("Usuário inativado com sucesso!");
      })
      .catch((err) => {
        console.error("Erro ao inativar usuário:", err);
        setMensagem("Erro ao inativar usuário.");
      })
      .finally(() => {
        setModalAberta(false);
        setUsuarioSelecionado(null);
        setTimeout(() => setMensagem(""), 4000);
      });
  };

  const editarUsuario = (id) => {
    alert(`Editar usuário ID: ${id}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Gerenciar Usuários</h1>

      {mensagem && (
        <div className="mb-4 p-3 rounded text-white bg-green-600 shadow">
          {mensagem}
        </div>
      )}

      <table className="w-full border border-gray-700 text-left rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="border-b border-gray-700 py-3 px-4">ID</th>
            <th className="border-b border-gray-700 py-3 px-4">Nome</th>
            <th className="border-b border-gray-700 py-3 px-4">E-mail</th>
            <th className="border-b border-gray-700 py-3 px-4">Status</th>
            <th className="border-b border-gray-700 py-3 px-4">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-gray-900 text-white">
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="border-b border-gray-700">
              <td className="py-3 px-4">{usuario.id}</td>
              <td className="py-3 px-4">{usuario.nome}</td>
              <td className="py-3 px-4">{usuario.email}</td>
              <td className="py-3 px-4">
                {usuario.ativo ? (
                  <span className="text-green-400 font-semibold">Ativo</span>
                ) : (
                  <span className="text-red-400 font-semibold">Inativo</span>
                )}
              </td>
              <td className="py-3 px-4 space-x-2">
                {usuario.ativo && (
                  <button
                    onClick={() => confirmarInativacao(usuario.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Inativar
                  </button>
                )}
                <button
                  onClick={() => editarUsuario(usuario.id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
          {usuarios.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-6 text-gray-400">
                Nenhum usuário encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal de Confirmação */}
      {modalAberta && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar Inativação
            </h2>
            <p className="text-gray-700 mb-6">
              Tem certeza de que deseja inativar este usuário?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setModalAberta(false)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
              >
                Não
              </button>
              <button
                onClick={inativarUsuario}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
