import flask
from flask import Flask, send_file, render_template
from flask_cors import CORS
import jinja2

projects = {
	'ccpp': {'title': 'Cookie Clicker++', 'desc': 'The cookies never stop coming', 'imgsrc': 'cookie-clicker-icon.png', 'href': 'ccpp'}, 
	'brightbot': {'title': 'BrightBot', 'desc': 'Free, open-source Discord bot with basic admin commands', 'imgsrc': 'discord.png', 'href': 'brightbot'},
	'tricktroll': {'title': 'Trick Troller', 'desc': 'Better Rick Rolls', 'imgsrc': 'rickroll.jpg', 'href': 'tricktroll'},
	'digispark': {'title': 'DigiSpark HID', 'desc': 'DigiSpark HID attacks', 'imgsrc': 'digispark.png', 'href': 'digispark'}
}

posts = {
	'hello-world': {'title': 'Hello, world!', 'desc': 'print("Hello, world!")', 'href': 'hello-world', 'img': 'helloworld.jpg'}
}

app = Flask('brightsharddev', template_folder='pages')
cors = CORS(app, resource={
	r'/static/*': {
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
    return render_template('home.html', projects=projects)


@app.route('/blog')
@app.route('/blog.<ending>')
def showBlog(ending=None):
	return render_template('blog.html', projects=projects, posts=posts)


@app.route('/<page>.<ending>')
@app.route('/<page>')
def showPage(page, ending=None):
    try:
        return render_template(f'{page}.html', projects=projects)
    except jinja2.exceptions.TemplateNotFound:
        return render_template('404.html')


@app.route('/projects/<project>')
@app.route('/projects/<project>.<ending>')
def showProject(project, ending=None):
    try:
        return render_template(f'projects/{project}.html', projects=projects, project=projects[project])
    except jinja2.exceptions.TemplateNotFound:
        return render_template('404.html')


@app.route('/blog/<post>')
@app.route('/blog/<post>.<ending>')
def showBlogPost(post, ending=None):
	try:
		return render_template(f'blog/{post}.html', projects=projects, post=posts[post])
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