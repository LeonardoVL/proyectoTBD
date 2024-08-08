import React from 'react'
import SubTitle from './SubTitle'

const AddLoan = () => {
  return (
    <form className='col-span-7 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
        <SubTitle subtitle='Añadir nuevo préstamo' />
        <div className='gap-x-4 gap-y-2'>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Título del libro</label>
                <input type='text' id='booktitle' name='booktitle'
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 my-2' htmlFor='name'>Autor del préstamo</label>
                <input type='text' id='loanorigin' name='loanorigin'
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
        </div>
        <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 my-2' htmlFor='date'>Fecha de devolución</label>
                <div className='flex flex-row space-x-5'>
                    <input type='date' id='returndate' name='returndate'
                    className='border-stone-300 border-2 p-2 rounded-lg w-full'
                    />
                </div>
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 my-2' htmlFor='name'>Días adicionales para devolución</label>
                <input type='number' id='extraDays' name='extraDays' min="0"
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>  
        </div>
        <div className='gap-x-4 gap-y-2 py-4'>
            <button className='bg-[#0b0a0a] rounded-lg w-full text-white space-x-4 p-1'>
                <span className='font-semibold'>Crear préstamo</span>
            </button>
        </div>

    </form>
  )
}

export default AddLoan