from flask import Flask
from flask import jsonify
from flask import request

app = Flask(__name__)


@app.route('/test', methods=['GET'])
def test():
    return jsonify(result='Hello')


@app.route('/test', methods=['POST'])
def test_post():
    request_data = request.get_json()
    city = request.args.get('city')

    # return request_data
    return jsonify(city=city)


app.run()
