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
      <form className="form" onSubmit={handleSubmit}>
        <h1>Recuperar Contraseña</h1>
        {!!message && <div className="message">{message}</div>}
        <label>Correo Electrónico</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button>Enviar</button>
      </form>
    </DefaultLayout>
  );
}
