from flask import Flask, render_template
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/index.html')
def index():
    return render_template('index.html')

@app.route('/about.html')
def about():
    return render_template('about.html')

@app.route('/blog.html')
def blog():
    return render_template('blog.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/gallery.html')
def gellery():
    return render_template('gallery.html')

@app.route('/demidovich.html')
def demodovich():
	file = open("data/demidovich.txt")
	d = file.readlines()
	solved = list(set(map(lambda x:int(x), d[0].split(',')))) if len(d) > 0 else []
	return render_template('demidovich.html', solved=solved)


if __name__ == "__main__":
    app.run(debug=True, port=8080)
