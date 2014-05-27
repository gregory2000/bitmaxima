from __future__ import print_function

__author__ = 'g42gregory'

from alchemyapi import AlchemyAPI
import json

demo_text = 'Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one.'
demo_url = 'http://www.npr.org/2013/11/26/247336038/dont-stuff-the-turkey-and-other-tips-from-americas-test-kitchen'
demo_html = '<html><head><title>Python Demo | AlchemyAPI</title></head><body><h1>Did you know that AlchemyAPI works on HTML?</h1><p>Well, you do now.</p></body></html>'
demo_text2 = 'There are slow and repetitive parts, but it has just enough spice to keep it interesting.'
demo_text3 = 'What is this crap?'
demo_text4 = 'Those who find ugly meanings in beautiful things are corrupt without being charming.'
demo_text5 = "This movie doesn't care about cleverness, wit or any other kind of intelligent humor."
demo_text6 = "This is absolutely awesome! We think that the sentiment was negative in that sentence. Everytime I hear them, I have to dance with joy. I studied at Stanford. This movie doesn't care about cleverness, wit or any other kind of intelligent humor. Those who find ugly meanings in beautiful things are corrupt without being charming. There are slow and repetitive parts, but it has just enough spice to keep it interesting. What is this crap? What is this? This company is awesome! I love this Company! Yesterday dumb Bob destroyed my fancy iPhone in beautiful Denver, Colorado. I guess I will have to head over to the Apple Store and buy a new one."

alchemyapi = AlchemyAPI()

print('')
print('')
print('')
print('############################################')
print('#   Sentiment Analysis Example             #')
print('############################################')
print('')
print('')

print('Processing text: ', demo_text6)
print('')

response = alchemyapi.sentiment('text', demo_text6)

if response['status'] == 'OK':
    print('## Response Object ##')
    print(json.dumps(response, indent=4))

    print('')
    print('## Document Sentiment ##')
    print('type: ', response['docSentiment']['type'])

    if 'score' in response['docSentiment']:
        print('score: ', response['docSentiment']['score'])
else:
    print('Error in sentiment analysis call: ', response['statusInfo'])



