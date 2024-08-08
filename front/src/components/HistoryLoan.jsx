import React from 'react'
import SubTitle from './SubTitle'

const HistoryLoan = () => {
  return (
    <div className='col-span-12 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
      <SubTitle subtitle='Historial de préstamos' />
      <div className='grid grid-cols-12 gap-y-4'>
        <span className='text-gray-400 col-span-4' >Nombre del préstamo</span>
        <span className='text-gray-400 col-span-2 text-center' >Fecha de préstamo</span>
        <span className='text-gray-400 col-span-2 text-center' >Fecha de devolución</span>
        <span className='text-gray-400 col-span-2 text-center' >Estado</span>
        <span className='text-gray-400 col-span-2 text-center' >Acción</span>

        {Array.from({ length: 10 }).map((_, index) => (
                <div className='col-span-12 grid grid-cols-12'>
                    <span className=' col-span-4' >Don Quijote de la mancha</span>
                    <span className=' col-span-2 text-center' >15/07/2024</span>
                    <span className=' col-span-2 text-center' >21/07/2024</span>
                    <div className=' col-span-2 flex justify-center' >
                        <span className='text-white bg-green-500 p-1 rounded-full px-2'>
                            Válido
                        </span>
                    </div>
                    <span className=' col-span-2 flex justify-center' >
                        <button className='text-white bg-sky-500 px-2 rounded-md'>
                            <i className="fa-solid fa-pen"></i>
                        </button>
                    </span>
                </div>
            ))}
      </div>
    </div>
  )
}

export default HistoryLoan
