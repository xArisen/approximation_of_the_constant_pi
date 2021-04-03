from flask import Flask
from flask import jsonify
from flask import request
from utils.monte_carlo import approximation_of_the_PI

app = Flask(__name__)


@app.route('/test', methods=['GET'])
def test():
    return jsonify(result='Hello')


@app.route('/monte_carlo', methods=['GET'])
def test_post():
    runs = request.args.get('runs')
    result = approximation_of_the_PI(int(runs))

    return jsonify(result)


app.run()
