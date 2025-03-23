from flask import Flask, request, jsonify
from flask_cors import CORS
from text_analysis import analyze_text

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    if not data or 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    text = data['text']
    try:
        result = analyze_text(text)
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Load model once at startup
    print("Starting server and loading model...")
    app.run(debug=True, port=5000)