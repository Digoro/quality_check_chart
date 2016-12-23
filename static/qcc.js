$(document).ready(function() {
    $('#paginatedTable').DataTable();
} );

for(var i=1; i<21; i++) {
    window['chart'+i];
}

var minRate = 20;
var maxRate = 80;

var title = {text: ""}
var xAxis = {
    type: 'datetime',
    tickPixelInterval: 150,
    maxZoom: 20 * 1000,
    labels: {
        format: '{value:%Y-%m-%d %H:%m:%S}',
        rotation: 45,
        align: 'left'
    }
}
var yAxis = {
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
}
var series = [{
    name: 'A 품질',
    data: []
}]

function addRow(id, criterion, quality, time, color){
    var tBody = document.getElementById(id);
    var row = tBody.insertRow(0);
    row.insertCell(0).innerHTML = criterion;
    row.insertCell(1).innerHTML = time;
    row.insertCell(2).innerHTML = quality;
    row.style.backgroundColor = color;
}

for(var i=1; i<21; i++){
    window['addRow' + i] = new Function('criterion', 'quality', 'time', 'color', 'addRow("tbody'+i+'", criterion, quality, time, color)');
    window['requestData' + i] = new Function('$.ajax({'+'url: "/live-data'+i+'",success: function(point) {var series = chart'+i+
    '.series[0];var shift = series.data.length > 20;series.addPoint(point, true, shift);var time = moment(point[0]).format("YYYY-MM-DD HH:mm:ss");var quality = point[1];if(quality > maxRate){$("#heading'+i+
    '").css("background-color", "#b64949");addRow'+i+'("over", quality, time, "#F2DEDE");} else if(quality < minRate){$("#heading'+i+
    '").css("background-color", "#2d9bd2");addRow'+i+'("under", quality, time, "#D9EDF7");} else{$("#heading'+i+'").css("background-color", "#DFF0D8");}setTimeout(requestData'+i+', 800);},cache: false});');
    window['drawChart' + i] = new Function('id', 'chart'+i+' = new Highcharts.Chart({chart: {renderTo: id, defaultSeriesType: "spline", events: {load: requestData'+i+'}}, title: title, xAxis: xAxis, yAxis: yAxis, series: series});');
    window['drawChart' + i]($('#qcc'+i)[0]);
}