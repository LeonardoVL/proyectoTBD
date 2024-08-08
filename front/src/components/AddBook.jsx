import React from 'react'
import SubTitle from './SubTitle'

const AddBook = () => {
  return (
    <form className='col-span-7 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
        <SubTitle subtitle='Añadir nuevo libro' />
        <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Titulo</label>
                <input type='text' id='name' name='name' 
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 mb-2' htmlFor='name'>ISBN</label>
                <input type='text' id='lastname' name='lastname' 
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Autor</label>
                <input type='text' id='lastname' name='lastname' 
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Categoria</label>
                <input type='text' id='lastname' name='lastname' 
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Editorial</label>
                <input type='text' id='lastname' name='lastname' 
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='flex flex-col w-full'>
                <label className='text-gray-400 mb-2' htmlFor='name'>Estado del libro</label>
                <input type='text' id='lastname' name='lastname' 
                className='border-stone-300 border-2 p-2 rounded-lg'
                />
            </div>
            <div className='gap-2 flex-col w-full col-span-2 grid grid-cols-12'>
                <div className='grid-rows-2 col-span-4'>
                    <label className='text-gray-400 mb-2' htmlFor='name'>Año de Publicación</label>
                    <div className='flex flex-row space-x-5'>
                        <input type='text' id='lastname' name='lastname' 
                        className='border-stone-300 border-2 p-2 rounded-lg w-full'/> 
                    </div>
                </div>
                <div className='grid-rows-2 col-span-4'>
                    <label className='text-gray-400 mb-2' htmlFor='name'>Ejemplares Disp.</label>
                    <div className='flex flex-row space-x-5'>
                        <input type='text' id='lastname' name='lastname' 
                        className='border-stone-300 border-2 p-2 rounded-lg w-full'/> 
                    </div>
                </div>
                <div className='grid-rows-2 col-span-2'>
                    <label className='text-gray-400 mb-2' htmlFor='name'>Edición</label>
                    <div className='flex flex-row space-x-5'>
                        <input type='text' id='lastname' name='lastname' 
                        className='border-stone-300 border-2 p-2 rounded-lg w-full'/> 
                    </div>
                </div>
                <div className='grid-rows-2 col-span-2'>
                    <label className='text-gray-400 mb-2' htmlFor='name'>Páginas</label>
                    <div className='flex flex-row space-x-5'>
                        <input type='text' id='lastname' name='lastname' 
                        className='border-stone-300 border-2 p-2 rounded-lg w-full'/> 
                    </div>
                </div>
            </div>
            
        </div>

    </form>
  )
}

export default AddBook
