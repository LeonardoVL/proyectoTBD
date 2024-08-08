import React from 'react'
import SubTitle from './SubTitle'
import PieChart from './PieChart'

const GraphUser = ({id}) => {
  return (
    <div className='col-span-5 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
      <SubTitle subtitle='Gráficos' />
      <div className='overflow-hidden h-72 w-full flex justify-center items-center'>
      <PieChart id={id} />
      </div>
    </div>
  )
}

export default GraphUser
