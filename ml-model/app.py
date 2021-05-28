import Flask 

app = Flask(__name__)



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


@app.route('/')
def home():
	return "API home"

if __name__=='__main__':
    app.run()
