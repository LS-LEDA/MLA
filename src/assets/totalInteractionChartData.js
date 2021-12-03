export const totalInteractionChartData = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                'rgba(0, 99, 132, 0.6)',
            ],
            borderColor: [
                'rgba(0, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
        interaction: {
            mode: 'x',
            intersect: false
        },
        scales: {
            x: {
                type: 'category',
            },
            y: {
            }
        }
    }
}

export default totalInteractionChartData;