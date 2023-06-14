from flask_cors import CORS
from flask import Flask, request, jsonify

from keras.models import load_model
from keras.utils.data_utils import get_file

from flask_jwt_extended import (
    JWTManager, jwt_required, create_access_token,
    get_jwt_identity
)

from google.cloud import storage

import pandas as pd
import numpy as np
import math
import json
import uuid
import os
import csv

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'planc-ganteng'
jwt = JWTManager(app)

@app.route('/')
def index():
    return "Hello, World!"


@app.route('/api')
def api():
    return "API Running"


@app.route('/recommend')
@app.route('/recommend/<int:user_id>')
@app.route('/recommend/<int:user_id>/<int:num_of_rec>')
def recommend_id(user_id=12, num_of_rec=7):
    model_path = get_file(
        'keras_recommender',
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/keras_recommender.h5')
    keras_model = load_model(model_path)
    rating = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/user_rating.csv')
    destinations = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/planc_destinations.csv')
    destination_array = np.array(list(set(rating.place_id)))
    user = np.array([user_id for i in range(len(destination_array))])

    predictions = keras_model.predict([user, destination_array])
    predictions = np.array([a[0] for a in predictions])
    recommended_place_id = (-predictions).argsort()[:num_of_rec]

    recommendation = pd.DataFrame()
    for i in recommended_place_id:
        recommendation = pd.concat(
            [recommendation, destinations[destinations['place_id'] == i]], ignore_index=True)
        recommendation.reset_index()
    recommendation = recommendation.to_json(orient='records')

    return recommendation


@app.route('/nearest')
@app.route('/nearest/<int:lat>/<int:lng>')
@app.route('/nearest/<int:lat>/<int:lng>/<int:num>')
def nearest(lat=0.0, lng=0.0, num=5):
    destinations = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/planc_destinations.csv')
    destinations = destinations.reset_index()
    nearest_dist = [math.inf] * num
    nearest_id = [0] * num
    for index, n in destinations.iterrows():
        dist = math.dist([lat, lng], [n['lat'], n['lng']])
        for i in range(num):
            if nearest_dist[i] > dist:
                prev_dist = nearest_dist[i]
                prev_id = nearest_id[i]
                nearest_dist[i] = dist
                nearest_id[i] = n['place_id']
                for j in range(1, num-i):
                    prev_dist = nearest_dist[i+j]
                    prev_id = nearest_id[i+j]
                    if(i+j != num):
                        nearest_dist[i+j] = prev_dist
                        nearest_id[i+j] = prev_id
                break
    nearest = pd.DataFrame()
    for i in nearest_id:
        nearest = pd.concat(
            [nearest, destinations[destinations['place_id'] == i]], ignore_index=True)
        nearest.reset_index()
    nearest = nearest.to_json(orient='records')
    return nearest


@app.route('/destination/<int:dest_id>')
def destination(dest_id):
    destinations = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/planc_destinations.csv')
    destination = destinations[destinations['place_id']
                               == dest_id].to_json(orient='records')
    return destination


@app.route('/categories')
def categories():
    destinations = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/planc_destinations.csv')
    types = destinations['types'].unique()
    categories = []
    for type in types:
        photos = destinations[destinations['types']
                              == type]['photos'].sample().iloc[0]
        categories.append({'types': type,
                           'photos': photos})
    categories = json.dumps(categories)
    return categories


@app.route('/category/<string:category>')
def category(category):
    destinations = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/planc_destinations.csv')
    destination = destinations[destinations['types']
                               == category].to_json(orient='records')
    return destination


@app.route('/user/<int:user_id>')
def user(user_id):
    users = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/users.csv')
    user = users[users['user_id'] == user_id].to_json(orient='records')
    return user

@app.route('/search/<string:query>')
def search(query):
    destinations = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/planc_destinations.csv')
    filtered_destinations = destinations[destinations['place_name'].str.contains(query, case=False)]
    destination = filtered_destinations.to_json(orient='records')
    return destination

def upload_image_to_bucket(bucket_name, file, service_account_key):
    client = storage.Client.from_service_account_json(service_account_key)

    bucket = client.bucket(bucket_name)

    unique_filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]

    file.save('/tmp/' + unique_filename)

    blob = bucket.blob("image_from_fyt/" + unique_filename)

    blob.upload_from_filename('/tmp/' + unique_filename)

    os.remove('/tmp/' + unique_filename)

    image_url = blob.public_url
    return image_url

def append_to_csv(bucket_name, file_name, data, service_account_key):
    client = storage.Client.from_service_account_json(service_account_key)
    bucket = client.get_bucket(bucket_name)
    blob = bucket.blob(file_name)

    print("writing to csv")
    blob.download_to_filename('/tmp/temp.csv')

    with open('/tmp/temp.csv', 'a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(data)

    blob.upload_from_filename('/tmp/temp.csv')

    return blob.public_url

@app.route('/upload', methods=['POST'])
def upload(): 

    if 'image' not in request.files:
        return "No file found", 400

    service_account_key = "./product-capstone-b5b859f751a2.json"

    image_url = upload_image_to_bucket('planc-product-capstone-bucket', request.files['image'], service_account_key)

    append_to_csv('planc-product-capstone-bucket', 'keras/fyt.csv', ["1", image_url], service_account_key)

    return jsonify({
        "message": f"Image uploaded to bucket"
    })

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    if password != 'password':
        return jsonify({'message': 'Invalid password'}), 401

    users = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/users.csv')
    filtered_user = users[users['username'] == username]

    if filtered_user.empty:
        return jsonify({'message': 'User not found'}), 404

    # Get the value of 'username_id' column from the first row
    username_id =  int(filtered_user['user_id'].iloc[0])

    access_token = create_access_token(identity=username)

    return jsonify({'access_token': access_token, 'user_id': username_id})

if __name__ == '__app__':
    app.run(host='0.0.0.0', port=5000)
