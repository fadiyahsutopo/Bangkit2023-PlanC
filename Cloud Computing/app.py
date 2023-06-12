from flask_cors import CORS
from flask import Flask

from keras.models import load_model
from keras.utils.data_utils import get_file

import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

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
    destination = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/planc_destinations.csv')
    destination_array = np.array(list(set(rating.place_id)))
    user = np.array([user_id for i in range(len(destination_array))])

    predictions = keras_model.predict([user, destination_array])
    predictions = np.array([a[0] for a in predictions])
    recommended_place_id = (-predictions).argsort()[:num_of_rec]

    recommendation = destination[destination['place_id'].isin(
        recommended_place_id)].to_json(orient='records')

    # print(num_of_rec, 'recommendations for', user_id)
    # print(recommended_place_id)
    # print(predictions[recommended_place_id])
    return recommendation

@app.route('/destination/<int:dest_id>')
def destination(dest_id):
    destinations = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/planc_destinations.csv')
    destination = destinations[destinations['place_id']
                               == dest_id].to_json(orient='records')
    return destination

@app.route('/user/<int:user_id>')
def user(user_id):
    users = pd.read_csv(
        'https://storage.googleapis.com/planc-product-capstone-bucket/keras/users.csv')
    user = users[users['user_id'] == user_id].to_json(orient='records')
    return user

if __name__ == '__app__':
    app.run(host='0.0.0.0', port=5000)