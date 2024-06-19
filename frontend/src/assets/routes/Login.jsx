import  DefaultLayout  from "../layout/DefaultLayout"
import { useState } from "react"
import { useAuth } from "../auth/Authprovider"
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";


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
                goTo("/")
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
        return <Navigate to="/dashboard" />
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

    </form>
    </DefaultLayout>
    )
}