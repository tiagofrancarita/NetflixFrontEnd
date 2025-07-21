import { useState } from "react";
import { useNavigate } from "react-router-dom";  // importa o hook

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);
  const navigate = useNavigate();  // inicializa o hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);

    try {
      const response = await fetch("http://localhost:8080/netflix/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("E-mail ou senha inválidos");
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken); // salvar token JWT

      navigate("/dashboard");  // faz o redirecionamento via React Router
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 max-w-md w-full rounded-xl p-10 shadow-xl ring-1 ring-gray-700"
    >
      <h2 className="text-4xl font-extrabold text-center mb-8 text-red-600">
        Entrar
      </h2>

      {erro && (
        <p className="mb-6 text-center text-red-400 font-medium">{erro}</p>
      )}

      <label htmlFor="email" className="block mb-2 font-semibold text-gray-300">
        E-mail
      </label>
      <input
        id="email"
        type="email"
        placeholder="seu@email.com"
        className="w-full mb-6 px-4 py-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="username"
      />

      <label htmlFor="senha" className="block mb-2 font-semibold text-gray-300">
        Senha
      </label>
      <input
        id="senha"
        type="password"
        placeholder="********"
        className="w-full mb-8 px-4 py-3 rounded-md bg-gray-700 border border-gray-600 placeholder-gray-400 text-white focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
        autoComplete="current-password"
      />

      <button
        type="submit"
        className="w-full py-3 rounded-md bg-red-600 hover:bg-red-700 transition font-semibold text-white shadow-md focus:outline-none focus:ring-4 focus:ring-red-500/50"
      >
        Entrar
      </button>
    </form>
  );
}
