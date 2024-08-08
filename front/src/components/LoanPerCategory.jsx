import React from 'react'
import SubTitle from './SubTitle'

const LoanPerCategory = () => {
    return(
        <div className='col-span-6 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
            <SubTitle subtitle="Préstamos por categoría" />
            <form className='mb-5'>
                <div className='flex'>
                    <div className='w-full'>
                        <div className='gap-x-4 gap-y-2 flex flex-col mb-3'>
                            <label className='text-gray-400 mb-1' htmlFor='name'>
                                Categorías disponibles
                            </label>
                            <select id='loanCategory' name='loanCategory'
                            className='border-stone-300 border-2 p-2 rounded-lg grow'>
                                <option value="" disabled selected hidden>
                                    Elija una categoría
                                </option>
                                <option value="category1">
                                    Categoría 1
                                </option>
                                <option value="category2">
                                    Categoría 2
                                </option>
                                <option value="category3">
                                    Categoría 3
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className='ml-3 flex items-end mb-3'>
                        <button className='bg-black rounded-md px-3 py-2'>
                            <i className="fa-solid fa-magnifying-glass fa-lg" style={{color: "#FFFFFF"}}></i>
                        </button>
                    </div>
                </div>
                <div className='gap-x-4 gap-y-2 flex flex-col grow'>
                    <label className='text-gray-400 mb-1' htmlFor='name'>
                        Filtrar por fecha de préstamo
                    </label>
                    <div className='flex items-center'>
                        <input type='date' id='loanDateStart' name='loanDateStart'
                        className='border-stone-300 border-2 p-2 rounded-lg grow'
                        />
                        <div className='mx-1'>
                            <strong>—</strong>
                        </div>
                        <input type='date' id='loanDateEnd' name='loanDateEnd'
                        className='border-stone-300 border-2 p-2 rounded-lg grow'
                        />
                    </div>
                </div>
            </form>
            <div className='rounded-lg mb-4'>
                <div className='grid grid-cols-3 gap-2 ml-3 mr-6'>
                    <label className='text-gray-400 col-span-2' htmlFor='name'>
                        Libro
                    </label>
                    <label className='text-gray-400 text-center' htmlFor='name'>
                        Código
                    </label>
                </div>
                <div className='border-stone-300 border-2 rounded-lg p-1'>
                    <ul className='overflow-y-scroll max-h-56 flex-col space-y-4 py-4 scrollable-list'>
                        {Array.from({ length: 13 }).map((_, index) => (
                            <li className='grid grid-cols-3 gap-2 border-b border-gray-400 pb-1' key={index}>
                                <span className='w-full col-span-2'>
                                    Libro {index + 1}
                                </span>
                                <div className='w-full flex justify-center'>
                                    <p>12345678</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='font-bold text-xl text-center'>
                Total: 13
            </div>
        </div>
    )
}

export default LoanPerCategory