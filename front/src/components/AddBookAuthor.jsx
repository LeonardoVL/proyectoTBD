import React, { useEffect, useState } from 'react'
import SubTitle from './SubTitle'
import './../utils/style.css'

import axios from 'axios'

const AddBookAuthor = () => {
  //make the same as AddPublisherBook.jsx
  const [listAuthor, setListAuthor] = useState([]);
  const [newAuthor, setNewAuthor] = useState(false);
  const [nameAuthor, setNameAuthor] = useState({
    nombre: '',
    nacionalidad: ''
  });

  // Function to get the authors
  const getAuthor = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/autor');
      setListAuthor(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect to get the authors
  useEffect(() => {
    getAuthor();
  }, [newAuthor]);

  // Function to add a author
  const addAuthor = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/autor', {
        nombre: nameAuthor.nombre,
        nacionalidad: nameAuthor.nacionalidad
      });
      setNewAuthor(!newAuthor);
      console.log(response.data);
      getAuthor();
      // Reset the form
      setNameAuthor({
        nombre: '',
        nacionalidad: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete a author
  const deleteAuthor = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/autor/${id}`);
      setNewAuthor(!newAuthor);
      console.log(response.data);
      getAuthor();
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNameAuthor((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='col-span-7 bg-[#FFFFF0] rounded-md drop-shadow-md p-4 '>
      <form action="" onSubmit={addAuthor} className=''>
        <SubTitle subtitle='Añadir autor' />
        <div className='flex flex-row w-full mb-2'>
          <div className='flex flex-row w-full space-x-4'>
            <div className='w-full'>
              <label className='text-gray-400 mb-2' htmlFor='nombre'>Ingrese el nombre del autor</label>
              <input 
              type='text' 
              id='nombre' 
              name='nombre' 
              value={nameAuthor.nombre} 
              onChange={handleChange}
              className='border-stone-300 border-2 p-2 rounded-lg w-full'
              />
            </div>
            <div className='w-full'>
              <label className='text-gray-400 mb-2' htmlFor='nacionalidad'>Ingrese la nacionalidad del autor</label>
              <div className='flex flex-row space-x-4'>
                <input type='text' id='nacionalidad' name='nacionalidad'
                value={nameAuthor.nacionalidad} onChange={handleChange}
                className='border-stone-300 border-2 p-2 rounded-lg w-full'
                />
                <button
                  type='submit'
                  className='bg-[#121212] text-white rounded-lg px-4'
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div>
        <label className='text-gray-400 mb-2' htmlFor='name'>Autores</label>
        <div className='border-stone-300 border-2 p-2 rounded-lg'>
        <ul className='overflow-y-scroll max-h-44 flex-col space-y-4 py-4 px-2 scrollable-list'>
            {
            listAuthor.length === 0 ? <p>No hay autores</p> :
            listAuthor.map((author, index) => (
              <li className='flex flex-row border-b border-gray-400 pb-1' key={author._id}>
                <span className='w-full'>{`${author.nombre} (${author.nacionalidad})`}</span>
                <button 
                onClick={() => deleteAuthor(author._id)}
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

export default AddBookAuthor
