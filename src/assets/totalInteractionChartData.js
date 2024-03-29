export const totalInteractionChartData = {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['rgba(0, 99, 132, 0.6)'],
        borderColor: ['rgba(0, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: false,
          },
          pinch: {
            enabled: false,
          },
          mode: 'xy',
        },
        pan: {
          enabled: false,
          mode: 'xy',
        },
        limits: {
          y: { min: 0 },
        },
      },
    },
    elements: {
      point: {
        radius: 1,
        hitRadius: 2,
        hoverRadius: 3,
      },
    },
    interaction: {
      mode: 'x',
      intersect: false,
    },
    scales: {
      x: {
        type: 'category',
      },
      y: {},
    },
  },
};

export default totalInteractionChartData;
