import os
from flask import Flask
from flask import send_from_directory
from flask import render_template
from flask import request
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
#from models.solr import results as solr_results

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search/')
def search():
    query = request.args.get('q')
    items = solr_results(query)
    return render_template('search.html', items=items)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == '__main__':
    http_server = HTTPServer(WSGIContainer(app))
    http_server.listen(5000)
    IOLoop.instance().start()
    #app.debug = True
    #app.run()
