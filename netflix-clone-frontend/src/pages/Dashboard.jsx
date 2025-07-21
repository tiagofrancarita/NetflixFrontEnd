import { useEffect, useState } from "react";
import { parseJwt } from "../utils/jwtHelper";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const payload = parseJwt(token);
      setUser(payload?.sub);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-4">Olá, {user} 👋</h1>
      <p className="text-lg text-zinc-300 mb-8">Bem-vindo ao painel de administração</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-zinc-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Filmes e Séries</h2>
          <p className="text-zinc-400">Gerencie seu catálogo completo de mídia.</p>
          <button
            onClick={() => navigate("/midias")}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Acessar
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-zinc-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Categorias</h2>
          <p className="text-zinc-400">Edite e organize suas categorias.</p>
          <button
            onClick={() => navigate("/categorias")}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Acessar
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-zinc-800 rounded-xl shadow-md p-6 hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Usuários</h2>
          <p className="text-zinc-400">Controle o acesso de administradores.</p>
          <button
            onClick={() => navigate("/usuarios")}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
          >
            Acessar
          </button>
        </div>
      </div>

      <div className="mt-12">
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded text-white"
        >
          Sair
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
