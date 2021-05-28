import pickle, json
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model



app = Flask(__name__)
api=Api(app)

POSITIVE = False
NEGATIVE = True
SENTIMENT_THRESHOLDS = (0.4, 0.7)
tokenizer = Tokenizer()

with open('models/tokenizer.pickle', 'rb') as handle:
	tokenizer = pickle.load(handle)


def decode_sentiment(score):
	score=1-score
	label=POSITIVE
	if score <= SENTIMENT_THRESHOLDS[0]:
		label = POSITIVE
	elif score > SENTIMENT_THRESHOLDS[1]:
		label = NEGATIVE
	return label


def predict(text, def_model):
	# Tokenize text
	tokenized_text = pad_sequences(tokenizer.texts_to_sequences([text]), maxlen=300)
	# Predict
	score = def_model.predict([tokenized_text])[0]
	# Decode sentiment
	label = decode_sentiment(score)
	return {"label": label, "score": float(score)}

class Test_index(Resource):
    def post(self):
        model = load_model('models/best_model.h5')
        data=request.get_json()
        result = predict(data['search-term'], model)
        return jsonify(result)


@app.route('/')
def home():
	return "API home"

if __name__=='__main__':
    app.run(host="0.0.0.0", debug=True)

api.add_resource(Test_index, "/predict")
