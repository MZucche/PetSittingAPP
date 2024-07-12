import  DefaultLayout  from "../layout/DefaultLayout"
import { useState } from "react"
import { useAuth } from "../auth/Authprovider"
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import "../styles/registrarse.css"
import "../styles/defaultLayout.css"


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const auth = useAuth();
    const goTo = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Cambia el estado para mostrar/ocultar la contraseña
    };

    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, 
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

                goTo("/") //cuando se inicia sesion lo enviamos a la pagina principal logueado

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
        <div className="form-container">
        <h2>Iniciar Sesion</h2>
        <form className="form" onSubmit={handleSubmit}>
        
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <div className="form-group">
        <label>Email</label>
        <input type="text" value={email} onChange={(e) =>setEmail(e.target.value)}/>
        </div>

        <div className="form-group">
                        <label>Contraseña</label>
                        <div className="password-input-container">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="toggle-password-button"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <svg
                                        className="svg-icon"
                                        style={{ width: '1.7em', height: '1.7em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }}
                                        viewBox="0 0 1024 1024"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M802.219871 221.61333c-10.022261-10.022261-26.278503-10.022261-36.275181 0L221.830271 765.726725c-10.022261 10.022261-10.022261 26.252921 0 36.275182 10.022261 10.022261 26.252921 10.022261 36.275182 0l544.113395-544.113395c9.998725-10.021238 9.998725-26.27748 0.001023-36.275182z" />
                                        <path d="M802.363134 221.99707c-10.022261-10.022261-26.278503-10.022261-36.275182 0L221.973534 766.111488c-10.022261 10.022261-10.022261 26.252921 0 36.275182 10.022261 10.022261 26.252921 10.022261 36.275181 0l544.113395-544.113395c10.024308-9.998725 10.024308-26.253944 0.001024-36.276205zM551.908942 370.744859c-12.660344-3.548826-25.942859-5.610788-39.751353-5.610788-80.990592 0-146.661268 65.670675-146.661268 146.661268 0 13.787004 2.037403 27.093055 5.609765 39.751352l180.802856-180.801832zM473.076502 653.014664c12.467963 3.452635 25.53456 5.442966 39.105647 5.442966 80.990592 0 146.661268-65.670675 146.661267-146.661268 0-13.571087-1.990331-26.637684-5.442966-39.105646L473.076502 653.014664z" />
                                        <path d="M233.914494 688.714747l34.500768-34.500768c-54.498218-36.084846-101.370759-84.252893-136.25629-142.0349C212.671681 378.75223 356.984461 296.394501 512.01228 296.394501c34.742269 0 68.882833 4.339842 101.969392 12.275581l39.032992-39.032992c-45.194318-13.690814-92.594885-21.171182-141.003408-21.171182-176.824241 0-341.011674 96.55201-428.501284 251.965615l-6.616698 11.772115 6.616698 11.773138c37.644365 66.819848 89.5045 122.68418 150.404522 164.737971zM940.490028 500.4305C902.918317 433.657724 851.105255 377.841487 790.30347 335.787696l-34.477232 34.477232c54.402027 36.059264 101.202936 84.180238 136.040372 141.915174-80.488149 133.451408-224.799906 215.784578-379.852284 215.784578-34.646078 0-68.691475-4.339842-101.682867-12.202926l-39.056527 39.056527c45.122687 13.641695 92.428086 21.098527 140.739394 21.098527 176.847777 0 341.036233-96.55201 428.476725-251.989151l6.615675-11.747555-6.616698-11.749602z" />
                                    </svg>
                                ) : (
                                    <svg
                                        className="svg-icon"
                                        style={{ width: '1.7em', height: '1.7em', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden' }}
                                        viewBox="0 0 1024 1024"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M1024 512c0 96-211.2 307.2-512 307.2-294.4 0-512-204.8-512-307.2s217.6-307.2 512-307.2c300.8 0 512 204.8 512 307.2l0 0zM512 262.4c-134.4 0-243.2 108.8-243.2 249.6s108.8 249.6 249.6 249.6c134.4 0 249.6-115.2 249.6-249.6-6.4-140.8-121.6-249.6-256-249.6l0 0zM512 352c-89.6 0-160 70.4-160 160s70.4 160 160 160c89.6 0 160-70.4 160-160s-70.4-160-160-160l0 0z"  />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

        <div className="submit-button-div">
        <button className="submit-button">Iniciar Sesion</button>
        </div>

        <div className="login-footer">
        <p><strong>¿Olvidaste tu contraseña?</strong><br /><a href="/forgottenpassword">Cambiar contraseña</a></p>
        <p><strong>¿Aún no tienes cuenta?</strong><br /><a href="/signup">Registrate aquí</a></p>
        </div>

        </form>
        </div> 
    </DefaultLayout>
    )
}