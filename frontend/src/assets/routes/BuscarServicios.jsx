import React, { useState , useEffect } from 'react';
import FilterComponent from '../componentes/FilterComponent';
import PetServicesComponent from '../componentes/PetServiceComponent';
import '../styles/filtros.css'; // Ajusta la ruta según tu estructura de archivos de estilos
import { useAuth } from "../auth/Authprovider" 
import  DefaultLayout  from "../layout/DefaultLayout"
import PortalLayout from '../layout/PortalLayout'
import { useLocation } from 'react-router-dom';



const BuscarServicios = () => {
  // Estados para los filtros seleccionados
  const location = useLocation();

  const [filters, setFilters] = useState({
    selectedPetType: '',
    selectedServiceType: '',
    selectedFrequency: '',
    selectedDays: [],
    selectedStartDate: '',
    selectedPrice: 100
  });

  // Función para manejar la búsqueda con los filtros seleccionados
  const handleSearch = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = {
      selectedPetType: searchParams.get('selectedPetType') || '',
      selectedServiceType: searchParams.get('selectedServiceType') || '',
      selectedFrequency: searchParams.get('selectedFrequency') || '',
      selectedDays: searchParams.get('selectedDays') ? searchParams.get('selectedDays').split(',') : [],
      selectedStartDate: searchParams.get('selectedStartDate') || '',
      selectedPrice: parseInt(searchParams.get('selectedPrice')) || 100
    };
    setFilters(newFilters);
  }, [location]);

  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
      return (     
      <DefaultLayout>
            <div className="app-container">
      <header className="app-header">
      <div className='div-search'>
        <h1>Buscador de Servicios para Mascotas</h1>
        </div>
      </header>
      <div className="app-content">
        {/* Componente para los filtros */}
        <section className="app-filters">
          <FilterComponent onSearch={handleSearch} />
        </section>
        {/* Componente para mostrar los servicios filtrados */}
        <section className="app-services">
          <PetServicesComponent filters={filters} />
        </section>
      </div>
    </div>
      </DefaultLayout>
    
  );
  }else return (     
    <PortalLayout>
          <div className="app-container">
      <header className="app-header">
        <div className='div-search'>
        <h1>Buscador de Servicios para Mascotas</h1>
        </div>
      </header>
      <div className="app-content">
        {/* Componente para los filtros */}
        <section className="app-filters">
          <FilterComponent onSearch={handleSearch} />
        </section>
        {/* Componente para mostrar los servicios filtrados */}
        <section className="app-services">
          <PetServicesComponent filters={filters} />
        </section>
      </div>
    </div>
    </PortalLayout>
  );

};

export default BuscarServicios;