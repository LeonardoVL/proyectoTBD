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
      const response = await axios.get(`http://localhost:3000/api/libro/facultad`);
      const prestamos = response.data;
        console.log(prestamos)
      const labels = prestamos.map((item) => item._id);
      const data = prestamos.map((item) => item.totalPrestamos);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Número de préstamos',
            data: data,
            backgroundColor: labels.map(() => 
              `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
            ),
            borderColor: labels.map(() =>
              `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`
            ),
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
