// PieChartPrestamo.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChartPrestamo = ({ dateStart, dateEnd }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  console.log(dateStart, dateEnd);

  // Función para obtener los datos de préstamos y actualizar el gráfico
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/prestamo/consultaLibrosPeriodoTiempo`, {
        params: { 
            fechaInicio: dateStart, 
            fechaFin: dateEnd },
      });
      const prestamos = response.data;
      console.log(response.data)

      const counts = {
        Multados: prestamos[0].multados[0].totalMultados,
        Devueltos: prestamos[0].devueltos[0].totalDevueltos,
        Activos: prestamos[0].activos[0].totalActivos,
      };
  
      const data = {
        labels: ['Multados', 'Devueltos', 'Activos'],
        datasets: [
          {
            label: 'Número de prestamos',
            data: [counts.Multados, counts.Devueltos, counts.Activos],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
  
      setChartData(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, [dateStart, dateEnd]);

  const options = {
    plugins: {
      legend: {
        position: 'left',
      },
      datalabels: {
        display: true,
        color: 'black',
        formatter: (value) => value,
        font: {
          weight: 'bold',
          size: 20,
        },
      },
    },
    maintainAspectRatio: false,
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChartPrestamo;
