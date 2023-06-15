import numpy as np
import tensorflow as tf
import pandas as pd
import requests
from urllib import request

from PIL import Image
from io import BytesIO

from keras.models import load_model
from keras.utils.data_utils import get_file

from sklearn.metrics.pairwise import cosine_similarity


def load_and_preprocess_image(image_url):
    response = requests.get(image_url)
    image_data = response.content

    image = Image.open(BytesIO(image_data))
    image = image.resize((150, 150))
    image = np.array(image)
    image = image / 255.0
    return image


def extract_image_features(data, model):
    image_features = pd.DataFrame(
        columns=['user_id', 'category', 'image_feature', 'content_url'])

    for index, row in data.iterrows():
        user_id = row['user_id']
        image_url = row['image_url']
        category = row['category']
        print(image_url)

        image = load_and_preprocess_image(image_url)
        features = model.predict(np.expand_dims(image, axis=0))
        image_features = image_features.append({'user_id': user_id, 'category': str(
            category), 'image_feature': features.flatten(), 'content_url': str(image_url)}, ignore_index=True)

    merged_data = pd.merge(data, image_features, on='user_id')
    print("Data berhasil diekstraksi:")
    return image_features


def recommend_similar_images(data, new_image_url, top_n=10):
    new_image = load_and_preprocess_image(new_image_url)
    new_image = np.expand_dims(new_image, axis=0)
    new_image_feature = model_planc.predict(new_image).flatten()

    image_feature_vectors = np.vstack(data['image_feature'].values)
    cosine_sim_matrix = cosine_similarity(
        image_feature_vectors, np.expand_dims(new_image_feature, axis=0))

    similarity_scores = cosine_sim_matrix.flatten()
    sorted_indices = np.argsort(similarity_scores)[::-1][:top_n]

    recommended_images = data.iloc[sorted_indices]
    return recommended_images


def categorize(recommended_images):
    categories = []
    for category in recommended_images['category']:
        categories.append(category)
    grouping = categories.max(categories, key=categories.count)
    return grouping


def update_data():
    global data_planc
    global model_planc
    global extracted_data
    response = request.urlretrieve(
        "https://storage.googleapis.com/planc-product-capstone-bucket/fyt/classifications.h5", "classifications.h5")
    response = request.urlretrieve(
        "https://storage.googleapis.com/planc-product-capstone-bucket/fyt/PlanC.csv", "PlanC.csv")
    model_planc = tf.keras.models.load_model('classifications.h5')
    data_planc = pd.read_csv('PlanC.csv')
    extracted_data = extract_image_features(data_planc, model_planc)
    return 'Model Update Success'


update_data()


def for_your_trip(image_url, top_n):
    new_image_url = image_url
    return recommend_similar_images(extracted_data, image_url, top_n)
