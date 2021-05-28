import Flask 

app = Flask(__name__)


@app.route('/')
def home():
	return "API home"

if __name__=='__main__':
    app.run()
