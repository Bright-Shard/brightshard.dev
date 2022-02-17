import flask
from flask import Flask, send_file
from flask_cors import CORS
import jinja2

projects = [
	{'title': 'Cookie Clicker++', 'desc': 'The cookies never stop coming', 'imgsrc': '/static/images/icons/cookie-clicker-icon.png', 'href': '/projects/ccpp'}, 
	{'title': 'BrightBot', 'desc': 'Free, open-source Discord bot with basic admin commands', 'imgsrc': '/static/images/icons/discord.png', 'href': '/projects/brightbot'},
	{'title': 'Trick Troller', 'desc': 'Better Rick Rolls', 'imgsrc': '/static/images/icons/rickroll.jpg', 'href': 'https://redirect.brightshard.dev'
	}]

def render_template(url):
    return flask.render_template(url, projects=projects)

app = Flask('BrightShard\'s Website')
cors = CORS(app, resource={
	r'/static/style.css': {
		'origins': '*'
	},
	r'/static/fonts/*': {
		'origins': '*'
	},
	r'/static/scripts/*': {
		'origins': '*'
	}
})


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/projects')
@app.route('/projects.<ending>')
def listProjects(ending=None):
    return render_template('projects.html')


@app.route('/<page>.<ending>')
@app.route('/<page>')
def showPage(page, ending=None):
    try:
        return render_template(f'{page}.html')
    except jinja2.exceptions.TemplateNotFound:
        return render_template('404.html')


@app.route('/projects/<project>')
@app.route('/projects/<project>.<ending>')
def showProject(project, ending=None):
    try:
        return render_template(f'projects/{project}.html')
    except jinja2.exceptions.TemplateNotFound:
        return render_template('404.html')


@app.route('/downloads/<file>')
@app.route('/download/<file>')
def downloadFile(file):
    try:
        return send_file(f'files/{file}', as_attachment=True)
    except FileNotFoundError:
        return render_template('404.html')


if __name__ == '__main__':
    app.run('0.0.0.0', 80)