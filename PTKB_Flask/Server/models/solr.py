__author__ = 'g42gregory'
import requests
from models.db import img_path

def results(query):
    url = 'http://localhost:8983/solr/collection1/select'
    headers = {'content-type': 'application/json'}
    payload = {
                "df": "content",
                "indent": "true",
                "q": query,
                "start": 0,
                "rows": 10,
                "hl.fl": "content",
                "wt": "json",
                "hl": "true",
                "hl.tag.pre": "<b>",
                "hl.tag.post": "</b>",
                "hl.snippets": 3
            }
    res = requests.get(url, params=payload, headers=headers).json()
    docs = res['response']['docs']
    highlighting = res['highlighting']
    items = []
    for doc in docs:
        id = doc['id']
        highlight = highlighting[id]['content']
        path = img_path(id)
        print id, path, highlight
        items.append({'doc': doc, 'highlight': highlight, 'imgPath': path})
        #print id, path, highlight
    return items