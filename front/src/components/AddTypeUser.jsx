import React from 'react'
import SubTitle from './SubTitle'
import './../utils/style.css'

const AddTypeUser = () => {
  return (
    <div className='col-span-5 bg-[#FFFFF0] rounded-md drop-shadow-md p-4 '>
      <form action="" className=''>
        <SubTitle subtitle='Añadir tipo de usuario' />
        <div className='flex flex-col w-full mb-2'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Ingrese el nombre de la editorial</label>
                <div className='flex flex-row space-x-4'>
                    <input type='text' id='name' name='name' 
                    className='border-stone-300 border-2 p-2 rounded-lg w-full'
                    />
                    <button className='bg-[#121212] text-white rounded-lg px-4'>
                        <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
      </form>
      <div>
        <label className='text-gray-400 mb-2' htmlFor='name'>Editoriales</label>
        <div className='border-stone-300 border-2 p-2 rounded-lg'>
        <ul className='overflow-y-scroll max-h-48 flex-col space-y-4 py-4 px-2 scrollable-list'>
            {Array.from({ length: 10 }).map((_, index) => (
              <li className='flex flex-row border-b border-gray-400 pb-1' key={index}>
                <span className='w-full'>Edit {index + 1}</span>
                <button className='text-[#121212] rounded-lg px-4'>
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
