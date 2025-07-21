import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [ativo, setAtivo] = useState(true);

  const [erro, setErro] = useState(null);
  const [sucesso, setSucesso] = useState(null);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();
    setErro(null);
    setSucesso(null);

    try {
      const token = localStorage.getItem("accessToken");

      const dataNascimentoComHora = dataNascimento ? `${dataNascimento}T00:00:00` : null;
      const status = ativo ? "A" : "I";

      const bodyData = {
        nome,
        email,
        senha,
        cpf,
        dataNascimento: dataNascimentoComHora,
        statusUsuario: status,
      };

      const response = await fetch("http://localhost:8080/netflix/usuarios/cadastrarUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.mensagem || "Erro ao cadastrar");
      }

      setSucesso("Usuário cadastrado com sucesso!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <form
      onSubmit={handleCadastro}
      className="bg-gray-800 max-w-md w-full rounded-xl p-10 shadow-xl ring-1 ring-gray-700"
    >
      <h2 className="text-4xl font-extrabold text-center mb-8 text-red-600">
        Cadastro de Usuários
      </h2>

      {erro && <p className="mb-4 text-center text-red-400">{erro}</p>}
      {sucesso && <p className="mb-4 text-center text-green-400">{sucesso}</p>}

      <div className="space-y-6">
        <div>
          <label className="block mb-1 text-sm text-white">Nome</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-white">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-white">Senha</label>
          <input
            type="password"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-white">CPF</label>
          <input
            type="text"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            placeholder="000.000.000-00"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm text-white">Data de Nascimento</label>
          <input
            type="date"
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="ativo"
            type="checkbox"
            checked={ativo}
            onChange={(e) => setAtivo(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="ativo" className="text-white text-sm">
            Conta ativa
          </label>
        </div>

        <button type="submit" className="w-full py-3 rounded-md bg-red-600 hover:bg-red-700 transition font-semibold text-white">
          Cadastrar Usuario
        </button>
      </div>
    </form>
  );
}
