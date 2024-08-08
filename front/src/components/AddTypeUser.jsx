import React, { useEffect, useState } from 'react'
import SubTitle from './SubTitle'
import './../utils/style.css'
import axios from 'axios'



const AddTypeUser = () => {
  const [listTypeUser, setListTypeUser] = useState([])
  const [newTypeUser, setNewTypeUser] = useState(false)
  const [nameTypeUser, setNameTypeUser] = useState('')

  // Función para obtener los tipos de usuario
  const getTypeUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/tipousuario')
      setListTypeUser(response.data)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // useEffect para obtener los tipos de usuario
  useEffect(() => {
    getTypeUser()
  }, [newTypeUser])

  // Función para añadir un tipo de usuario
  const addTypeUser = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/api/tipousuario', {
        tipoUsuario: nameTypeUser
      })
      setNewTypeUser(!newTypeUser)
      console.log(response.data)
      getTypeUser()
    } catch (error) {
      console.error(error)
    }
  }

  // Función para eliminar un tipo de usuario
  const deleteTypeUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/tipousuario/${id}`)
      setNewTypeUser(!newTypeUser)
      console.log(response.data)
      getTypeUser()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='col-span-5 bg-[#FFFFF0] rounded-md drop-shadow-md p-4 '>
      <form action="" className=''>
        <SubTitle subtitle='Añadir tipo de usuario' />
        <div className='flex flex-col w-full mb-2'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Ingrese el nombre de la editorial</label>
                <div className='flex flex-row space-x-4'>
                    <input type='text' id='name' name='name' value={nameTypeUser} 
                    onChange={(e) => setNameTypeUser(e.target.value)}
                    className='border-stone-300 border-2 p-2 rounded-lg w-full'
                    />
                    <button 
                    onClick={addTypeUser}
                    className='bg-[#121212] text-white rounded-lg px-4'>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
      </form>
      <div>
        <label className='text-gray-400 mb-2' htmlFor='name'>Editoriales</label>
        <div className='border-stone-300 border-2 p-2 rounded-lg'>
        <ul className='overflow-y-scroll max-h-72 flex-col space-y-4 py-4 px-2 scrollable-list'>
            {
            listTypeUser.length === 0 ? <p>No hay editoriales</p> :
            listTypeUser.map((typeUser, index) => (
              <li className='flex flex-row border-b border-gray-400 pb-1' key={typeUser._id}>
                <span className='w-full'>{typeUser.tipoUsuario}</span>
                <button 
                onClick={() => deleteTypeUser(typeUser._id)}
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

export default AddTypeUser
