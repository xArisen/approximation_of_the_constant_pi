from flask import Flask
from flask import jsonify
from flask import request
from utils.monte_carlo import approximation_of_the_PI
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, support_credentials=True)


@app.route('/test', methods=['GET'])
def test():
    return jsonify(result='Hello')


@app.route('/monte_carlo', methods=['GET'])
def test_post():
    runs = request.args.get('runs')
    result = approximation_of_the_PI(int(runs))

    return jsonify(result)


@app.route("/login")
@cross_origin(supports_credentials=True)
def login():
    return jsonify({'success': 'ok'})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
