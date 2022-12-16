from flask import Flask, send_file, render_template
from flask_cors import CORS
import jinja2
from data import babelURL, projects, posts

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
hiddenHID = {
	'Windows': 'hiddenhid.exe',
	'macOS': 'Finder',
	'MacOS': 'Finder',
	'Linux': 'Finder',
}

# Shortcut for redirects
def redirect(url: str):
	return f'<html><head><script>window.location = "{url}"</script></head></html>'

# Shortcut for showing 404
def notFound():
	return render_template('404.html')


# Serve the home page at the website root
@app.route('/')
def home():
    return render_template('home.html', projects=projects)


# Normal pages
@app.route('/<page>')
@app.route('/<page>.<ending>')
def showPage(page, ending=None):
    try:
        return render_template(f'{page}.html', projects=projects)
    except jinja2.exceptions.TemplateNotFound:
        return notFound()


# Projects
@app.route('/projects/<project>')
@app.route('/projects/<project>.<ending>')
def showProject(project, ending=None):
    try:
        return render_template(f'projects/{project}.html', projects=projects, project=projects[project])
    except jinja2.exceptions.TemplateNotFound:
        return notFound()
    except KeyError:
        return notFound()


# Project subpages
@app.route('/projects/<project>.<subpage>')
@app.route('/projects/<project>.<subpage>.<ending>')
def showSubPage(project, subpage, ending=None):
    try:
        return render_template(f'projects/{project}.{subpage}.html', projects=projects, project=projects[project])
    except jinja2.exceptions.TemplateNotFound:
        return notFound()


# Blog home
@app.route('/blog')
@app.route('/blog.<ending>')
def showBlog(ending=None):
	return render_template('blog.html', projects=projects, posts=posts)


# Blog
@app.route('/blog/<post>')
@app.route('/blog/<post>.<ending>')
def showBlogPost(post, ending=None):
	try:
		return render_template(f'blog/{post}.html', projects=projects, post=posts[post])
	except jinja2.exceptions.TemplateNotFound:
		return notFound()


# For downloading stuff
@app.route('/download/<file>')
@app.route('/downloads/<file>')
def downloadFile(file):
    try:
        return send_file(f'files/{file}', as_attachment=True)
    except FileNotFoundError:
        return notFound()


# Shortened BrightBot invite (whenever I fix it)
@app.route('/brightbot')
def brightbotInvite():
	return redirect('https://discord.com/api/oauth2/authorize?client_id=961383253598683167&permissions=8&scope=bot%20applications.commands')


# Shortened HiddenHID download URLs
@app.route('/hiddenhid/<os>')
def redirectHiddenHID(os: str = 'Windows'):
	return redirect(f'https://github.com/Bright-Shard/HiddenHID/releases/download/latest/{hiddenHID[os]}')


# URL shortener & Trick Troller
@app.route('/redirect/<type>')
def ricktroll(type: str='youtube'):
	if type == 'youtube':
		return redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
	elif type == 'babel':
		return redirect(babelURL)


if __name__ == '__main__':
    app.run('0.0.0.0', 80)