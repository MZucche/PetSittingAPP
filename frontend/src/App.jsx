import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './assets/routes/Login.jsx';
import Signup from './assets/routes/Signup.jsx';
import { AuthProvider } from './assets/auth/Authprovider.jsx';
import ForgottenPassword from './assets/routes/ForgottenPassword.jsx';
import ResetPassword from './assets/routes/ResetPassword.jsx';
import BuscarServicios from './assets/routes/BuscarServicios.jsx';
import Home from './assets/routes/Home.jsx';
import Perfil from './assets/routes/Perfil.jsx';
import ServiceInformation from './assets/routes/ServiceInformation.jsx';
import Services from './assets/routes/Services.jsx';

const router = createBrowserRouter([
  {
    path: "/services",
    element: <Services />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/post/:id",
    element: <ServiceInformation />,
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
    element: <BuscarServicios />,
  },
  {
    path: "/resetpassword/:token",
    element: <ResetPassword />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
