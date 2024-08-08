import React from 'react'
import SubTitle from './SubTitle'

const LoanList = () => {
    return(
        <div class="col-span-full p-4 bg-[#FFFFF0] rounded-md drop-shadow-md">
            <SubTitle subtitle="Lista de préstamos" />
            <form className='flex mb-5'>
                <div className='w-full'>
                    <div className='gap-x-4 gap-y-2 flex flex-col mb-3'>
                        <label className='text-gray-400 mb-1' htmlFor='name'>
                            Ingrese nombre o DNI
                        </label>
                        <input type='text' id='nameOrDNI' name='nameOrDNI'
                        className='border-stone-300 border-2 p-2 rounded-lg'
                        />
                    </div>
                    <div className='flex'>
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
                        <div className='gap-x-4 gap-y-2 flex flex-col grow ml-5'>
                            <label className='text-gray-400 mb-1' htmlFor='name'>
                                Filtrar por fecha de devolución
                            </label>
                            <div className='flex items-center'>
                                <input type='date' id='returnDateStart' name='returnDateStart'
                                className='border-stone-300 border-2 p-2 rounded-lg grow'
                                />
                                <div className='mx-1'>
                                    <strong>—</strong>
                                </div>
                                <input type='date' id='returnDateEnd' name='returnDateEnd'
                                className='border-stone-300 border-2 p-2 rounded-lg grow'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ml-3 flex items-end mb-1'>
                    <button className='bg-black rounded-md px-3 py-2'>
                        <i className="fa-solid fa-magnifying-glass fa-lg" style={{color: "#FFFFFF"}}></i>
                    </button>
                </div>
            </form>
            <div className='rounded-lg'>
                <div className='grid grid-cols-5 gap-2 mr-4'>
                    <label className='text-gray-400 text-center' htmlFor='name'>
                        Nombre del préstamo
                    </label>
                    <label className='text-gray-400 text-center' htmlFor='name'>
                        DNI
                    </label>
                    <label className='text-gray-400 text-center' htmlFor='name'>
                        Fecha de préstamo
                    </label>
                    <label className='text-gray-400 text-center' htmlFor='name'>
                        Fecha de devolución
                    </label>
                    <label className='text-gray-400 text-center' htmlFor='name'>
                        Estado
                    </label>
                </div>
                <div className='border-stone-300 border-2 rounded-lg p-1'>
                    <ul className='overflow-y-scroll max-h-56 flex-col space-y-4 py-4 scrollable-list'>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <li className='grid grid-cols-5 gap-2 border-b border-gray-400 pb-1' key={index}>
                                <span className='w-full'>
                                    Libro {index + 1}
                                </span>
                                <div className='w-full flex justify-center'>
                                    <p>12345678</p>
                                </div>
                                <div className='w-full flex justify-center'>
                                    <p>15/07/2024</p>
                                </div>
                                <div className='w-full flex justify-center'>
                                    <p>21/07/2024</p>
                                </div>
                                <div className='w-full flex justify-center'>
                                    {index % 2 === 0 ? (
                                        <div className='rounded-xl bg-green-600 text-white px-7'>
                                            Válido
                                        </div>
                                    ) : (
                                        <div className='rounded-xl bg-red-700 text-white px-7'>
                                            Excedido
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default LoanList