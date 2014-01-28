from __future__ import division
__author__ = 'g42gregory'
from pymongo import MongoClient
import matplotlib.pyplot as plt
import numpy as np
import math
client = MongoClient()
db = client.test

telemetries = db.telemetries
urls = db.urls
statAll = db.statAll
pageInfo = db.pageInfo

threshold = 500

def createStatAll():
    statAll.remove()
    ids = telemetries.distinct('urlID')
    for id in ids:
        count = telemetries.find({"urlID": id}).count()
        stat = { 'id': id, 'count': count }
        statAll.insert(stat)

createStatAll()

ids = telemetries.distinct('urlID')

X = []
Y = []
for id in ids:
    point = statAll.find_one({"id": id})
    X.append(point['id'])
    Y.append(point['count'])
    #print point['id'], point['count']

Z = zip(X, Y)

Z_small = [z for z in Z if z[1] > threshold]
Z_sorted = sorted(Z_small, key=lambda tup: tup[1], reverse=True)

print np.mean(np.array(Y))
print math.sqrt(np.var(np.array(Y)))

plt.scatter(X, Y)
plt.title("Web activity")
plt.xlabel("Page IDs")
plt.ylabel("Total moves/scrolls")
plt.xticks([w for w in range(len(X))], ['%i'%w for w in range(len(X))])
#plt.annotate("s", xytext=None, xycoords='data', textcoords=None)

for z in Z_sorted:
    label = urls.find_one({'id': z[0]})['url']
    print z[1], ': ', label
    plt.annotate(label, z)
plt.autoscale(tight=True)
plt.grid()
plt.show()

