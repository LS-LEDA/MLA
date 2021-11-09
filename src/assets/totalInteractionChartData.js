export const totalInteractionChartData = {
    type: 'bar',
    data: {
        labels: [
            "Interaction 1",
            "Interaction 2",
            "Interaction 3",
            "Interaction 4",
            "Interaction 5",
            "Interaction 6",
            "Interaction 7",
            "Interaction 8",
            "Interaction 9",
            "Interaction 10",
            "Interaction 11",
            "Interaction 12",
            "Interaction 13",
            "Interaction 14",
            "Interaction 15",
            "Interaction 16",
            "Interaction 17",
            "Interaction 18",
            "Interaction 19",
            "Interaction 20"
        ],
        datasets: [{
            label: '',
            data: [85, 151, 100, 200, 67, 10, 23, 85, 19, 49, 85, 151, 100, 200, 67, 10, 23, 85, 19, 49],
            backgroundColor: [
                'rgba(0, 99, 132, 0.6)',
                'rgba(30, 99, 132, 0.6)',
                'rgba(60, 99, 132, 0.6)',
                'rgba(90, 99, 132, 0.6)',
                'rgba(120, 99, 132, 0.6)',
                'rgba(150, 99, 132, 0.6)',
                'rgba(180, 99, 132, 0.6)',
                'rgba(210, 99, 132, 0.6)',
                'rgba(240, 99, 132, 0.6)'
            ],
            borderColor: [
                'rgba(0, 99, 132, 1)',
                'rgba(30, 99, 132, 1)',
                'rgba(60, 99, 132, 1)',
                'rgba(90, 99, 132, 1)',
                'rgba(120, 99, 132, 1)',
                'rgba(150, 99, 132, 1)',
                'rgba(180, 99, 132, 1)',
                'rgba(210, 99, 132, 1)',
                'rgba(240, 99, 132, 1)'
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
        }
    }
}

export default totalInteractionChartData;