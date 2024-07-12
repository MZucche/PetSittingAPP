import React, { useEffect, useState } from 'react';
import '../styles/filterComponent.css'; // Asegúrate de importar correctamente tus estilos CSS
import { useAuth } from "../auth/Authprovider";
import catIcon from "../images/cat.png";
import dogIcon from "../images/dog.png";
import hamIcon from "../images/ham.png";
import birdIcon from "../images/bird.png";
import fishIcon from "../images/fish.png";

const FilterComponent = ({ onSearch }) => {

  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const zones = [
    'Agronomía', 'Almagro', 'Balvanera', 'Barracas', 'Belgrano', 'Boedo', 'Caballito',
    'Chacarita', 'Coghlan', 'Colegiales', 'Constitución', 'Flores', 'Floresta', 'La Boca',
    'La Paternal', 'Liniers', 'Mataderos', 'Monte Castro', 'Montserrat', 'Nueva Pompeya',
    'Nuñez', 'Palermo', 'Parque Avellaneda', 'Parque Chacabuco', 'Parque Chas', 'Parque Patricios',
    'Puerto Madero', 'Recoleta', 'Retiro', 'Saavedra', 'San Cristobal', 'San Nicolas', 'San Telmo',
    'Versalles', 'Villa Crespo', 'Villa Devoto', 'Villa General Mitre', 'Villa Lugano', 'Villa Luro',
    'Villa Ortuzar', 'Villa Pueyrredon', 'Villa Real', 'Villa Riachuelo', 'Villa Santa Rita', 'Villa Soldati',
    'Villa Urquiza', 'Villa del Parque', 'Velez Sarsfield'
  ];

  // Estados para los filtros seleccionados
  const [selectedPetType, setSelectedPetType] = useState('');
  const [selectedServiceType, setSelectedServiceType] = useState('');
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(100);
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [tempSelectedZone, setTempSelectedZone] = useState('');
  const [tempSelectedRating, setTempSelectedRating] = useState(0);


  // Estados temporales para los filtros
  const [tempSelectedPetType, setTempSelectedPetType] = useState('');
  const [tempSelectedServiceType, setTempSelectedServiceType] = useState('');
  const [tempSelectedFrequency, setTempSelectedFrequency] = useState('');
  const [tempSelectedDays, setTempSelectedDays] = useState([]);
  const [tempSelectedStartDate, setTempSelectedStartDate] = useState('');
  const [tempSelectedPrice, setTempSelectedPrice] = useState(100);

  const { isAuthenticated, getAccessToken, getUser } = useAuth();

  const handleSearch = () => {
    // Actualiza los estados seleccionados con los valores temporales
    setSelectedPetType(tempSelectedPetType);
    setSelectedServiceType(tempSelectedServiceType);
    setSelectedFrequency(tempSelectedFrequency);
    setSelectedDays(tempSelectedDays);
    setSelectedStartDate(tempSelectedStartDate);
    setSelectedPrice(tempSelectedPrice);
    setSelectedZone(tempSelectedZone);
    setSelectedRating(tempSelectedRating);
  
    // Pasa los filtros seleccionados al componente padre a través de onSearch
    onSearch({
      selectedPetType: tempSelectedPetType,
      selectedServiceType: tempSelectedServiceType,
      selectedFrequency: tempSelectedFrequency,
      selectedDays: tempSelectedDays,
      selectedStartDate: tempSelectedStartDate,
      selectedPrice: tempSelectedPrice,
      selectedZone: tempSelectedZone,
      selectedRating: tempSelectedRating,
    });
  };

  const handleRatingChange = (rating) => {
    setTempSelectedRating(rating);
  };

  const handlePetTypeChange = (e) => {
    setTempSelectedPetType(e.target.value);
  };

  const handleZoneChange = (e) => {
    setTempSelectedZone(e.target.value);
  };

  const handleServiceTypeChange = (serviceType) => {
    if (tempSelectedServiceType === serviceType) {
      setTempSelectedServiceType(''); // Deselect if already selected
    } else {
      setTempSelectedServiceType(serviceType);
    }
  };

  const handleFrequencyChange = (e) => {
    setTempSelectedFrequency(e.target.value);
    if (e.target.value !== 'semanal') {
      setTempSelectedDays([]);
    }
  };

  const handleDayChange = (e) => {
    const day = e.target.value;
    if (e.target.checked) {
      setTempSelectedDays([...tempSelectedDays, day]);
    } else {
      setTempSelectedDays(tempSelectedDays.filter(d => d !== day));
    }
  };

  const handleDayToggle = (day) => {
    setTempSelectedDays(prevDays => 
      prevDays.includes(day)
        ? prevDays.filter(d => d !== day)
        : [...prevDays, day]
    );
  };

  const handleFrecuencyToggle = (frequency) => {
    setTempSelectedFrequency(prevFrec => 
      prevFrec.includes(frequency)
        ? prevFrec.filter(frec => frec !== frequency)
        : [...prevFrec, frequency]
    );
  };  

  const handleStartDateChange = (e) => {
    setTempSelectedStartDate(e.target.value);
  };

  const handlePriceChange = (e) => {
    setTempSelectedPrice(e.target.value);
  };

  useEffect(() => {
    applyFilters();
  }, [tempSelectedPetType, tempSelectedServiceType, tempSelectedFrequency, tempSelectedDays, tempSelectedStartDate, tempSelectedPrice, tempSelectedZone, tempSelectedRating]);

  const toggleSelectionPet = (petType) => {
    if (tempSelectedPetType === petType) {
      setTempSelectedPetType(''); // Deselect if already selected
    } else {
      setTempSelectedPetType(petType);
    }
  };

  const toggleSelectionService = (serviceType) => {
    if (tempSelectedServiceType === serviceType) {
      setTempSelectedServiceType(''); // Deselect if already selected
    } else {
      setTempSelectedServiceType(serviceType);
    }
  };

  const toggleSelectionFrec = (frequency) => {
    if (tempSelectedFrequency === frequency) {
      setTempSelectedFrequency(''); // Deselect if already selected
    } else {
      setTempSelectedFrequency(frequency);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [selectedPetType, selectedServiceType, selectedFrequency, selectedDays, selectedStartDate, selectedPrice, selectedZone, selectedRating, services]);

  const applyFilters = () => {
    let filtered = services.filter(service => {
      if (selectedPetType && service.petType !== selectedPetType) {
        return false;
      }
      if (selectedServiceType && service.serviceType !== selectedServiceType) {
        return false;
      }
      if (selectedFrequency.length > 0 && !selectedFrequency.includes(service.frequency.toLowerCase())) {
        return false;
      }
      if (selectedDays.length > 0 && !selectedDays.some(day => service.days.includes(day.toLowerCase()))) {
        return false;
      }
      if (selectedStartDate && new Date(service.startDate) < new Date(selectedStartDate)) {
        return false;
      }
      if (selectedPrice && service.price > selectedPrice) {
        return false;
      }
      if (selectedZone && service.zone !== selectedZone) {
        return false;
      }
      if (selectedRating > 0 && service.rating < selectedRating) {
        return false;
      }
      return true;
    });
  
    setFilteredServices(filtered);
    setLoading(false); // Una vez aplicados los filtros, cambiar el estado de carga
  };
  
  

  return (
    <div className='whisker-wrapper'>
      <div className='paw-print-section'>
        <h3>Mascota</h3>
        <div className='critter-icons'>
          <img src={catIcon} alt='cat' className={tempSelectedPetType === 'cat' ? 'fur-selected' : ''} onClick={() => toggleSelectionPet('cat')} />
          <img src={dogIcon} alt='dog' className={tempSelectedPetType === 'dog' ? 'fur-selected' : ''} onClick={() => toggleSelectionPet('dog')} />
          <img src={hamIcon} alt='ham' className={tempSelectedPetType === 'ham' ? 'fur-selected' : ''} onClick={() => toggleSelectionPet('ham')} />
          <img src={birdIcon} alt='bird' className={tempSelectedPetType === 'bird' ? 'fur-selected' : ''} onClick={() => toggleSelectionPet('bird')} />
          <img src={fishIcon} alt='fish' className={tempSelectedPetType === 'fish' ? 'fur-selected' : ''} onClick={() => toggleSelectionPet('fish')} />
        </div>
      </div>

      <div className='paw-print-section'>
        <h3>Servicio</h3>
        <div className='kibble-buttons'>
          {(tempSelectedPetType === 'dog' || tempSelectedPetType === '') && (
            <>
              <button className={tempSelectedServiceType === 'adiestramiento' ? 'kibble-selected' : ''} onClick={() => handleServiceTypeChange('adiestramiento')}>Adiestramiento</button>
              <button className={tempSelectedServiceType === 'cuidadoDomestico' ? 'kibble-selected' : ''} onClick={() => handleServiceTypeChange('cuidadoDomestico')}>Cuidado Domestico</button>
              <button className={tempSelectedServiceType === 'paseo' ? 'kibble-selected' : ''} onClick={() => handleServiceTypeChange('paseo')}>Paseo</button>
            </>
          )}
          {tempSelectedPetType === 'cat' && (
            <>
              <button className={tempSelectedServiceType === 'adiestramiento' ? 'kibble-selected' : ''} onClick={() => handleServiceTypeChange('adiestramiento')}>Adiestramiento</button>
              <button className={tempSelectedServiceType === 'cuidadoDomestico' ? 'kibble-selected' : ''} onClick={() => handleServiceTypeChange('cuidadoDomestico')}>Cuidado Domestico</button>
            </>
          )}
          {tempSelectedPetType !== 'dog' && tempSelectedPetType !== 'cat' && tempSelectedPetType !== '' && (
            <button className={tempSelectedServiceType === 'cuidadoDomestico' ? 'kibble-selected' : ''} onClick={() => handleServiceTypeChange('cuidadoDomestico')}>Cuidado Domestico</button>
          )}
        </div>
      </div>

      <div className='paw-print-section'>
        <h3>Frecuencia</h3>
        <div className='tail-wag-buttons'>
            <div className='day-buttons'>
              {['unicaVez', 'diaria', 'semanal', 'mensual'].map((frecuency, index) => (
                <button
                  key={frecuency}
                  className={tempSelectedFrequency.includes(frecuency.toLowerCase()) ? 'day-button selected' : 'day-button'}
                  onClick={() => handleFrecuencyToggle(frecuency.toLowerCase())}
                >
                  {frecuency}
                </button>
              ))}
            </div>
        </div>
      </div>

      {tempSelectedFrequency.includes('semanal') && (
  <div className='paw-print-section'>
    <h3>Días de la Semana</h3>
    <div className='day-buttons'>
      {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map((day, index) => (
        <button
          key={day}
          className={tempSelectedDays.includes(day.toLowerCase()) ? 'day-button selected' : 'day-button'}
          onClick={() => handleDayToggle(day.toLowerCase())}
        >
          {day}
        </button>
      ))}
    </div>
  </div>
)}

<div className='paw-print-section'>
  <h3>Zona</h3>
  <div className='whisker-inputs'>
    <div className="custom-select-wrapper">
      <select 
        className="custom-select"
        value={tempSelectedZone} 
        onChange={handleZoneChange}
      >
        <option value="">Selecciona una zona</option>
        {zones.map((zone) => (
          <option key={zone} value={zone}>{zone}</option>
        ))}
      </select>
      <span className="custom-select-arrow"></span>
    </div>
  </div>
</div>

      <div className='paw-print-section'>
        <h3>Precio Máximo</h3>
        <div className='whisker-inputs'>
          <input
            type="range"
            min="0"
            max="100"
            value={tempSelectedPrice}
            onChange={handlePriceChange}
          />
          <span>${tempSelectedPrice}</span>
        </div>
      </div>

      <div className='paw-print-section'>
        <h3>Rating</h3>
        <div className='star-rating'>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} filled={star <= tempSelectedRating} onClick={() => handleRatingChange(star)} />
          ))}
        </div>
      </div>


      <button className='fetch-button' onClick={handleSearch}>Buscar Servicio</button>
    </div>
  );
};

const Star = ({ filled, onClick }) => (
  <svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill={filled ? "#FFD700" : "gray"} d="M12 2l2.2 6.6H22l-5.7 4.2 2.2 6.7-5.8-4.2-5.8 4.2 2.2-6.7L2 8.6h7.8z"/>
  </svg>
);

export default FilterComponent;
