import React from "react";
import { useAuth } from "../auth/Authprovider";
import { Link } from "react-router-dom";
import {API_URL} from "../auth/constants"
import "../styles/defaultLayout.css"

export default function PortalLayout({children}){

    const auth = useAuth();
    
    async function handleSignOut(e){
        e.preventDefault();
        try {
            const response = await fetch (`${API_URL}/signout`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getRefreshToken()}`,
                }
            })

            if(response.ok){
                auth.signOut();
            }
        } catch (error) {
        }
    }

    return(
        <>
        <header>
                <nav className="nav">
                    <ul>                       
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/search">Busqueda</Link>
                        </li>
                    </ul>
                    <span className="span-layout">
                    <ul>
                        <li>
                            <Link to="/profile">Perfil</Link>
                        </li>
                        <li>
                            <a href="#" onClick={handleSignOut}>
                            Sign out
                            </a>
                        </li>
                    </ul>                  
                    </span>
                </nav>
            </header>

            <main>
                {children}
            </main>

        </>
    )
}