import React from 'react'
import SubTitle from './SubTitle'
import PieChart from './PieChart'

const LoanChart = () => {
    return (
        <div className='col-span-5 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
            <SubTitle subtitle="Índice de préstamos" />
            <div className='overflow-hidden h-72 w-full flex justify-center items-center'>
                <PieChart />
            </div>
        </div>
    )
}

export default LoanChart