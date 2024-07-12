import '../styles/filtros.css'
import  ServiceCard from '../componentes/ServiceCard'
import  DefaultLayout  from "../layout/DefaultLayout"
import { useAuth } from "../auth/Authprovider"  //"../assets/auth/AuthProvider";
import PortalLayout from '../layout/PortalLayout'

export default function ServiceInformation() {

    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
      return(
        <DefaultLayout>
            <ServiceCard/>
        </DefaultLayout>
    
        );
    }else return (     
      <PortalLayout>
        <ServiceCard/>
      </PortalLayout>
    );

  }