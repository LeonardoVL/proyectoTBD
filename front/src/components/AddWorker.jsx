import React from 'react'
import SubTitle from './SubTitle'

const AddWorker = () => {
  return (
    <form className='col-span-7 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
        <SubTitle subtitle='Añadir nuevo trabajador' />
        <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Nombres</label>
                <input type='text' id='name' name='name' 
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Apellidos</label>
                <input type='text' id='lastname' name='lastname' 
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Inicio del turno</label>
                <input type='time' id='lastname' name='lastname' 
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Fin del Turno</label>
                <input type='time' id='lastname' name='lastname' 
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='flex flex-col w-full col-span-2'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Fecha de nacimiento</label>
                <select 
                    className='border-stone-300 border-2 p-2 rounded-lg w-full outline-none'
                    name="" id="">
                        <option value="">A</option>
                        <option value="">A</option>
                        <option value="">A</option>
                        <option value="">A</option>
                    </select>
            </div>
            <button className='bg-[#121212] rounded-lg w-full text-white space-x-4 col-span-2 py-2 mt-2'>
                    <i className="fa-solid fa-user-plus"></i>
                <span className='font-semibold'>Crear trabajador</span>
            </button>
            
        </div>


    </form>
  )
}

export default AddWorker
