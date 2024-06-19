import { useState } from "react"
import  DefaultLayout  from "../layout/DefaultLayout"
import { useAuth } from "../auth/Authprovider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";

export default function Signup(){
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");



    const auth = useAuth();
    const goTo = useNavigate();


    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/signup`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, 
                    surname, 
                    username, 
                    email, 
                    phone, 
                    address, 
                    password,
                }),
            });

            if (response.ok){
                console.log("El usuario se registro cone exito");
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
        <form className="form" onSubmit={handleSubmit} >
        
        <h1>Signup</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

        <label>Nombre</label>
        <input type="text" value={name} onChange={(e) =>setName(e.target.value)} />

        <label>Apellido</label>
        <input type="text" value={surname} onChange={(e) =>setSurname(e.target.value)}/>

        <label>Usuario</label>
        <input type="text" value={username} onChange={(e) =>setUsername(e.target.value)} />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) =>setEmail(e.target.value)}/>

        <label>Telefono</label>
        <input type="tel" value={phone} onChange={(e) =>setPhone(e.target.value)}/>

        <label>Domicilio</label>
        <input type="text" value={address} onChange={(e) =>setAddress(e.target.value)}/>

        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) =>setPassword(e.target.value)}/>

        <button>Registrarse</button>

    </form>
    </DefaultLayout>
    )
}