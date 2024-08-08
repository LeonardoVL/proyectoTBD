import React, { useEffect, useState } from 'react'
import SubTitle from './SubTitle'

import axios from 'axios'



const HistoryLoan = ({id}) => {
  const [loans, setLoans] = useState([]);

  // Función para formatear fechas
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
};

const getLoans = async (id) => {
  try {
      console.log(id);
      const response = await axios.get(`http://localhost:3000/api/prestamo/${id}`);
      
      // Formatear las fechas en la respuesta
      const formattedLoans = response.data.map((loan) => ({
          ...loan,
          fechaSalida: formatDate(loan.fechaSalida),
          fechaMaxDevolucion: formatDate(loan.fechaMaxDevolucion),
          fechaDevolucion: loan.fechaDevolucion ? formatDate(loan.fechaDevolucion) : 'No devuelto',
          createdAt: formatDate(loan.createdAt),
          updatedAt: formatDate(loan.updatedAt),
      }));
      
      setLoans(formattedLoans);
      console.log(formattedLoans);
  } catch (error) {
      console.error(error);
  }
};

    useEffect(() => {
        getLoans(id);
    }, [id]);

  return (
    <div className='col-span-12 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md'>
      <SubTitle subtitle='Historial de préstamos' />
      <div className='grid grid-cols-12 gap-y-4'>
        <span className='text-gray-400 col-span-3' >Nombre del préstamo</span>
        <span className='text-gray-400 col-span-3' >Trabajador</span>
        <span className='text-gray-400 col-span-2 text-center' >Fecha de préstamo</span>
        <span className='text-gray-400 col-span-2 text-center' >Fecha de devolución</span>
        <span className='text-gray-400 col-span-1 text-center' >Estado</span>
        <span className='text-gray-400 col-span-1 text-center' >Acción</span>

        {
        loans.length === 0 ? <div className='col-span-12 text-center'>No hay préstamos</div> :
        loans.map((loan, index) => (
                <div className='col-span-12 grid grid-cols-12'>
                    <span className=' col-span-3' >{loan.libro}</span>
                    <span className=' col-span-3 truncate' >{loan.trabajador}</span>
                    <span className=' col-span-2 text-center' >{loan.fechaSalida}</span>
                    <span className=' col-span-2 text-center' >{loan.fechaDevolucion + " - " + loan.fechaMaxDevolucion}</span>
                    <div className=' col-span-1 flex justify-center' >
                        <span className='text-white bg-green-500 p-1 rounded-full px-2'>
                            {loan.estadoPrestamo}
                        </span>
                    </div>
                    <span className=' col-span-1 flex justify-center' >
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
