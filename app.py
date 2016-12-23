import json
from time import time
from random import random
from flask import Flask, render_template, make_response

app = Flask(__name__)


@app.route('/')
def index():
    arr = [0] * 20
    return render_template('index.html', arr=arr)


@app.route('/live-data1')
def live_data1():
    return get_data()


@app.route('/live-data2')
def live_data2():
    return get_data()


@app.route('/live-data3')
def live_data3():
    return get_data()


@app.route('/live-data4')
def live_data4():
    return get_data()


@app.route('/live-data5')
def live_data5():
    return get_data()


@app.route('/live-data6')
def live_data6():
    return get_data()


@app.route('/live-data7')
def live_data7():
    return get_data()


@app.route('/live-data8')
def live_data8():
    return get_data()


@app.route('/live-data9')
def live_data9():
    return get_data()


@app.route('/live-data10')
def live_data10():
    return get_data()


@app.route('/live-data11')
def live_data11():
    return get_data()


@app.route('/live-data12')
def live_data12():
    return get_data()


@app.route('/live-data13')
def live_data13():
    return get_data()


@app.route('/live-data14')
def live_data14():
    return get_data()


@app.route('/live-data15')
def live_data15():
    return get_data()


@app.route('/live-data16')
def live_data16():
    return get_data()


@app.route('/live-data17')
def live_data17():
    return get_data()


@app.route('/live-data18')
def live_data18():
    return get_data()


@app.route('/live-data19')
def live_data19():
    return get_data()


@app.route('/live-data20')
def live_data20():
    return get_data()


def get_data():
    data = [time() * 1000, random() * 100]
    response = make_response(json.dumps(data))
    response.content_type = 'application/json'
    return response


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
