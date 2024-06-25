import  DefaultLayout  from "../layout/DefaultLayout"
import { Filtros } from "../componentes/filtros"
import "../styles/filtros2.css"
import { useAuth } from "../auth/Authprovider"  //"../assets/auth/AuthProvider";
import PortalLayout from "../layout/PortalLayout"

export default function Home(){

    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return(
            <DefaultLayout>
    
                <Filtros/>
    
            </DefaultLayout>
    
        );
    }else return (     
      <PortalLayout>
                <Filtros/>
    </PortalLayout>
    );

}