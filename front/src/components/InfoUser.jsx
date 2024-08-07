import React from 'react'

const InfoUser = ({id}) => {
  return (
    <div className='col-span-7 grid grid-cols-2 gap-y-4 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Tipo de usuario</label>
            <p className='font-semibold text-lg'>Estudiante</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Estado</label>
            <p className='font-semibold text-md text-white bg-green-500 px-2 py-1 w-fit rounded-full '>Disponible</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Fecha de nacimiento</label>
            <p className='font-semibold text-lg'>16/04/1990</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Teléfono</label>
            <p className='font-semibold text-lg'>123456789</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Correo electrónico</label>
            <p className='font-semibold text-lg'>fer@gmail.com</p>
        </div>
        <div className='flex flex-col col-span-1'>
            <label className='text-gray-400 mb-1' htmlFor='name'>DNI</label>
            <p className='font-semibold text-lg'>12345678</p>
        </div>
        <div className='flex flex-col col-span-2'>
            <label className='text-gray-400 mb-1' htmlFor='name'>Domicilio</label>
            <p className='font-semibold text-lg'>Av. Siempre chivo</p>
        </div>
    </div>
  )
}

export default InfoUser
