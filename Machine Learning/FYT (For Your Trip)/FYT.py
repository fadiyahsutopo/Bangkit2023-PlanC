#!/usr/bin/env python
# coding: utf-8

# In[1]:


#!pip install tensorflow


# In[2]:


import numpy as np
import tensorflow as tf
import pandas as pd
import os
import matplotlib.pyplot as plt
import seaborn as sns
import requests
from sklearn.metrics.pairwise import cosine_similarity
from PIL import Image
from io import BytesIO
from PIL import Image
from keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras import Model
from tensorflow.keras.utils import img_to_array, load_img


# In[3]:


data = pd.read_csv('fyt.csv')

data.head(10)


# In[4]:


print("Total number of user_id : ", data.shape[0])
print("Total number of user_id : ", data["user_id"].nunique())
print("Total number of username : ", data["username"].nunique())
print("Total number of unique category : ", data["category"].nunique())
print("Total number of unique image_id : ", data["image_id"].nunique())
print("Total number of unique image_url : ", data["image_url"].nunique())


# In[5]:


data['category'].value_counts()


# In[6]:


plot = sns.countplot(data["category"])
plt.title("Distribution of category")
plt.xlabel("category")
plt.ylabel("username")
plot.set_xticklabels(plot.get_xticklabels())


# In[7]:


print(data.columns)


# In[8]:


print(data.dtypes)


# In[9]:


#load model classification
model = tf.keras.models.load_model('classification.h5')


# In[10]:


model.summary()


# In[14]:


def load_and_preprocess_image(image_url):
    response = requests.get(image_url)
    image_data = response.content
    
    image = Image.open(BytesIO(image_data))
    image = image.resize((150, 150))
    image = np.array(image)
    image = image / 255.0  
    return image

image_features = pd.DataFrame(columns=['user_id', 'image_feature', 'content_url'])
for index, row in data.iterrows():
    user_id = row['user_id']
    image_url = row['image_url']
    print(image_url)
    
    image = load_and_preprocess_image(image_url)
    features = model.predict(np.expand_dims(image, axis=0))
    image_features = image_features.append({'user_id': user_id, 'image_feature': features.flatten(), 'content_url' : str(image_url)}, ignore_index=True)

merged_data = pd.merge(data, image_features, on='user_id')
print("Data berhasil diekstraksi:")
#print(merged_data)


# In[15]:


merged_data.head()


# In[16]:


image_features.head(10)


# In[19]:


def load_and_preprocess_image(image_url):
    response = requests.get(image_url)
    image = Image.open(BytesIO(response.content))
    image = image.resize((150, 150)) 
    image = np.array(image)
    image = image / .255
    return image

def recommend_similar_images(data, new_image_url, top_n=10):
    new_image = load_and_preprocess_image(new_image_url)
    new_image = np.expand_dims(new_image, axis=0)
    new_image_feature = model.predict(new_image).flatten()

    image_feature_vectors = np.vstack(data['image_feature'].values)
    cosine_sim_matrix = cosine_similarity(image_feature_vectors, np.expand_dims(new_image_feature, axis=0))
    similarity_scores = cosine_sim_matrix.flatten()
    sorted_indices = np.argsort(similarity_scores)[::-1][:top_n]

    recommended_images = data.iloc[sorted_indices]
    return recommended_images


# In[20]:


new_image_url = 'https://storage.googleapis.com/planc-product-capstone-bucket/user_img/user_img/gunung/8_gunung(1).jpg'
recommended_images = recommend_similar_images(image_features, new_image_url, top_n=10)
for i in range(10):
    print(recommended_images['content_url'].iloc[i])


# In[21]:


print(recommended_images['content_url'].iloc[0])


# In[23]:


#pd.options.display.max_rows = 4000


# In[24]:


import pickle

with open('recommended_images.pkl', 'wb') as file:
    pickle.dump(recommended_images, file)


# In[25]:


with open('recommended_images.pkl', 'rb') as file:
    loaded_images = pickle.load(file)

print(loaded_images)

