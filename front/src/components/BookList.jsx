import React, { useState, useEffect } from 'react'
import SubTitle from './SubTitle'
import './../utils/style.css'

import axios from 'axios'

const BookList = () => {
  const [searchBook, setSearchBook] = useState('')
  const [books, setBooks] = useState([])

  // Manejar el cambio en el input de búsqueda
  const handleChange = (e) => {
    setSearchBook(e.target.value)
  }

  // Obtenemos los libros
  const getBooks = async (terminoValidacion = '') => {
    try {
      const response = await axios.get(`http://localhost:3000/api/libro/parametrico`, {
        params: { terminoValidacion }
      })
      setBooks(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  // Obtenemos todos los libros cuando el componente se monta
  useEffect(() => {
    getBooks()
  }, [])

  // Manejar la búsqueda cuando se envía el formulario
  const handleSearch = (e) => {
    e.preventDefault()
    getBooks(searchBook)
  }

  return (
    <div className='col-span-full bg-[#FFFFF0] rounded-md drop-shadow-md p-4'>
      <form action="" onSubmit={handleSearch} className=''>
        <SubTitle subtitle='Lista de libros' />
        <div className='flex flex-col w-full mb-2'>
          <div className='flex flex-row space-x-4'>
            <input 
              type='text' 
              id='name' 
              name='name' 
              value={searchBook} 
              onChange={handleChange}
              className='border-stone-300 border-2 p-2 rounded-lg w-full'
              placeholder='Ingrese el nombre del libro, autor o categoría'
            />
            <button type='submit' className='bg-[#121212] text-white rounded-lg px-4'>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </form>
      <div>
        <div className='grid grid-cols-6 gap-2'>
          <label className='text-gray-400 mb-2 col-span-3' htmlFor='name'>Titulo</label>
          <label className='text-gray-400 mb-2 col-span-1' htmlFor='name'>Autor</label>
          <label className='text-gray-400 mb-2 col-span-1 text-center' htmlFor='name'>Categoría</label>
          <label className='text-gray-400 mb-2 col-span-1 text-center' htmlFor='name'>Ejemplares</label>
        </div>
        <div className='p-2 rounded-lg'>
          <ul className='overflow-y-scroll max-h-96 flex-col space-y-4 py-4 pr-2 scrollable-list'>
            {books.length === 0 ? (
              <p>No hay libros disponibles</p>
            ) : (
              books.map((book) => (
                <li className='flex-row border-b border-gray-400 pb-1 grid grid-cols-6 gap-2' key={book._id}>
                  <span className='col-span-3'>{book.titulo}</span>
                  <span className='col-span-1'>{book.autor}</span>
                  <span className='col-span-1 text-center'>{book.categoria}</span>
                  <span className='col-span-1 text-center'>{book.ejemplaresTotales}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BookList
