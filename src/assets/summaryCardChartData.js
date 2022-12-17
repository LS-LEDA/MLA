export const summaryCardChartData = {
  type: 'bar',
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
    },
    interaction: {
      mode: 'x',
      intersect: false,
    },
    scales: {
      x: {
        type: 'category',
        ticks: {
          display: false,
        },
      },
      y: {},
    },
  },
};

export default summaryCardChartData;
