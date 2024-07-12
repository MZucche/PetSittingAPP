import React from "react";
import "../styles/defaultLayout.css";
import avatar from "../images/avatar.png"; // Asegúrate de que la ruta sea correcta

export default function DefaultLayout({ children }) {
  return (
    <>
      <header>
        <nav className="navbar-default">
          <div className="navbar-brand"><a href="/">PETservice</a></div>
          <ul className="navbar-links">
            <li><a href="/search">Buscar Servicios</a></li>
            <li><a href="/login">Ofrecer Servicios</a></li>
          </ul>
          <ul className="navbar-auth">
            <li>
              <a href="/login" className="auth-link">
                <img src={avatar} alt="Avatar" className="avatar-img" />
                Iniciar Sesión
              </a>
            </li>
            <li><a href="/signup">Registrarse</a></li>
          </ul>
        </nav>
      </header>

      <main className="children">
        {children}
      </main>
    </>
  );
}
