import  DefaultLayout  from "../layout/DefaultLayout"
import { useState } from "react"
import { useAuth } from "../auth/Authprovider"
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import { Link } from "react-router-dom";


export default function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, 
                    password,
                }),
            });

            if (response.ok){
                console.log("Inicio de sesion exitoso");
                setErrorResponse("");
                const json = await response.json();
                if (json.body.accessToken && json.body.refreshToken){
                    auth.saveUser(json)
                }

                goTo("/Dashboard") //cuando se inicia sesion lo enviamos a la pagina principal logueado

            }else{
                console.log("Ocurrio un error inesperado");
                const json = await response.json();
                setErrorResponse(json.body.error);
                return;
            }

        } catch (error) {
            console.log(error);
        }
    }

    if (auth.isAuthenticated){
        return <Navigate to="/" />
    }

    return (
    <DefaultLayout> 
        <form className="form" onSubmit={handleSubmit}>
        
        <h1>Login</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Usuario</label>
        <input type="text" value={username} onChange={(e) =>setUsername(e.target.value)}/>

        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>

        <button>Login</button>

        <ul>
        <li>
            <Link to="/ForgottenPassword">Recuperar Contraseña</Link>
        </li>
        </ul>

    </form>
    </DefaultLayout>
    )
}