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
	solve = []
	with open("data/demidovich.txt") as file:
		solved = parse_demi_progress(file)
	return render_template('demidovich.html', solved=solved)

@app.route('/update-demi/<string:action>/<int:question_id>')
def update(action, question_id):

	qs = []
	
	with open("data/demidovich.txt", "r") as file:

		qs = parse_demi_progress(file)

		if action == 'add':
			print("add " + str(question_id))

			if question_id not in qs:
				qs.append(question_id)

		elif action == 'remove':
			print("remove" + str(question_id))
			if question_id in qs:
				qs.remove(question_id)

	with open("data/demidovich.txt", "w") as file:
		file.write(str(qs))

	return "success - " + action + ": " + str(question_id)
 

def parse_demi_progress(f):
	d = str(f.readline())
	print(d)
	d = d.strip('[').strip(']').strip()
	return [] if not d else list(set(map(lambda x:int(x), d.split(','))))

if __name__ == "__main__":
    app.run(debug=True, port=8080)
