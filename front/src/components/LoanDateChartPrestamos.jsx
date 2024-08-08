import React from 'react'
import SubTitle from './SubTitle'
import PieChartPrestamos from './PieChartPrestamos'

const LoanDateChartPrestamos = () => {
    return(
        <div className='col-span-6 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
            <SubTitle subtitle={"Índice de préstamos devueltos"} />
            <form className='flex mb-5'>
                <div className='w-full'>
                    <div className='gap-x-4 gap-y-2 flex flex-col grow'>
                        <label className='text-gray-400 mb-1' htmlFor='name'>
                            Filtrar por fecha
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
                </div>
                <div className='ml-3 flex items-end mb-1'>
                    <button className='bg-black rounded-md px-3 py-2'>
                        <i className="fa-solid fa-magnifying-glass fa-lg" style={{color: "#FFFFFF"}}></i>
                    </button>
                </div>
            </form>
            <PieChartPrestamos />
        </div>
    )
}

export default LoanDateChartPrestamos