import React from 'react'
import SubTitle from './SubTitle'
import './../utils/style.css'

const BookList = () => {
  return (
    <div className='col-span-full bg-[#FFFFF0] rounded-md drop-shadow-md p-4 '>
      <form action="" className=''>
        <SubTitle subtitle='Lista de libros' />
        <div className='flex flex-col w-full mb-2'>
                <div className='flex flex-row space-x-4'>
                    <input type='text' id='name' name='name' 
                    className='border-stone-300 border-2 p-2 rounded-lg w-full'
                    placeholder='Ingrese el nombre del libro, autor o categoría'
                    />
                    <button className='bg-[#121212] text-white rounded-lg px-4'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>
      </form>
      <div>
        <div className='grid grid-cols-6 gap-2'>
            <label className='text-gray-400 mb-2 col-span-3' htmlFor='name'>Titulo</label>
            <label className='text-gray-400 mb-2 col-span-1' htmlFor='name'>Autor</label>
            <label className='text-gray-400 mb-2 col-span-1' htmlFor='name'>Categoría</label>
            <label className='text-gray-400 mb-2 col-span-1' htmlFor='name'>Ejemplares</label>
        </div>
        <div className='p-2 rounded-lg'>
        <ul className='overflow-y-scroll max-h-48 flex-col space-y-4 py-4 px-2 scrollable-list'>
            {Array.from({ length: 10 }).map((_, index) => (
              <li className='flex-row border-b border-gray-400 pb-1 grid grid-cols-6 gap-2' key={index}>
                <span className='col-span-3'>Edit {index + 1}</span>
                <span className='col-span-1'>Edit {index + 1}</span>
                <span className='col-span-1'>Edit {index + 1}</span>
                <span className='col-span-1'>Edit {index + 1}</span>
              </li>
            ))}
          </ul>
        </div>



      </div>
    </div>
  )
}

export default BookList
