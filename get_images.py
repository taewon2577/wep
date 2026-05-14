import re
import json

with open('api.js', 'r', encoding='utf-8') as f:
    api_js = f.read()

with open('reviews.html', 'r', encoding='utf-8') as f:
    reviews = f.read()

urls = re.findall(r'\./assets/images/([^\'\"\s]+\.jpg)', api_js + reviews)
urls = sorted(list(set(urls)))
print(json.dumps(urls))
