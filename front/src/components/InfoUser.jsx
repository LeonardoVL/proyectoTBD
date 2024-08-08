import React, { useEffect, useState } from 'react'

import axios from 'axios'

const InfoUser = ({id}) => {
    //make the same changes as in AddTypeUser.jsx
    const [user, setUser] = useState({})
  // Función para obtener los usuarios
    const [dataFormated, setDataFormated] = useState()
  const getUser = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/usuario/${id}`);
        setUser(response.data);
        console.log(response.data);
  
        // Change the date to show the user 1990-01-01T00:00:00.000+00:00 to 01/01/1990
        const date = new Date(response.data.fechaNacimiento);
  
        // Adding leading zeros to day and month
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
        const year = date.getFullYear();
  
        const formattedDate = `${day}/${month}/${year}`;
        setDataFormated(formattedDate);
      } catch (error) {
        console.error(error);
      }
    };
  // useEffect para obtener los usuarios
  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className='col-span-7 grid grid-cols-2 gap-y-4 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Nombre</label>
            <p className='font-semibold text-lg'>{user.nombres + " " + user.apellidos}</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Tipo de usuario</label>
            <p className='font-semibold text-lg'>{user.tipoUsuarioNombre}</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Estado</label>
            <p className='font-semibold text-md text-white bg-green-500 px-2 py-1 w-fit rounded-full '>{user.tipoEstadoNombre}</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Fecha de nacimiento</label>
            <p className='font-semibold text-lg'>{dataFormated}</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Teléfono</label>
            <p className='font-semibold text-lg'>{user.telefono}</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Correo electrónico</label>
            <p className='font-semibold text-lg'>{user.correo}</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>DNI</label>
            <p className='font-semibold text-lg'>{user.DNI}</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Facultad</label>
            <p className='font-semibold text-lg'>{user.facultad}</p>
        </div>
        <div className='flex flex-col col-span-2'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Domicilio</label>
            <p className='font-semibold text-lg'>{user.domicilio}</p>
        </div>
    </div>
  )
}

export default InfoUser
