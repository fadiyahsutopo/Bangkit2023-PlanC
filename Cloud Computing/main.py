from tensorflow.keras.layers import Input, Embedding, Flatten, Dropout, Dense, Concatenate
from tensorflow.keras.models import Model
from typing import Dict, Text
import pandas as pd
import numpy as np
import requests
import urllib.parse
import json
from flask import Flask, url_for, request
import math

from keras.models import load_model, model_from_json
import tensorflow as tf
import tensorflow_recommenders as tfrs

from tensorflow import keras
from tensorflow.keras import layers
from keras.utils.data_utils import get_file
import json
# import tensorflow_hub as hub

# from keras.model import load_weights
# import h5py

# prd_model = tf.keras.Model()
# print(prd_model)

# # test
# test_model = load_model('./models/test/my_model.h5')
# print(test_model)

# # Classif
# classif_model = load_model('./models/classif/classification.h5')
# print(classif_model.summary())

# # Keras Model

# # keras_model = load_model('./models/keras/keras_recommender.h5')
# model_path = get_file(
#     'keras_recommender',
#     'https://storage.googleapis.com/planc-product-capstone-bucket/keras/keras_recommender.h5')
# keras_model = load_model(model_path)
# print(keras_model.summary())

# # KERAS RECOMMENDATION

# # rating = pd.read_csv('./models/keras/user_rating.csv')
# # destination = pd.read_csv('./models/keras/planc_destinations.csv')
# rating = pd.read_csv('https://storage.googleapis.com/planc-product-capstone-bucket/keras/user_rating.csv')
# destination = pd.read_csv(
#     'https://storage.googleapis.com/planc-product-capstone-bucket/keras/planc_destinations.csv')
# print(destination.photos)
# destination_array = np.array(list(set(rating.place_id)))

# # set user id
# user_id = 12
# user = np.array([user_id for i in range(len(destination_array))])

# print('user: ', user)
# print('dest: ', destination_array)

# predictions = keras_model.predict([user, destination_array])
# predictions = np.array([a[0] for a in predictions])
# recommended_place_id = (-predictions).argsort()[:5]

# print(recommended_place_id)
# print(predictions[recommended_place_id])
# print(destination[destination['place_id'].isin(recommended_place_id)])

# def recommendations(user_id=12, num_of_rec=5):
#     print(num_of_rec, 'recommendations for', user_id)
#     model_path = get_file(
#         'keras_recommender',
#         'https://storage.googleapis.com/planc-product-capstone-bucket/keras/keras_recommender.h5')
#     keras_model = load_model(model_path)
#     rating = pd.read_csv(
#         'https://storage.googleapis.com/planc-product-capstone-bucket/keras/user_rating.csv')
#     destination = pd.read_csv(
#         'https://storage.googleapis.com/planc-product-capstone-bucket/keras/planc_destinations.csv')
#     destination_array = np.array(list(set(rating.place_id)))
#     user = np.array([user_id for i in range(len(destination_array))])

#     predictions = keras_model.predict([user, destination_array])
#     predictions = np.array([a[0] for a in predictions])
#     recommended_place_id = (-predictions).argsort()[:num_of_rec]

#     # print(recommended_place_id)
#     # print(predictions[recommended_place_id])
#     return destination[destination['place_id'].isin(recommended_place_id)]

# # TFRS Model
# tfrs_path = './models/tfrs/model.json'

# json_file = open(tfrs_path, 'r')
# loaded_model_json = json_file.read()
# json_file.close()

# loaded_model = tf.keras.models.model_from_json(
#     loaded_model_json, custom_objects={'RecommenderModel': tf.keras.models.RecommenderModel})
# config = loaded_model.get_config()
# # tfrs_model = loaded_model.load_weights('./models/tfrs/model_weights.h5')
# print("Loaded model from disk")
# print(loaded_model)
# # print(tfrs_model)

# tfrs_model = load_model('./models/tfrs/model_weights.h5')
# print(tfrs_model)

app = Flask(__name__)

# main API code

@app.route('/classification')
def classification():
    return 'API working'


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

    # recommendation = destinations[destinations['place_id'].isin(
    #     recommended_place_id)].to_json(orient='records')

    recommendation = pd.DataFrame()
    for i in recommended_place_id:
        recommendation = pd.concat(
            [recommendation, destinations[destinations['place_id'] == i]], ignore_index=True)
        recommendation.reset_index()
    recommendation = recommendation.to_json(orient='records')

    # print(num_of_rec, 'recommendations for', user_id)
    # print(recommended_place_id)
    # print(predictions[recommended_place_id])
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
        # print(index)
        # print(nearest_id)
        # print(nearest_dist)
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
    # nearest = destinations[destinations['place_id'].isin(
    #     nearest_id)].to_json(orient='records')
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

# COMING SOON
# @app.route('/user/<string:user_id>')
# def user(user_id):
#     rating = pd.read_csv(
#         'https://storage.googleapis.com/planc-product-capstone-bucket/keras/user_rating.csv')
#     destination_array = np.array(list(set(rating.place_id)))
#     user = np.array([user_id for i in range(len(destination_array))])
#     return user.to_json()


# @app.route('/sentiment', methods=['POST'])
# def sentiment():
#    if request.method == 'POST':
#     text_data = pd.DataFrame(request.json)
#     text_out = get_sentiment_DL(prd_model, text_data, word_idx)

#     text_out = text_out[['ref', 'Sentiment_Score']]
#     #Convert df to dict and then to Json
#     text_out_dict = text_out.to_dict(orient='records')
#     text_out_json = json.dumps(text_out_dict, ensure_ascii=False)
#     return text_out_json
   

# def get_sentiment_DL(best_model, text_data, word_idx):
#     '''Modle Processing'''
#     return sentiment_score


# data_json = '''{"ref":[1], "text":["I am well"]}'''
# head = {"Content-type": "application/json"}
# response = requests.post('http: //0.0.0.0:5005/sentiment', json = data_json, headers = head)
# result = response.content.decode('utf8')


if __name__ == "__main__":
  app.run(host="0.0.0.0", debug=False, port=5005)