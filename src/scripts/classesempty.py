import pandas as pd
import json

original_file_path = 'C:/Users/HP/Desktop/Projects/classes/src/scripts/outputdf.xlsx'

merged_pairs = pd.read_excel(original_file_path, header=0)

# res = merged_pairs[merged_pairs['DAY_TIME_PAIR']]['ROOM']
# print(merged_pairs)

# Group by 'DAY_TIME_PAIR' and aggregate 'ROOM' values into a list
result = merged_pairs.groupby('DAY_TIME_PAIR')['ROOM'].agg(list).reset_index()

# Convert the result to a list of lists
result_list = result.values.tolist()

# print(result_list)


empty_classes = json.dumps(result_list, indent = 2)
# print(empty_classes)

file_path = 'C:/Users/HP/Desktop/Projects/classes/src/scripts/output.json'

with open(file_path, 'w') as json_file:
  json_file.write(empty_classes)


