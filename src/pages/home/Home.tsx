import { useContext } from "react";
import { Link } from "react-router-dom";


function Home() {

  return (
    <div className="container">
      <div>
        <h1>Autenticar Usuário</h1>
        <h2>
          Seja Bem Vinde: 
        </h2>
        <Link to="/login" className="botao">
          Voltar
        </Link>
      </div>
    </div>
  );
}

export default Home;
