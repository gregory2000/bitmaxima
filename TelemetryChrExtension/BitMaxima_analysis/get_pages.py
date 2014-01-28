from __future__ import division
__author__ = 'g42gregory'
from pymongo import MongoClient
import matplotlib.pyplot as plt
import numpy as np
import time
import urllib2
client = MongoClient()
db = client.test

telemetries = db.telemetries
urls = db.urls
statAll = db.statAll
pageHTML = db.pageHTML

pageHTML.remove()
ids = urls.distinct('id')
for id in ids:
    url = urls.find_one({'id': id})['url']
    res = urllib2.urlopen(url)
    html = res.read()
    page = {'id': id, 'html': html}
    pageHTML.insert(page)
    print html
    print url
    time.sleep(5.0)