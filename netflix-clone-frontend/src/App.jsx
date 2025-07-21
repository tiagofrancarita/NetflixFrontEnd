import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import CadastroUsuarios from "./pages/CadastroUsuario"; // 👈 nome consistente com o arquivo
import GerenciarUsuarios from "./pages/GerenciarUsuarios"; // 👈 adicione isso


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios/cadastrar" element={<CadastroUsuarios />} /> {/* rota legível */}
              <Route path="/usuarios" element={<GerenciarUsuarios />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
