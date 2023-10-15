from flask import Flask, request, jsonify, send_from_directory, Response
import crawler

app = Flask(__name__, static_folder='../client')

@app.route('/', methods=['GET'])
def home():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/find_path', methods=['POST'])
def find_path():
    try:
        data = request.get_json()
        start_page = data['start']
        finish_page = data['finish']

        # Clear the logs at the start of each request
        crawler.logs = []

        path = crawler.find_path(start_page, finish_page)

        response = jsonify({'path': path})
        print(response)
        return response
    except Exception as e:
        app.logger.error(f"Error occurred: {e}")
        return jsonify({'error': 'An error occurred while finding path'}), 500

@app.route('/logs', methods=['GET'])
def stream_logs():
    def generate():
        for log in crawler.logs:
            yield f"data: {log}\n\n"
    return Response(generate(), mimetype='text/event-stream')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    app.run(port=5000, threaded=True)
