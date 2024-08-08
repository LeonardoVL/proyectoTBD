import React, { useEffect, useState } from 'react'
import SubTitle from './SubTitle'
import './../utils/style.css'

import axios from 'axios'

const AddBookCategory = () => {

  const [listCategory, setListCategory] = useState([]);
  const [newCategory, setNewCategory] = useState(false);
  const [nameCategory, setNameCategory] = useState({
    nombre: '',
    descripcion: ''
  });

  // Function to get the categories
  const getCategory = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/categoria');
      setListCategory(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect to get the categories
  useEffect(() => {
    getCategory();
  }, [newCategory]);

  // Function to add a category
  const addCategory = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/categoria', {
        nombre: nameCategory.nombre,
        descripcion: nameCategory.descripcion
      });
      setNewCategory(!newCategory);
      console.log(response.data);
      getCategory();
      // Reset the form
      setNameCategory({
        nombre: '',
        descripcion: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete a category
  const deleteCategory = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/categoria/${id}`);
      setNewCategory(!newCategory);
      console.log(response.data);
      getCategory();
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNameCategory((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='col-span-5 bg-[#FFFFF0] rounded-md drop-shadow-md p-4 '>
      <form action="" onSubmit={addCategory} className=''>
        <SubTitle subtitle='Añadir categoría' />
        <div className='flex flex-row w-full mb-2'>
          <div className='flex flex-row w-full space-x-4'>
            <div>
              <label className='text-gray-400 mb-2' htmlFor='nombre'>Nombre de la categoría</label>
              <input
                type='text'
                id='nombre'
                name='nombre'
                value={nameCategory.nombre}
                onChange={handleChange}
                className='border-stone-300 border-2 p-2 rounded-lg w-full'
              />
            </div>
            <div className='w-full'>
              <label className='text-gray-400 mb-2' htmlFor='descripcion'>Descripción de la categoría</label>
              <div className='flex flex-row space-x-4'>
                <input
                  type='text'
                  id='descripcion'
                  name='descripcion'
                  value={nameCategory.descripcion}
                  onChange={handleChange}
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
        <label className='text-gray-400 mb-2' htmlFor='name'>categorías</label>
        <div className='border-stone-300 border-2 p-2 rounded-lg'>
        <ul className='overflow-y-scroll max-h-44 flex-col space-y-4 py-4 px-2 scrollable-list'>
            {listCategory.length === 0 ? <p>No hay categorías</p> :
              listCategory.map((category, index) => (
              <li className='flex flex-row border-b border-gray-400 pb-1' key={category._id}>
                <span className='w-full'>{`${category.nombre} (${category.descripcion[0]})`}</span>
                <button 
                onClick={() => deleteCategory(category._id)}
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

export default AddBookCategory
