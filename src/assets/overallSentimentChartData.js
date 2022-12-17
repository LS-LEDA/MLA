export const overallSentimentChartData = {
  type: 'doughnut',
  data: {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [
          'rgba(66, 196, 158, 0.6)',
          'rgba(233, 196, 106, 0.6)',
          'rgba(225, 86, 86, 0.6)',
        ],
        borderColor: [
          'rgba(66, 196, 158, 1)',
          'rgba(233, 196, 106, 1)',
          'rgba(225, 86, 86, 1)',
        ],
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
    },
  },
};

export default overallSentimentChartData;
