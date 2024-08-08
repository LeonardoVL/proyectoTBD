// PieChart.js
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ id }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Función para obtener los datos de préstamos y actualizar el gráfico
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/prestamo/usuario/${id}`);
      const prestamos = response.data;
      console.log(response.data)
  
      // Asegúrate de que prestamos sea un array
      // if (!Array.isArray(prestamos)) {
      //   console.error("La respuesta no es un array:", prestamos);
      //   return;
      // }
  
      const counts = {
        Excedidos: prestamos.Multa,
        Entregados: prestamos.Devuelto,
        Pendientes: prestamos.Activo,
      };
  
      // prestamos.forEach((prestamo) => {
      //   if (prestamo.estadoPrestamo === 'Multa') counts.Excedidos++;
      //   if (prestamo.estadoPrestamo === 'Devuelto') counts.Entregados++;
      //   if (prestamo.estadoPrestamo === 'Activo') counts.Pendientes++;
      // });
  
      const data = {
        labels: ['Excedidos', 'Entregados', 'Pendientes'],
        datasets: [
          {
            label: 'Número de prestamos',
            data: [counts.Excedidos, counts.Entregados, counts.Pendientes],
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
  }, [id]);

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

export default PieChart;
