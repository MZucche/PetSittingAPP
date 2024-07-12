import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, password })
      });

      const json = await response.json();
      if (response.ok) {
        setMessage("Contraseña restablecida con éxito.");
        setTimeout(() => navigate("/"), 2000); // Redirige al login después de 2 segundos
      } else {
        setMessage(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DefaultLayout>
      <div className="form-container">
      <h2>Cambiar Contraseña</h2>
      <form className="form" onSubmit={handleSubmit}>
        {!!message && <div className="message">{message}</div>}
        <label>Nueva Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="submit-button-div">
        <button className="submit-button">Restablecer</button>
        </div>
      </form>
      </div>
    </DefaultLayout>
  );
}
