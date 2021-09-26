from flask import Flask, render_template
import jinja2

app = Flask('BrightShard\'s Website')


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/<page>.<ending>')
@app.route('/<page>')
def showPage(page, *ending):
    try:
        return render_template(f'{page}.html')
    except jinja2.exceptions.TemplateNotFound:
        return render_template('404.html')


@app.route('/projects/<project>')
@app.route('/projects/<project>.<ending>')
def showProject(project, *ending):
    try:
        return render_template(f'projects/{project}.html')
    except jinja2.exceptions.TemplateNotFound:
        return render_template('404.html')


if __name__ == '__main__':
    app.run('0.0.0.0',80)