import  DefaultLayout  from "../layout/DefaultLayout"
import FilterComponent from "../componentes/FilterComponent"
import PetServicesComponent from "../componentes/PetServiceComponent"
import "../styles/filtros.css"
import { useAuth } from "../auth/Authprovider"  //"../assets/auth/AuthProvider";
import PortalLayout from "../layout/PortalLayout"
import { useNavigate } from 'react-router-dom';
import "../styles/defaultLayout.css"
import ServiciosContainer from "../componentes/ServiciosContainer"



export default function Home(){

    const { isAuthenticated, user } = useAuth();

    const navigate = useNavigate();

    const handleSearch = (filters) => {
      // Convertir los filtros a una cadena de consulta
      const queryParams = new URLSearchParams(filters).toString();
      // Navegar a la página de búsqueda con los filtros como parámetros de consulta
      navigate(`/search?${queryParams}`);
    };

    if (!isAuthenticated) {
        return(
            <DefaultLayout>
                <div className="backgroundHome">
                <FilterComponent onSearch={handleSearch}/>
                </div>
                <ServiciosContainer/>
            </DefaultLayout>
    
        );
    }else return (     
        <PortalLayout>
                <div className="backgroundHome">
                <FilterComponent onSearch={handleSearch}/>
                </div>
                <ServiciosContainer/>
        </PortalLayout>
    );

}