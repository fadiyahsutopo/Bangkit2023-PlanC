import requests
import urllib.parse
import json
from flask import Flask, url_for, request

# from keras.models import load_model
# import h5py

# prd_model = load_model('my_model.h5')

app = Flask(__name__)


@app.route('/apitest')
def apitest():
    return 'API working'

# main API code


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