import React, { useEffect, useState } from 'react'
import SubTitle from './SubTitle'
import './../utils/style.css'

import axios from 'axios'

const WorkersList = () => {
  //make the same changes as in UsersList.jsx
  const [listWorker, setListWorker] = useState([])
  const [newWorker, setNewWorker] = useState(false)
  const [nameWorker, setNameWorker] = useState('')
  // Función para obtener los trabajadores
  const getWorker = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/trabajador')
      setListWorker(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  // useEffect para obtener los trabajadores
  useEffect(() => {
    getWorker()
  }, [newWorker])


  return (
    <div className='col-span-6 bg-[#FFFFF0] rounded-md drop-shadow-md p-4 '>
      <form action="" className=''>
        <SubTitle subtitle='Lista de trabajadores' />
        <div className='flex flex-col w-full mb-2'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Ingrese el nombre del trabajador</label>
                <div className='flex flex-row space-x-4'>
                    <input type='text' id='name' name='name' 
                    className='border-stone-300 border-2 p-2 rounded-lg w-full'
                    />
                    <button className='bg-[#121212] text-white rounded-lg px-4'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>
      </form>
      <div>
        <div className='grid grid-cols-6 gap-2'>
            <label className='text-gray-400 col-span-4' htmlFor='name'>Nombre</label>
            <label className='text-gray-400 col-span-1 text-center' htmlFor='name'>Estado</label>
            <label className='text-gray-400 col-span-1 text-center' htmlFor='name'>Acción</label>
            
        </div>
        <div className='  rounded-lg'>
        <ul className='overflow-y-scroll max-h-56 flex-col space-y-4 py-4  scrollable-list'>
            {
            listWorker === 0 ? <p>No hay trabajadores</p> :
            listWorker.map((worker, index) => (
              <li className='grid grid-cols-6 gap-2 border-b border-gray-400 pb-1' key={worker._id}>
                <span className='w-full col-span-4'>{worker.nombre + " " + worker.apellido + " (" + worker.tipoUsuarioNombre + ")"}</span>
                <div className='w-full flex justify-center'>
                  <div className='bg-green-500 text-white px-2 py-1 rounded-full'>
                    {worker.tipoEstadoNombre}
                    {/* <i className="fa-solid fa-ban"></i> */}
                  </div>
                </div>
                <div className='w-full flex justify-center'>
                    <button className=' bg-sky-500 text-white px-2 rounded-lg'>
                    <i className="fa-solid fa-location-arrow"></i>
                    </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default WorkersList
