import '../styles/filtros2.css'
import { Filtros } from '../componentes/filtros'
import { ServiceProvider } from '../componentes/ServiceProvider'
import  DefaultLayout  from "../layout/DefaultLayout"
import { useAuth } from "../auth/Authprovider"  //"../assets/auth/AuthProvider";
import PortalLayout from '../layout/PortalLayout'

export default function Busqueda() {


  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
      return (     
      <DefaultLayout>
      <div className='DefaultLayout'>
      <div>
          <Filtros />
      </div>
      <div className='App'>
          <ServiceProvider userName="kikobeats" name="Marcos Santillan" service="Paseo" location="Belgrano" rating= "5" price="20"/>
          <ServiceProvider userName="juanperez" name="Lucia Di Napoli" service="Paseo" location="Recoleta" rating= "5" price="20"/>
          <ServiceProvider userName="sat" name="Facundo Russo" service="Paseo" location="Palermo" rating= "5" price="20"/>
          <ServiceProvider userName="asdasd" name="Valeria Ocampo" service="Paseo" location="Colegiales" rating= "5" price="20"/>
          <ServiceProvider userName="pedro" name="Mateo Salazar" service="Paseo" location="Recoleta" rating= "5" price="20"/>
      </div>
      </div>
    </DefaultLayout>
  );
  }else return (     
    <PortalLayout>
    <div className='DefaultLayout'>
    <div>
        <Filtros />
    </div>
    <div className='App'>
        <ServiceProvider userName="kikobeats" name="Marcos Santillan" service="Paseo" location="Belgrano" rating= "5" price="20"/>
        <ServiceProvider userName="juanperez" name="Lucia Di Napoli" service="Paseo" location="Recoleta" rating= "5" price="20"/>
        <ServiceProvider userName="sat" name="Facundo Russo" service="Paseo" location="Palermo" rating= "5" price="20"/>
        <ServiceProvider userName="asdasd" name="Valeria Ocampo" service="Paseo" location="Colegiales" rating= "5" price="20"/>
        <ServiceProvider userName="pedro" name="Mateo Salazar" service="Paseo" location="Recoleta" rating= "5" price="20"/>
    </div>
    </div>
  </PortalLayout>
  );
  }