import React from "react";
import { Link } from "react-router-dom";

export default function DefaultLayout({ children }){
    return (
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
                            <Link to="/Login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
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