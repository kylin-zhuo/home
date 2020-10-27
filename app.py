from flask import Flask, render_template
from flask_bootstrap import Bootstrap
import json
import datetime
import sqlite3
from flask import g

DATABASE = 'db/kylin-home.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

app = Flask(__name__)
Bootstrap(app)

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()


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
	# fetch the descriptions of all the posts
    cur = get_db().execute("select * from post order by date")
    post_list = cur.fetchall()
    cur.close()
    # print(post_list)
    return render_template('blog.html', post_list=post_list, len=len(post_list))


@app.route('/contact.html')
def contact():
    return render_template('contact.html')


@app.route('/gallery.html')
def gellery():
    return render_template('gallery.html')


@app.route('/demidovich.html')
def demodovich():
	solve = []
	with open("data/demidovich/solved.txt") as file:
		solved = parse_demi_progress(file)
	return render_template('demidovich.html', solved=solved)


@app.route('/update-demi/<string:action>/<int:question_id>')
def update(action, question_id):

	qs = []
	
	with open("data/demidovich/solved.txt", "r") as file:

		qs = parse_demi_progress(file)

		if action == 'add':
			print("add " + str(question_id))

			if question_id not in qs:
				qs.append(question_id)
				qs.sort()

		elif action == 'remove':
			print("remove" + str(question_id))
			if question_id in qs:
				qs.remove(question_id)

	with open("data/demidovich/solved.txt", "w") as file:
		file.write(str(qs))

	if action == 'add':
		logs = {}
		with open("data/demidovich/log.txt", "r") as log:
			logs = json.loads(log.read())
			date_str = str(datetime.datetime.now().date())
			if date_str not in logs:
				logs[date_str] = str(question_id)
			else:
				cur = logs[date_str]
				s = cur.split(",")
				if str(question_id) not in s:
					s.append(str(question_id))
				logs[date_str] = ",".join(s)

		with open("data/demidovich/log.txt", "w") as log:
			log.write(json.dumps(logs))

	return "success - " + action + ": " + str(question_id)


# @app.route('/test')
# def test1():
# 	data = {}
# 	with open("data/demidovich/log.json", "r") as file:
# 		data = json.loads(file.read())
# 	data['2020-09-12'] = "4,5"
# 	with open("data/demidovich-log.json", "w") as file:
# 		file.write(json.dumps(data))
# 	return str(data)

 
def parse_demi_progress(f):
	return json.loads(f.read())

if __name__ == "__main__":
    app.run(debug=True, port=8080)
