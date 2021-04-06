from flask import Flask
from flask import jsonify
import json
from flask import request
from utils.monte_carlo import approximation_of_the_PI
from utils.monte_carlo import approximation_of_the_figure_field_created_by_chart
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/test', methods=['GET'])
def test():
    return jsonify(result='Hello')


@app.route('/monte_carlo/approximation_of_the_PI', methods=['GET'])
def calculate1():
    runs = request.args.get('runs')
    result = approximation_of_the_PI(int(runs))

    return jsonify(result)


# Delete after dev
exapleJson = '{ "points_coordinates": [ [0, 0], [2, 2],  [6, 1], [8, 0] ] }'

# TODO change for external API


@app.route('/monte_carlo/approximation_of_the_figure_field', methods=['GET'])
def calculate2():
    runs = request.args.get('runs')
    result = approximation_of_the_figure_field_created_by_chart(
        json.loads(exapleJson)['points_coordinates'], int(runs))

    return jsonify(result)


@app.route("/login")
@cross_origin(supports_credentials=True)
def login():
    return jsonify({'success': 'ok'})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
