import '../styles/filtros.css'
import  DefaultLayout  from "../layout/DefaultLayout"
import { useAuth } from "../auth/Authprovider"  //"../assets/auth/AuthProvider";
import PortalLayout from '../layout/PortalLayout'
import Servicios from '../componentes/Servicios'

export default function Services() {

    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
      return(
        <DefaultLayout>
          <div>
            <p>Inicia sesion para acceder a tu perfil</p>
          </div>
        </DefaultLayout>
    
        );
    }else return (     
      <PortalLayout>
        <div className='centered-container'>
          <Servicios/>
          </div>
      </PortalLayout>
    );

  }