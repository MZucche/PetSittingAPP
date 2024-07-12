import DefaultLayout from "../layout/DefaultLayout";
import { useState } from "react";
import { API_URL } from "../auth/constants";

export default function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/forgottenpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const json = await response.json();
      if (response.ok) {
        setMessage("Se ha enviado un correo para restablecer la contraseña.");
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
        <div className="form-group">
        <label>Correo Electrónico</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="submit-button-div">
        <button className="submit-button">Enviar</button>
        </div>
      </form>
      </div>
    </DefaultLayout>
  );
}
