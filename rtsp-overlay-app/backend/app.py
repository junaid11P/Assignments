import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# MongoDB Configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client['rtsp_overlay_db']
overlays_collection = db['overlays']

def serialize_overlay(overlay):
    overlay['_id'] = str(overlay['_id'])
    return overlay

@app.route('/api/overlays', methods=['GET'])
def get_overlays():
    overlays = list(overlays_collection.find())
    return jsonify([serialize_overlay(o) for o in overlays])

@app.route('/api/overlays', methods=['POST'])
def create_overlay():
    data = request.json
    required_fields = ['type', 'content', 'position', 'size']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    new_overlay = {
        "type": data['type'],
        "content": data['content'],
        "position": data['position'], # {x, y}
        "size": data['size'],         # {width, height}
    }
    
    result = overlays_collection.insert_one(new_overlay)
    new_overlay['_id'] = str(result.inserted_id)
    return jsonify(new_overlay), 201

@app.route('/api/overlays/<overlay_id>', methods=['PUT'])
def update_overlay(overlay_id):
    data = request.json
    update_data = {}
    
    if 'position' in data:
        update_data['position'] = data['position']
    if 'size' in data:
        update_data['size'] = data['size']
    if 'content' in data:
        update_data['content'] = data['content']
    
    if not update_data:
        return jsonify({"error": "No data to update"}), 400
        
    result = overlays_collection.update_one(
        {'_id': ObjectId(overlay_id)},
        {'$set': update_data}
    )
    
    if result.matched_count == 0:
        return jsonify({"error": "Overlay not found"}), 404
        
    updated_overlay = overlays_collection.find_one({'_id': ObjectId(overlay_id)})
    return jsonify(serialize_overlay(updated_overlay))

@app.route('/api/overlays/<overlay_id>', methods=['DELETE'])
def delete_overlay(overlay_id):
    result = overlays_collection.delete_one({'_id': ObjectId(overlay_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Overlay not found"}), 404
    return jsonify({"message": "Overlay deleted successfully"})

if __name__ == '__main__':
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
