import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChartFacultad = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Función para obtener los datos de préstamos y actualizar el gráfico
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/libro/porcentaje`);
      const prestamos = response.data;
      console.log(prestamos);

      // Definir etiquetas y datos
      const labels = ['Libros Prestados', 'Libros Disponibles'];
      const data = [prestamos.librosPrestados, prestamos.librosDisponibles];

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Distribución de Libros',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)', // Color para libros prestados
              'rgba(54, 162, 235, 0.2)', // Color para libros disponibles
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',   // Borde para libros prestados
              'rgba(54, 162, 235, 1)',   // Borde para libros disponibles
            ],
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    maintainAspectRatio: true,
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChartFacultad;
