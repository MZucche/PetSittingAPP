import '../styles/filtros.css'
import  Profile from '../componentes/Profile'
import  DefaultLayout  from "../layout/DefaultLayout"
import { useAuth } from "../auth/Authprovider"  //"../assets/auth/AuthProvider";
import PortalLayout from '../layout/PortalLayout'

export default function Perfil() {

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
          <Profile/>
        </div>
      </PortalLayout>
    );

  }