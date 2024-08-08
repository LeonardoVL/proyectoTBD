import React, { useState } from 'react';
import SubTitle from './SubTitle';
import PieChartPrestamo from './PieChartPrestamo';

const LoanChart = () => {
  const [dateStart, setDateStart] = useState('2024-08-07');
  const [dateEnd, setDateEnd] = useState('2024-08-20');

  const handleDateStart = (e) => {
    setDateStart(e.target.value);
  };

  const handleDateEnd = (e) => {
    setDateEnd(e.target.value);
  };

  const handleSearch = () => {
    if (!dateStart || !dateEnd) {
      console.error('Please select both start and end dates.');
      return; // Prevent unnecessary processing if dates are missing
    }

  };

  return (
    <div className="col-span-5 p-4 bg-[#FFFFF0] rounded-md drop-shadow-md">
      <SubTitle subtitle="Índice de préstamos generales" />
      <div className="h-72 w-full flex flex-col">
        <div className="flex flex-col grow">
          <label className="text-gray-400 mb-1" htmlFor="name">
            Filtrar por fecha de préstamo
          </label>
          <div className="flex flex-row items-center">
            <input
              type="date"
              id="loanDateStart"
              name="loanDateStart"
              onChange={handleDateStart}
              value={dateStart}
              className="border-stone-300 border-2 p-2 rounded-lg w-full"
            />
            <div className="mx-1">
              <strong>—</strong>
            </div>
            <div className="flex flex-row space-x-4 w-full">
              <input
                type="date"
                id="loanDateEnd"
                name="loanDateEnd"
                onChange={handleDateEnd}
                value={dateEnd}
                className="border-stone-300 border-2 p-2 rounded-lg w-full"
              />
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
            <PieChartPrestamo dateStart={dateStart} dateEnd={dateEnd} />
        </div>
      </div>
    </div>
  );
};

export default LoanChart;