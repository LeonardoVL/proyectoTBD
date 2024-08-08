import React, { useEffect, useState } from 'react';
import SubTitle from './SubTitle';
import './../utils/style.css';
import axios from 'axios';

const AddPublisherBook = () => {
  const [listPublisher, setListPublisher] = useState([]);
  const [newPublisher, setNewPublisher] = useState(false);
  const [namePublisher, setNamePublisher] = useState({
    nombre: '',
    pais: ''
  });

  // Function to get the publishers
  const getPublisher = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/editorial');
      setListPublisher(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect to get the publishers
  useEffect(() => {
    getPublisher();
  }, [newPublisher]);

  // Function to add a publisher
  const addPublisher = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/editorial', {
        nombre: namePublisher.nombre,
        pais: namePublisher.pais
      });
      setNewPublisher(!newPublisher);
      console.log(response.data);
      getPublisher();
      // Reset the form
      setNamePublisher({
        nombre: '',
        pais: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Function to delete a publisher
  const deletePublisher = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/editorial/${id}`);
      setNewPublisher(!newPublisher);
      console.log(response.data);
      getPublisher();
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNamePublisher((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className='col-span-5 bg-[#FFFFF0] rounded-md drop-shadow-md p-4 '>
      <form action="" onSubmit={addPublisher} className=''>
        <SubTitle subtitle='Añadir editorial' />
        <div className='flex flex-row w-full mb-2'>
          <div className='flex flex-row w-full space-x-4'>
            <div>
              <label className='text-gray-400 mb-2' htmlFor='nombre'>Nombre de la editorial</label>
              <input
                type='text'
                id='nombre'
                name='nombre'
                value={namePublisher.nombre}
                onChange={handleChange}
                className='border-stone-300 border-2 p-2 rounded-lg w-full'
              />
            </div>
            <div className='w-full'>
              <label className='text-gray-400 mb-2' htmlFor='pais'>País de la editorial</label>
              <div className='flex flex-row space-x-4'>
                <input
                  type='text'
                  id='pais'
                  name='pais'
                  value={namePublisher.pais}
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
        <label className='text-gray-400 mb-2' htmlFor='name'>Editoriales</label>
        <div className='border-stone-300 border-2 p-2 rounded-lg'>
          <ul className='overflow-y-scroll max-h-48 flex-col space-y-4 py-4 px-2 scrollable-list'>
            {
              listPublisher.length === 0 ? <p>No hay editoriales</p> :
              listPublisher.map((publisher, index) => (
                <li className='flex flex-row border-b border-gray-400 pb-1' key={publisher._id}>
                  <span className='w-full'>{`${publisher.nombre} (${publisher.pais})`}</span>
                  <button
                    className='text-[#121212] rounded-lg px-4'
                    onClick={() => deletePublisher(publisher._id)}
                  >
                    <i className="fa-solid fa-x"></i>
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddPublisherBook;
