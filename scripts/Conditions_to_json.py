import requests
import json

r = requests.get(url = 'https://api.open5e.com/conditions')
data = r.json()
data_string = json.dumps(data)

WriteFile = open('conditions.json', 'w')
WriteFile.write(data_string)
WriteFile.close()
