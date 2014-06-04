__author__ = 'g42gregory'
import pickle
import time

pkl_file = open('data.pkl', 'rb')

r = pickle.load(pkl_file)

result = r.json()
print result

#result = json.dumps(json.loads(r.text), sort_keys=False, indent=4)
ids = result['ids']
next_cursor = result['next_cursor']

thefile = open('ids.txt', 'ab')

for i in range(0, 5):
    print "Loop number: " + str(i)
    for id in ids:
        thefile.write("%s\n" % id)
    time.sleep(5)

thefile.close()
pkl_file.close()