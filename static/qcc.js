$(document).ready(function() {
    $('#paginatedTable').DataTable();
});

var chart;
var minRate = 20;
var maxRate = 80;

function addRow(criterion, quality, time, color) {
    var tBody = document.getElementById("tbody");
    var row = tBody.insertRow(0);
    row.insertCell(0).innerHTML = criterion;
    row.insertCell(1).innerHTML = time;
    row.insertCell(2).innerHTML = quality;
    row.style.backgroundColor = color;
}

function requestData() {
    $.ajax({
        url: "/live-data",
        success: function(point) {
            var series = chart.series[0];
            var shift = series.data.length > 20;
            series.addPoint(point, true, shift);
            var time = moment(point[0]).format("YYYY-MM-DD HH:mm:ss");
            var quality = point[1];
            if (quality > maxRate) {
                $("#heading").css("background-color", "#b64949");
                addRow("over", quality, time, "#F2DEDE");
            } else if (quality < minRate) {
                $("#heading").css("background-color", "#2d9bd2");
                addRow("under", quality, time, "#D9EDF7");
            } else {
                $("#heading").css("background-color", "#DFF0D8");
            }
            setTimeout(requestData, 800);
        },
        cache: false
    });
}

function drawChart(id) {
    chart = new Highcharts.Chart({
        chart: {
            renderTo: id,
            defaultSeriesType: "spline",
            events: {
                load: requestData
            }
        },
        title: {
            text: ""
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            maxZoom: 20 * 1000,
            labels: {
                format: '{value:%Y-%m-%d %H:%m:%S}',
                rotation: 45,
                align: 'left'
            }
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            title: {
                text: 'A 품질',
                margin: 80
            },
            plotLines: [{
                value: minRate,
                color: '#2d9bd2',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: '품질 최소값'
                }
            }, {
                value: maxRate,
                color: '#b64949',
                dashStyle: 'shortdash',
                width: 2,
                label: {
                    text: '품질 최대값'
                }
            }]
        },
        series: [{
            name: 'A 품질',
            data: []
        }]
    });
}

drawChart($('#qcc')[0])