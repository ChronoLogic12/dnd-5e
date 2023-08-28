import requests
import json

r = requests.get(url = 'https://api.open5e.com/spells/?ordering=level_int&limit=1000')
data = r.json()
data_string = json.dumps(data)

WriteFile = open('spells_from_api.json', 'w')
WriteFile.write(data_string)
WriteFile.close()
