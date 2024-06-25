import '../styles/filtros2.css'
import  CrearPost from '../componentes/CrearPost'
import  DefaultLayout  from "../layout/DefaultLayout"
import { useAuth } from "../auth/Authprovider"  //"../assets/auth/AuthProvider";
import PortalLayout from '../layout/PortalLayout'
import Prueba from "../componentes/prueba"

export default function Perfil() {

    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
      return(
        <DefaultLayout>
          <div>
              <CrearPost/>
          </div>
        </DefaultLayout>
    
        );
    }else return (     
      <PortalLayout>
        <div>
          <CrearPost/>
        </div>
      </PortalLayout>
    );

  }