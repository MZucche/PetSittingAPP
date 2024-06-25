import { useState } from "react"

    const initialState = {
        animals: {
          dog: false,
          cat: false,
          ham: false,
          bird: false,
          fish: false,
        },
        services: {
          adiestramiento: false,
          cuidadoDomestico: false,
          paseo: false,
        },
        frequencies: {
          unicavez: false,
          diaria: false,
          semanal: false,
          mensual: false,
        },
        dias: {
            lunes: false,
            martes: false,
            miercoles: false,
            jueves: false,
            viernes: false,
            sabado: false,
            domingo: false,
        }
      };



      
export const Filtros = () => {
    
    const [selection, setSelection] = useState(initialState);
    const [availabilityDates, setAvailabilityDates] = useState({ startDate: "", endDate: "" });
    const [price, setPrice] = useState("");
    const [selectedZones, setSelectedZones] = useState([]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem("token");
        const filtros = {
          petType: getSelectedKey(selection.animals),
          serviceType: getSelectedKey(selection.services),
          availabilityFrequency: getSelectedKey(selection.frequencies),
          availabilityDays: getSelectedDays(selection.dias),
          availabilityDates,
          price,
          selectedZones,
        };
        
        const response = await axios.get("http://localhost:3100/api/posts", {
          params: filtros,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("Publicaciones filtradas:", response.data);
        alert("Publicaciones buscadas");
      } catch (error) {
        console.error("Error buscando la publicación:", error);
        alert("Error buscando la publicación");
      }
    };
    const toggleSelection = (category, item) => {
      setSelection((prev) => {
        const updatedCategory = Object.fromEntries(
          Object.entries(prev[category]).map(([key]) => [key, key === item ? !prev[category][key] : false])
        );
        return {
          ...prev,
          [category]: updatedCategory
        };
      });
    };

    const toggleDaySelection = (category, item) => {
        setSelection((prev) => ({
          ...prev,
          [category]: {
            ...prev[category],
            [item]: !prev[category][item],
          }
        }));
      };
  
    const displayServices = () => {
        if (selection.animals.dog) {
            return ['adiestramiento', 'cuidadoDomestico', 'paseo'];
        } else if (selection.animals.cat){
            return ['adiestramiento', 'cuidadoDomestico']
        } else if (selection.animals.ham || selection.animals.bird || selection.animals.fish) {
            return ['cuidadoDomestico'];
        } else {
            return ['adiestramiento', 'cuidadoDomestico', 'paseo'];
        }
      };
  
    const getClassName = (category, item) => 
      selection[category][item] ? `button-selected-${category}` : `button-notSelected-${category}`;

    const getSelectedKey = (category) => {
        const selectedKey = Object.keys(category).find((key) => category[key]);
        return selectedKey || "";
      };
    
      const getSelectedDays = (dias) => {
        return Object.keys(dias).filter((key) => dias[key]);
      };
  
    return (
        <form onSubmit={handleSubmit} className="filtros-article">
            <div className="filtros-div">
                <h1 className="filtros-h1">Mascota</h1>
                <div>
                    <svg className={getClassName('animals' , 'dog')} onClick={() => toggleSelection('animals', 'dog')} width="100px" height="100px" viewBox="-18.54 0 96 96" xmlns="http://www.w3.org/2000/svg"><g transform="translate(-563.134 -40.981)"><path d="M588.242,61.98s-12.91-17.986-17.763-20.739c-3.464-1.965-1.791,7.6-2.5,15.545s.379,18.429,7.168,21.967Z" fill="#f37777"/><path d="M586.735,63.911s-10.661-10.119-11.745-7.094-2.231,15.7.913,17.2Z" fill="#d45757"/><path d="M588.242,61.98s-12.91-17.986-17.763-20.739c2.547,2.117,10.276,21.024,12.831,27.059Z" fill="#5c4f52"/><path d="M592.59,59.962s-5.464-1.8-6.879-1.286-12.8,12.035-13.949,17.1c-3.966,17.541-7.8,19.615-8.567,24.943s5.931,15.587,8.824,22.53,14.721,6.283,20.571,13.732Z" fill="#f7a747"/><path d="M580.369,104.065s-4.75-5.533-4.75-4.761,5.39,11.764,8.191,13.114,3.38,4.05,8.78,4.05v-8.619s-5.657,1.676-6.879,1.29S580.369,104.065,580.369,104.065Z" fill="#262128"/><path d="M586.735,108.936a52.716,52.716,0,0,1,1.264,9.3c.124,3.138-1.077,7.187,0,8.32,2.773,2.915,4.591,3.251,4.591,3.251v-20.87Z" fill="#f37777"/><path d="M584.1,74.02c-1.8.5-7.585,3.513-8.485,5.929s4.891,4.537,6.046,5.694-.492,5.014,1.3,3.857,2.871-5.493,3.775-7.857S585.7,73.581,584.1,74.02Z" fill="#5c4f52"/><path d="M592.59,80.354c-5.855,0-7.43,12.869-8.78,14.476s-4.913,6.58-4.913,8.587,4.95,7.793,6.814,8.179,6.879-1.506,6.879-1.506Z" fill="#5c4f52"/><path d="M592.59,97.87s-4.691-.5-4.691,1.586,2.675,4.163,4.691,4.163Z" fill="#3f3941"/><path d="M590.212,101.934s-1.817-1.685-.627-1.784S592.173,103.047,590.212,101.934Z" fill="#262128"/><path d="M585.2,81.092c-.477-1.141-1.384-3.558-3.862-2.971a15.367,15.367,0,0,0-3.727,1.316.163.163,0,0,0,.035.3,1.76,1.76,0,0,1,.991.615,5.338,5.338,0,0,0,2.638,2.13c.976.338,2.371-.39,3.229-.389a1.855,1.855,0,0,1,.948.544.167.167,0,0,0,.263-.189C585.539,81.974,585.32,81.386,585.2,81.092Z" fill="#3f3941"/><ellipse cx="2.145" cy="2.212" rx="2.145" ry="2.212" transform="translate(579.519 78.095)" fill="#f7a747"/><ellipse cx="1.295" cy="1.336" rx="1.295" ry="1.336" transform="translate(580.369 78.971)" fill="#3d2a2e"/><ellipse cx="0.4" cy="0.412" rx="0.4" ry="0.412" transform="translate(580.242 79.124)" fill="#fbfcfc"/><path d="M596.937,61.98s12.91-17.986,17.763-20.739c3.465-1.965,1.791,7.6,2.5,15.545s-.38,18.429-7.169,21.967Z" fill="#f37777"/><path d="M598.444,63.911S609.1,53.792,610.19,56.817s2.23,15.7-.914,17.2Z" fill="#d45757"/><path d="M596.937,61.98s12.91-17.986,17.763-20.739c-2.547,2.117-10.276,21.024-12.83,27.059Z" fill="#5c4f52"/><path d="M592.59,59.962s5.464-1.8,6.878-1.286,12.8,12.035,13.949,17.1c3.966,17.541,7.795,19.615,8.567,24.943s-5.931,15.587-8.824,22.53-14.721,6.283-20.57,13.732Z" fill="#f7a747"/><path d="M604.81,104.065s4.75-5.533,4.75-4.761-5.39,11.764-8.191,13.114-3.38,4.05-8.779,4.05v-8.619s5.657,1.676,6.878,1.29S604.81,104.065,604.81,104.065Z" fill="#262128"/><path d="M598.444,108.936a52.827,52.827,0,0,0-1.264,9.3c-.124,3.138,1.078,7.187,0,8.32-2.772,2.915-4.59,3.251-4.59,3.251v-20.87Z" fill="#f37777"/><path d="M601.075,74.02c1.8.5,7.585,3.513,8.485,5.929s-4.891,4.537-6.045,5.694.491,5.014-1.3,3.857-2.871-5.493-3.775-7.857S599.483,73.581,601.075,74.02Z" fill="#5c4f52"/><path d="M592.59,80.354c5.854,0,7.429,12.869,8.779,14.476s4.913,6.58,4.913,8.587-4.95,7.793-6.814,8.179-6.878-1.506-6.878-1.506Z" fill="#5c4f52"/><path d="M592.59,97.87s4.69-.5,4.69,1.586-2.675,4.163-4.69,4.163Z" fill="#3f3941"/><path d="M594.967,101.934s1.817-1.685.628-1.784S593.006,103.047,594.967,101.934Z" fill="#262128"/><path d="M599.982,81.092c.477-1.141,1.384-3.558,3.863-2.971a15.352,15.352,0,0,1,3.726,1.316.162.162,0,0,1-.035.3,1.761,1.761,0,0,0-.99.615,5.346,5.346,0,0,1-2.639,2.13c-.975.338-2.37-.39-3.228-.389a1.847,1.847,0,0,0-.948.544.167.167,0,0,1-.264-.189C599.64,81.974,599.859,81.386,599.982,81.092Z" fill="#3f3941"/><ellipse cx="2.145" cy="2.212" rx="2.145" ry="2.212" transform="translate(601.369 78.095)" fill="#f7a747"/><ellipse cx="1.295" cy="1.336" rx="1.295" ry="1.336" transform="translate(602.219 78.971)" fill="#3d2a2e"/><ellipse cx="0.4" cy="0.412" rx="0.4" ry="0.412" transform="translate(604.138 79.124)" fill="#fbfcfc"/></g></svg>
                    <svg className={getClassName('animals' , 'cat')} onClick={() => toggleSelection('animals', 'cat')} width="100px" height="100px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M564.9 273.2V106.9c0-0.9-0.7-1.6-1.6-1.6-0.1 0-0.5 0-0.9 0.3L478.9 189c-6.9 6.9-17.7 8-25.8 2.5-29.2-19.5-63.3-29.8-98.5-29.8s-69.3 10.3-98.5 29.8c-8.1 5.4-18.9 4.4-25.8-2.5l-83.4-83.4c-0.4-0.3-0.8-0.3-0.9-0.3-0.9 0-1.6 0.7-1.6 1.6v166.3c0 12.9 1.2 25.8 3.5 38.6l62.4 8.3c11.2 1.5 19.1 11.8 17.6 23-1.3 10.3-10.1 17.7-20.2 17.7-0.9 0-1.8 0-2.7-0.2l-45-6c2.9 7.6 6.2 15 9.9 22.3l36-3c11.3-1 21.2 7.4 22.1 18.6 1 11.2-7.4 21.1-18.6 22.1l-14.8 1.2c3.8 4.9 7.9 9.8 12.1 14.4 40.5 44.3 93.1 68.7 148 68.7s107.5-24.4 148-68.7c4.2-4.6 8.3-9.4 12.1-14.4l-14.8-1.2c-11.2-1-19.6-10.9-18.6-22.1 1-11.3 10.8-19.6 22.1-18.6l36.1 3c3.7-7.3 7-14.7 9.9-22.3l-45 6c-0.9 0.1-1.8 0.2-2.7 0.2-10.1 0-18.9-7.5-20.2-17.7-1.5-11.2 6.4-21.5 17.6-23l62.4-8.3c2.1-12.8 3.3-25.7 3.3-38.6z m283.6 570.3c65.7-109.7 30-250.7-81.3-320.9L573.4 400.1c-11 20.7-24.6 40.2-40.6 57.7-48.4 52.9-111.6 82-178.2 82-26.5 0-52.6-4.6-77.3-13.6-0.2 6.7-0.3 13.5-0.1 20.3 1.5 55.7 16.9 110.5 44.7 158.4 2.7 4.7 3.3 9.9 2.2 14.8V856c0 11.3-9.2 20.4-20.4 20.4h-21.2c-11.7 0-21.3 9.5-21.3 21.2v21.3h104.2c11.3 0 20.4-9.2 20.4-20.4v-151c0-11.3 9.1-20.4 20.4-20.4 11.3 0 20.4 9.1 20.4 20.4v130.7h20.2c7.5-27.4 32.6-47.7 62.4-47.7h29.4c-6.5-19.5-9.9-40-9.9-60.6 0-104.8 85.2-190 190-190 11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.2 20.4-20.4 20.4-82.2 0-149.1 66.9-149.1 149.2 0 24.9 6.3 49.5 18.1 71.3 3.5 6.3 3.3 14-0.4 20.2-3.7 6.2-10.4 10-17.6 10h-60.5c-13.1 0-23.8 10.7-23.8 23.8V919h233.3c47.2 0 92.1-22.7 120.1-60.8l9.7-14.7z m33-262.4V319.5c0-9.8-3.8-19-10.7-25.9-6.9-6.9-16.2-10.8-26-10.8-20.2 0-36.7 16.5-36.7 36.7v181.6c30.2 22.5 54.8 49.8 73.4 80z m40.9-261.6v397.8c0 0.4 0 0.8-0.1 1.2 1.2 49.8-11.3 100.3-38.8 146.2-0.1 0.2-0.3 0.5-0.4 0.7-0.1 0.1-0.1 0.2-0.2 0.2-3.3 5.7-6.9 11.2-10.8 16.4-35.6 48.8-93 77.9-153.4 77.9H485c-22.3 0-40.4-18.2-40.4-40.4v-0.5h-21.4c-8.4 23.8-31.2 40.9-57.8 40.9H259.6c-21.6 0-39.2-17.6-39.2-39.3v-22.9c0-34.3 27.9-62.1 62.1-62.1h0.8v-116c-29.1-52.4-45.3-111.7-46.9-171.9-0.4-13.5 0-26.9 1.1-40.1-22.1-12.9-42.6-29.6-61-49.7-46.3-50.7-72.9-118-72.9-184.7V106.9c0-23.4 19-42.5 42.5-42.5 10.8 0 21.1 4 28.9 11.4l0.5 0.5 72.4 72.4c32.5-18.3 69.1-27.8 106.8-27.8s74.2 9.6 106.8 27.8l72.4-72.4 0.5-0.5c7.9-7.3 18.2-11.4 28.9-11.4 23.4 0 42.5 19.1 42.5 42.5v166.3c0 30.1-5.4 60.4-15.7 89.1l177.1 111.9V319.5c0-42.8 34.8-77.6 77.6-77.6 20.7 0 40.2 8.1 54.8 22.7 14.7 14.7 22.8 34.2 22.8 54.9z" fill="#663333" /><path d="M881.5 319.5v261.6c-18.5-30.2-43.2-57.5-73.4-80V319.5c0-20.2 16.5-36.7 36.7-36.7 9.8 0 19 3.8 26 10.8 6.9 6.9 10.7 16.1 10.7 25.9z" fill="#B2ABAC" /><path d="M767.2 522.6c111.3 70.3 147 211.2 81.3 320.9l-9.7 14.8c-28 38-72.9 60.8-120.1 60.8H485.4v-23.8c0-13.1 10.7-23.8 23.8-23.8h60.5c7.2 0 13.9-3.8 17.6-10 3.7-6.2 3.8-13.9 0.4-20.2-11.8-21.7-18.1-46.4-18.1-71.3 0-82.3 66.9-149.2 149.1-149.2 11.3 0 20.4-9.2 20.4-20.4 0-11.3-9.2-20.4-20.4-20.4-104.8 0-190 85.2-190 190 0 20.6 3.4 41.1 9.9 60.6h-29.4c-29.8 0-54.9 20.2-62.4 47.7h-20.2V747.5c0-11.3-9.2-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v151.1c0 11.3-9.2 20.4-20.4 20.4H261.2v-21.3c0-11.7 9.5-21.2 21.3-21.2h21.2c11.3 0 20.4-9.2 20.4-20.4V719.8c1.1-4.9 0.5-10.1-2.2-14.8-27.8-47.9-43.2-102.7-44.7-158.4-0.2-6.8-0.1-13.6 0.1-20.3 24.8 8.9 50.8 13.6 77.3 13.6 66.6 0 129.8-29.1 178.2-82 16-17.5 29.6-37 40.6-57.7l193.8 122.4z" fill="#B2ABAC" /><path d="M821.1 682.6c11 44.8 4.2 91.4-19.2 131.2-3.8 6.5-10.6 10.1-17.6 10.1-3.5 0-7.1-0.9-10.3-2.8-9.8-5.7-13-18.2-7.3-28 18-30.6 23.2-66.4 14.7-100.8-2.7-11 4-22 15-24.7 10.9-2.6 22 4.1 24.7 15z" fill="#663333" /><path d="M564.9 106.9v166.3c0 12.9-1.2 25.8-3.5 38.6L499 320c-11.2 1.5-19.1 11.8-17.6 23 1.4 10.3 10.1 17.7 20.2 17.7 0.9 0 1.8-0.1 2.7-0.2l45-6c-2.9 7.6-6.2 15-9.9 22.3l-36.1-3c-11.3-1-21.1 7.4-22.1 18.6-0.9 11.2 7.4 21.1 18.6 22.1l14.8 1.2c-3.8 4.9-7.9 9.8-12.1 14.4-40.5 44.3-93.1 68.7-148 68.7s-107.5-24.4-148-68.7c-4.2-4.6-8.3-9.4-12.1-14.4l14.8-1.2c11.2-1 19.6-10.9 18.6-22.1-0.9-11.3-10.8-19.6-22.1-18.6l-36 3c-3.7-7.3-7-14.7-9.9-22.3l45 6c0.9 0.1 1.8 0.2 2.7 0.2 10.1 0 18.9-7.5 20.2-17.7 1.5-11.2-6.4-21.5-17.6-23l-62.4-8.3c-2.3-12.8-3.5-25.7-3.5-38.6V106.9c0-0.9 0.7-1.6 1.6-1.6 0.1 0 0.5 0 0.9 0.3l83.4 83.4c6.9 6.9 17.7 8 25.8 2.5 29.2-19.5 63.3-29.8 98.5-29.8s69.3 10.3 98.5 29.8c8.1 5.4 18.9 4.4 25.8-2.5l83.4-83.4c0.4-0.3 0.8-0.3 0.9-0.3 1.1 0 1.9 0.7 1.9 1.6z" fill="#B2ABAC" /><path d="M481.4 277.9m-20 0a20 20 0 1 0 40 0 20 20 0 1 0-40 0Z" fill="#663333" /><path d="M414.5 356.4c5 8.8 1.9 20.1-6.9 25.1-7.4 4.2-15.7 6.4-24 6.4-3.4 0-6.7-0.3-10-1-6.9-1.5-13.3-4.4-18.9-8.5-5.5 4.1-11.9 7-18.8 8.5-3.3 0.7-6.7 1-10 1-8.4 0-16.7-2.2-24.1-6.4-8.8-5-11.9-16.3-6.9-25.1 5-8.9 16.3-11.9 25.1-6.9 1.8 1 4.7 2.1 8.4 1.3 4.2-0.9 7.6-3.9 8.9-8 3.1-9.6 13.5-14.9 23.2-11.8 5.8 1.9 10 6.4 11.8 11.8 1.3 4 4.7 7.1 8.9 8 3.7 0.8 6.6-0.3 8.4-1.3 8.6-5 19.9-1.9 24.9 6.9z" fill="#663333" /><path d="M227.8 277.9m-20 0a20 20 0 1 0 40 0 20 20 0 1 0-40 0Z" fill="#663333" /></svg>
                    <svg className={getClassName('animals' , 'ham')} onClick={() => toggleSelection('animals', 'ham')} width="100px" height="100px" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg"><path fill="#F4AA41" d="M19.588 25.335s-12.5 3.25-8.75 19.75 16 13.5 16 13.5l4.75-1.25 9.5-.25s9 2.75 14.25-.25 7.75-12.25 7.75-12.25v-7l-2.5-5.5-4.25-4.25-2.5-2s7.5-7 5-11.5-4.25-5.75-11.5.25l-1.25 1s-9.75-4.75-19.5-.25c0 0-5-8-11.75-3l-.5 5s1.75 8 5.25 8z"/><path fill="#FFF" d="M9.921 40.752s9.583 10.333 22.167 2.167c0 0 1.166 4.417 3.833 3.75 2.667-.667 4.917-3.417 4.917-3.417s15.083 5.583 22.916-2.583c0 0 .542 9.333-8.291 16.666 0 0-8.125 2.917-14.375-.25l-9.834.25s-7.583 2.667-12.833-.166c-5.25-2.833-9.667-12.833-8.5-16.417z"/><path fill="#EA5A47" d="m32.088 42.919 8.375-.083s-.688 3.937-3.813 3.937-4.562-3.854-4.562-3.854z"/><circle cx="27.814" cy="32.086" r="3"/><circle cx="44.439" cy="32.086" r="3"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M32.377 43.756s.75 2.584 3.75 2.917c3 .333 4-2.917 4-2.917"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="m36.127 46.673.125 4.333c1.629 1.046 2.572 1.51 5.041 1M31.377 52.006c1.958.334 2.917 0 4.875-1M41.882 56.673c5.397 2.775 9.685 1.722 12.752-.243M11.03 44.478c-3.785-13.524 9.014-18.722 9.014-18.722-3-1-8.334-9.583-3.917-13.583s10.5 3.333 10.5 3.333 9.844-4.166 20.005 0c0 0 6.084-7.333 10.5-3.333s-.916 12.583-3.916 13.583c0 0 12.581 5.093 9.106 18.378M19.221 56.791c3.018 1.722 7.1 2.481 12.156-.118"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M26.627 43.506s-17 2.667-19.75 11.75M27.377 47.227s-12.252 2.217-14.5 13.28M46.632 43.506s17 2.667 19.75 11.75M45.882 47.227s11.743 3.78 14.5 13.28"/></svg>
                    <svg className={getClassName('animals' , 'bird')} onClick={() => toggleSelection('animals', 'bird')} width="100px" height="100px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M700.7 236.8c.3 7.4-4.1 14.2-11.1 16.8-1.9.7-4 1.1-6 1.1-5.1 0-10.1-2.3-13.4-6.5-3.1-3.9-6.3-7.6-9.8-11.1-15.7 29.2-43.7 50.5-76.5 57.4-2.3 3.2-4.8 6.3-7.4 9.2 40.8 29 65.7 76.5 65.7 126.9v157.5c0 40.7-15.6 79.1-44 108.3-21.5 22.1-48.5 37-77.9 43.5v202.9c0 10.5-8.5 19-19 19-93.5 0-171.4-73-177.4-166.2-.2-3.6-.4-90.2-.4-90.2V209.1c0-79.5 64.7-144.2 144.2-144.2h62.6c19.1 0 36.7 6.6 50.6 17.6 31.4 9.7 59.9 28.7 81 54.2 23.7 28.5 37.1 63.1 38.8 100.1z" fill="#633"/><path d="M482.4 928.4V749.3c-27.1-.7-53.2-8.5-76.2-22.4-14 5.9-29 9.9-44.7 11.7 0 0 .1 57.4.3 60.3 4.3 66.9 55.8 120.6 120.6 129.5z" fill="#F8464E"/><path d="M611.3 135.5c18.7 13.8 33.7 32.3 43.3 53.4-13.3-8.4-27.5-14.7-42.6-19 .1 0-.2-30.9-.7-34.4zm21.6 80.2c-5.7 13-14.9 24.1-26.3 32.2 3.5-12.4 5.4-25.4 5.4-38.8v-3.3c7.3 2.6 14.3 5.9 20.9 9.9z" fill="#FC6"/><path d="M604.3 430.6v157.5c0 30.8-11.8 59.8-33.2 81.9-21.4 22-50 34.6-80.6 35.6-.1 0-2.5.1-3.7.1-14.4 0-28.5-2.6-41.7-7.6 38.1-30.3 62.6-77 62.6-129.4v-221c14.1-4.1 27.3-10.2 39.2-18.1 35.4 21.1 57.4 59.8 57.4 101zm-30.1-284.2v15.5l-31-30.9c-7.1-7.1-15.3-12.5-24.3-16.3-9-3.7-18.7-5.7-28.7-5.7-41.3 0-74.8 33.6-74.8 74.9 0 20 7.8 38.8 21.9 52.9l70.6 70.6c-12.4 5.1-26 7.9-40.2 7.9-58.5 0-106-47.4-106.3-105.8v-.7c.1-58.5 47.7-106.1 106.3-106.1h62.6c24.3.1 43.9 19.7 43.9 43.7z" fill="#F8464E"/><path d="m519.1 155.1 55 55c-.3 31.4-14.3 59.6-36.3 78.9l-76.3-76.3c-7.7-7.7-11.9-17.9-11.9-28.8 0-22.5 18.3-40.7 40.7-40.7 10.9-.1 21.1 4.2 28.8 11.9z" fill="#FFF"/><path d="M490.3 165c10.5 0 18.9 8.5 18.9 18.9 0 10.4-8.5 18.9-18.9 18.9-10.4 0-18.9-8.5-18.9-18.9-.1-10.5 8.4-18.9 18.9-18.9z" fill="#633"/><path d="M469.8 568.2v.4c0 63.7-47.1 116.6-108.2 125.8V627c42.9-4.9 81.5-26.5 108.2-58.8z" fill="#FC6"/><path d="M469.8 353.3v23.6c-7.3 57.6-52.2 102.3-108.2 110.6v-181c26.3 28.7 66.1 46.8 108.2 46.8z" fill="#F8464E"/><path d="M469.7 467.6c-.3 8.3-1.4 16.6-3.3 24.7 0 .1-.1.2-.1.4-12.1 50.7-54.1 88.5-104.7 96.1v-63.2c43-4.9 81.3-26.2 108.1-58z" fill="#4EC8D8"/></svg>               
                    <svg className={getClassName('animals' , 'fish')} onClick={() => toggleSelection('animals', 'fish')} width="100px" height="100px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#3B88C3" d="M32.153 24c0-1 1.523-6.212 3.047-7.735 1.522-1.523 0-3.166-1.523-3.166-3.405 0-9.139 6.901-9.139 10.901 0 5 5.733 10.424 9.139 10.424 1.523 0 3.046-1.404 1.523-2.928C33.677 29.974 32.153 26 32.153 24z"/><path fill="#3B88C3" d="M9.021 14.384c0-3.046 1.497-6.093 3.02-6.093 4.569 0 13.322 4.823 14.845 12.439 1.524 7.616-17.865-6.346-17.865-6.346zm4.854 18.278c1.523 1.523 4.57 3.047 7.617 3.047 3.046 0-3.111-4.189-1.523-6.092 2.18-2.617-6.094 3.045-6.094 3.045z"/><path d="M2.071 28.727c.761-2.285.19-3.935-1.143-5.584-1.333-1.651 3.872-1.904 5.585.381s5.713 6.281 2.158 6.22c-3.553-.065-6.6-1.017-6.6-1.017z"/><path fill="#55ACEE" d="M.168 23.488c.959.874 7.223 4.309 7.165 5.137-.058.828-2.279-.088-3.105-.279-1.485-.342-1.905-.598-2.317-.526-.84.321-.554 1.201-.242 1.704 1.498 2.61 7.286 4.662 12.16 4.662 8.412 0 16.802-7.615 16.802-10.662 0-3.046-9.345-10.663-17.757-10.663C4.483 12.86.18 18.922.168 23.488z"/><path d="M7 17a2 2 0 1 1 .001 3.999A2 2 0 0 1 7 17z"/><path fill="#269" d="M15.08 29.98a.997.997 0 0 1-.885-1.463c1.585-3.034 2.218-5.768.154-9.243a1 1 0 0 1 1.72-1.022c2.693 4.535 1.46 8.202-.102 11.191a.999.999 0 0 1-.887.537z"/></svg>            
                </div>
            </div>
            
            <div className="filtros-div">
                <h1 className="filtros-h1">Servicio</h1>
                {displayServices().map(service => (
                    <span key={service} className={getClassName('services', service)} onClick={() => toggleSelection('services', service)}>
                        {service === 'cuidadoDomestico' ? 'Cuidado Doméstico' : service === 'adiestramiento' ? 'Adiestramiento' : 'Paseo'}
                    </span>
                ))}
            </div>

            <div className="filtros-div">
                <h1 className="filtros-h1">Frecuencia</h1>
                    <span className={getClassName('frequencies', 'unicavez')} onClick={() => toggleSelection('frequencies', 'unicavez')}>Única vez</span> 
                    <span className={getClassName('frequencies', 'diaria')} onClick={() => toggleSelection('frequencies', 'diaria')}>Diaria</span>
                    <span className={getClassName('frequencies', 'semanal')} onClick={() => toggleSelection('frequencies', 'semanal')}>Semanal</span>
                    <span className={getClassName('frequencies', 'mensual')} onClick={() => toggleSelection('frequencies', 'mensual')}>Mensual</span>
            </div>

            <div className="filtros-div">
                <h1 className="filtros-h1">Duración</h1>
                <h2 className="filtros-h1">Desde</h2>
                <input
                type="date"
                value={availabilityDates.startDate}
                onChange={(e) =>
                    setAvailabilityDates({ ...availabilityDates, startDate: e.target.value })
                }
                />
                {selection.frequencies.unicavez && (
                <>
                    <h2 className="filtros-h1">Hasta</h2>
                    <input
                    type="date"
                    value={availabilityDates.endDate}
                    onChange={(e) =>
                        setAvailabilityDates({ ...availabilityDates, endDate: e.target.value })
                    }
                    />
                </>
                )}
                {selection.frequencies.semanal && (
                <>
                    <h2 className="filtros-h1">Días de la semana</h2>
                    <span
                    className={getClassName("dias", "lunes")}
                    onClick={() => toggleDaySelection("dias", "lunes")}
                    >
                    Lunes
                    </span>
                    <span
                    className={getClassName("dias", "martes")}
                    onClick={() => toggleDaySelection("dias", "martes")}
                    >
                    Martes
                    </span>
                    <span
                    className={getClassName("dias", "miercoles")}
                    onClick={() => toggleDaySelection("dias", "miercoles")}
                    >
                    Miércoles
                    </span>
                    <span
                    className={getClassName("dias", "jueves")}
                    onClick={() => toggleDaySelection("dias", "jueves")}
                    >
                    Jueves
                    </span>
                    <span
                    className={getClassName("dias", "viernes")}
                    onClick={() => toggleDaySelection("dias", "viernes")}
                    >
                    Viernes
                    </span>
                    <span
                    className={getClassName("dias", "sabado")}
                    onClick={() => toggleDaySelection("dias", "sabado")}
                    >
                    Sábado
                    </span>
                    <span
                    className={getClassName("dias", "domingo")}
                    onClick={() => toggleDaySelection("dias", "domingo")}
                    >
                    Domingo
                    </span>
                </>
                )}
            </div>

            <div className="filtros-div">
                <h1 className="filtros-h1">Zona</h1>
                <select
                multiple
                value={selectedZones}
                onChange={(e) => setSelectedZones(Array.from(e.target.selectedOptions, (option) => option.value))}>
                    <option value="zona1">Zona 1</option>
                    <option value="zona2">Zona 2</option>
                    <option value="zona3">Zona 3</option>
                    <option value="zona4">Zona 4</option>
                    <option value="zona5">Zona 5</option>
                    <option value="zona6">Zona 6</option>
                    <option value="zona7">Zona 7</option>
                </select>
            </div>

            <div className="filtros-div-buscar">
                <button type="submit">Buscar Servicio</button>
            </div>
        </form>
    )
}