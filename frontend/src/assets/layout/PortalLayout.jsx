import React, { useState } from "react";
import { useAuth } from "../auth/Authprovider";
import { API_URL } from "../auth/constants";
import "../styles/portalLayout.css";
import avatar from "../images/avatar.png"; // Asegúrate de que la ruta sea correcta

export default function PortalLayout({ children }) {
  const auth = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  async function handleSignOut(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });

      if (response.ok) {
        auth.signOut();
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-brand"><a href="/">PETservice</a></div>
          <ul className="navbar-links">
            <li><a href="/search">Buscar Servicios</a></li>
            <li><a href="/services">Ofrecer Servicios</a></li>
          </ul>
          <ul className="navbar-auth">
            <li className="dropdown">
              <button
                onClick={() => setDropdownVisible(!dropdownVisible)}
                className="dropdown-button"
              >
                <img src={avatar} alt="Avatar" className="avatar-img" />
                <p className="navbar-links">
                  {auth.getUser()?.name + " " + auth.getUser()?.surname || ""}
                </p>
              </button>
              {dropdownVisible && (
                <ul className="dropdown-menu">
                  <li><a href="/profile">Perfil</a></li>
                  <li><a href="/services">Servicios</a></li>
                  <li><a href="/" onClick={handleSignOut}>Cerrar Sesión</a></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <main className="children">
        {children}
      </main>
    </>
  );
}
