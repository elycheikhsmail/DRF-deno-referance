import requests

url = 'http://127.0.0.1:8080/api/hello/'
headers = {'Authorization': 'Token 23347bc65dd3adffe1518f958a85e5bd5ae0b7f7'}
r = requests.get(url, headers=headers)
print(r.text())