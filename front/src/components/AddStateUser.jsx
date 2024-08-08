import React, { useEffect, useState } from 'react'
import SubTitle from './SubTitle'
import './../utils/style.css'
import axios from 'axios'

const AddSateUser = () => {
  //make the same changes as in AddTypeUser.jsx
  const [listStateUser, setListStateUser] = useState([])
  const [newStateUser, setNewStateUser] = useState(false)
  const [nameStateUser, setNameStateUser] = useState('')

  // Función para obtener los estados de usuario
  const getStateUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/estadousuario')
      setListStateUser(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // useEffect para obtener los estados de usuario
  useEffect(() => {
    getStateUser()
  }, [newStateUser])

  // Función para añadir un estado de usuario
  const addStateUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/estadousuario', {
        tipoUsuario: nameStateUser,
        descripcion: 'Estado de usuario - Más adelante'
      })
      setNewStateUser(!newStateUser)
      console.log(response.data)
      getStateUser()
    } catch (error) {
      console.error(error)
    }
  }

  // Función para eliminar un estado de usuario
  const deleteStateUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/estadousuario/${id}`)
      setNewStateUser(!newStateUser)
      console.log(response.data)
      getStateUser()
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className='col-span-5 bg-[#FFFFF0] rounded-md drop-shadow-md p-4 '>
      <form action="" className=''>
        <SubTitle subtitle='Añadir estado de usuario' />
        <div className='flex flex-col w-full mb-2'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Ingrese el nombre del estado</label>
                <div className='flex flex-row space-x-4'>
                    <input type='text' id='name' name='name' value={nameStateUser} 
                    onChange={(e) => setNameStateUser(e.target.value)} placeholder='Nombre del estado'
                    className='border-stone-300 border-2 p-2 rounded-lg w-full'
                    />
                    <button 
                    onClick={addStateUser}
                    className='bg-[#121212] text-white rounded-lg px-4'>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
      </form>
      <div>
        <label className='text-gray-400 mb-2' htmlFor='name'>Estados (Pasar el curso para tener más información)</label>
        <div className='border-stone-300 border-2 p-2 rounded-lg'>
        <ul className='overflow-y-scroll max-h-64 flex-col space-y-4 py-4 px-2 scrollable-list'>
            {
            listStateUser.length === 0 ? <p>No hay estados de usuario</p> :
            listStateUser.map((stateUser, index) => (
              <li className='flex flex-row border-b border-gray-400 pb-1' key={stateUser._id}>
                <span className='w-full' title={stateUser.descripcion}>{stateUser.tipoUsuario}</span>
                <button 
                onClick={() => deleteStateUser(stateUser._id)}
                className='text-[#121212] rounded-lg px-4'>
                  <i className="fa-solid fa-x"></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AddSateUser
