__author__ = 'g42gregory'
import time
from selenium import webdriver

driver = webdriver.Safari() # or add to your PATH
driver.set_window_size(1024, 768) # optional

print 'got here'
start = time.time()

driver.get('http://stackoverflow.com/questions/13287490/is-there-a-way-to-use-phantomjs-in-python')
driver.save_screenshot('/Users/g42gregory/screenshots/stack_safari.jpeg') # save a screenshot to disk
end = time.time()

#driver.get_screenshot_as_file('/Users/g42gregory/screenshots/yahoo2_safari.jpeg') # save a screenshot to disk
driver.quit()
print end - start


#browser = webdriver.Firefox()
#browser.get('http://www.yahoo.com/')
#browser.save_screenshot('/Users/g42gregory/screenshots/yahoo.png')
#browser.get('http://www.google.com/')
#browser.save_screenshot('/Users/g42gregory/screenshots/google.png')

#browser.quit()