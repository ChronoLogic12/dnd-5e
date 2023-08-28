import requests
import json

r = requests.get(url = 'https://api.open5e.com/monsters/?limit=10000')
data = r.json()
data_string = json.dumps(data)

WriteFile = open('monsters.json', 'w')
WriteFile.write(data_string)
WriteFile.close()
