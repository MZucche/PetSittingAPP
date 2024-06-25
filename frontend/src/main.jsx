import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './assets/routes/Login.jsx';
import Signup from './assets/routes/Signup.jsx';
import Dashboard from './assets/routes/Dashboard.jsx';
import ProtectedRoute from './assets/routes/ProtectedRoute.jsx';
import { AuthProvider } from './assets/auth/Authprovider.jsx';
import ForgottenPassword from './assets/routes/ForgottenPassword.jsx';
import ResetPassword from './assets/routes/ResetPassword.jsx';
import Busqueda from './assets/routes/Busqueda.jsx';
import Home from './assets/routes/Home.jsx';
import Perfil from './assets/routes/Perfil.jsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgottenpassword",
    element: <ForgottenPassword />,
  },
  {
    path: "/profile",
    element: <Perfil />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <Busqueda />,
  },
  {
    path: "/resetpassword/:token",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
