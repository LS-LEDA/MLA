const hours = [
    '00', '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11',
    '12', '13', '14', '15', '16', '17',
    '18', '19', '20', '21', '22', '23'
];

const days = [
    'Sunday','Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday'
];

const weeklyInteractionConfig = {
    tooltip: {
        position: 'top'
    },
    grid: {
        height: '60%',
        top: 'center',
    },
    xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
            show: true
        }
    },
    yAxis: {
        type: 'category',
        data: days,
        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: 0,
        max: 500,
        calculable: true,
        orient: 'vertical',
        top: 'center',
        right: '3%',
    },
    series: [
        {
            name: 'Weekly Interactions',
            type: 'heatmap',
            coordinateSystem: 'cartesian2d',
            data: null,
            label: {
                show: true
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

export default weeklyInteractionConfig;