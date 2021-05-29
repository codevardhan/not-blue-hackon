import pickle, json, smtplib
from flask import Flask, jsonify, request
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask_restful import Resource, Api
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
from flask_httpauth import HTTPBasicAuth
from dotenv import dotenv_values

app = Flask(__name__)
api=Api(app)
auth=HTTPBasicAuth()

config = dotenv_values(".env")

API_UNAME=config['API_UNAME'] 
API_PASS=config['API_PASS']
EMAIL_UNAME=config['EMAIL_UNAME']
EMAIL_PASS=config['EMAIL_PASS']

USER_DATA= {API_UNAME:API_PASS}

POSITIVE = False
NEGATIVE = True
SENTIMENT_THRESHOLDS = (0.4, 0.7)
tokenizer = Tokenizer()

with open('models/tokenizer.pickle', 'rb') as handle:
	tokenizer = pickle.load(handle)

def decode_sentiment(score):
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


class Predict_dep_ml(Resource):
    def post(self):
        model = load_model('models/best_model.h5')
        data=request.get_json()
        result = predict(data['search-term'], model)
        return jsonify(result)

class Send_email(Resource):
    @auth.login_required
    def post(self):
        #get data from API endpoint
        recipients=request.get_json()
        user_name=recipients[0]
        user_email=recipients[1]
        recipients=recipients[2:]
        #start SMTP server to send email
        server=smtplib.SMTP_SSL("smtp.gmail.com", 465)
        server.login(EMAIL_UNAME, EMAIL_PASS)
        #create body of email
        msg = MIMEMultipart()
        sender = 'notblueorg@gmail.com'
        msg['Subject'] = "Friend Alert"
        msg['From'] = sender
        msg['To'] = ", ".join(recipients)
        body = f"{user_name}, hope you get well soon. {user_email}"
        body = MIMEText(body)
        msg.attach(body)
        server.sendmail(sender, recipients, msg.as_string())
        server.quit
        return jsonify("success")

@app.route('/')
def home():
    return 'API is active! Please send a POST request to "/predict" with the phrase you would like to test. Syntax: {"search-term": "&#60;insert phrase to test&#62;"}'

@auth.verify_password
def verify(username, password):
    if not (username and password):
        return False
    return USER_DATA.get(username) == password

api.add_resource(Send_email, "/email")
api.add_resource(Predict_dep_ml, "/predict")
