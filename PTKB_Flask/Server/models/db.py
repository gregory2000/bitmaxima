__author__ = 'g42gregory'
from pymongo import MongoClient

client = MongoClient()
db = client.ptkb

previews = db.previews

def img_path(id):
    doc = previews.find_one({"url": id})
    if doc == None:
        return "#"
    else:
        return doc['imgPath']


