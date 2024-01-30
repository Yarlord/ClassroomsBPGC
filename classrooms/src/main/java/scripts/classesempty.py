import pandas as pd
import json

original_file_path = 'C:/Users/HP/Desktop/Projects/classes/src/scripts/outputdf.xlsx'

merged_pairs = pd.read_excel(original_file_path, header=0)

res = merged_pairs[merged_pairs['DAY_TIME_PAIR']=='M 8']['ROOM']

output = []
for item in res:
  output.append(item)

empty_classes = json.dumps(output, indent = 2)
# print(empty_classes)

file_path = 'C:/Users/HP/Desktop/Projects/classes/src/scripts/output.json'

with open(file_path, 'w') as json_file:
  json_file.write(empty_classes)


