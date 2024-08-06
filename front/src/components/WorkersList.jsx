import React from 'react'
import SubTitle from './SubTitle'
import './../utils/style.css'

const WorkersList = () => {
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
            {Array.from({ length: 10 }).map((_, index) => (
              <li className='grid grid-cols-6 gap-2 border-b border-gray-400 pb-1' key={index}>
                <span className='w-full col-span-4'>Edit {index + 1}</span>
                <div className='w-full flex justify-center'>
                  <div className='bg-red-500 text-white px-2 py-1 rounded-full'>
                    <i className="fa-solid fa-ban"></i>
                  </div>
                </div>
                <div className='w-full flex justify-center'>
                    <button className=' bg-sky-500 text-white px-2 rounded-lg'>
                    <i className="fa-solid fa-pen"></i>
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
