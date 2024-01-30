import pandas as pd
import numpy as np
import re
import pyperclip
import ast

original_file_path = '/content/timetabl.xlsx' #change path locally
original_df = pd.read_excel(original_file_path, header=0)
    
def clean_dataframe(df):
    df = df.replace('\n', '', regex=True)
    df.columns = df.columns.str.replace('\n', '', regex=True)
    df.columns = df.columns.str.replace(' ', '', regex=True)
    return df

original_df = clean_dataframe(original_df)
print(original_df.columns)
print("\n")

# values_to_drop = ['', ' ', np.NaN]

# original_df = original_df[~original_df['ROOM'].isin(values_to_drop)]

# print("\nDataFrame after dropping specific values in 'ROOM' column:")
# print(original_df)

# original_df['DAYS/H'] = original_df['DAYS/H'].str.replace(r'\bTH\b', 'B', regex=True)
# print(original_df['DAYS/H'])

# original_df['DAYS/H'] = original_df['DAYS/H'].apply(lambda x: [(item) for item in x.split()])
# print(original_df['DAYS/H'])

#map the elements
day_mapping = {'M': 'Monday', 'T': 'Tuesday', 'W': 'Wednesday', 'B': 'Thursday', 'F': 'Friday', 'S': 'Saturday'}    
time_mapping = {str(i): f"{i+7}:00" for i in range(1, 25)}

arr1 = []  # Initialize an empty list to store result lists

for item in original_df['DAYS/H']:
    arr = []  # Initialize an empty list to store tuples
    i = 0

    """
    input = M W 5 Th 7
    d = split into ["M W 5", "Th 7"]
    for every string in d:
        input = "M W 5"
        days, slot
        slot = r"(\d+\s*)+"
    """
    
    while i < len(item):
        current_char = item[i]

        if re.match(r'[MTWBFS]', current_char):
            num = 0
            while i < len(item) and re.match(r'[MTWBFS]', item[i]):
                # arr.append(item[i], 0)
                i += 1
            print(current_char)

            if i < len(item) and re.match(r'\d', item[i]):
                while i < len(item) and re.match(r'\d', item[i]):
                    num = num * 1000 + int(item[i])
                    i += 1

                for k in range(len(arr)):
                    if arr[k][1] == 0:
                        arr[k] = (arr[k][0], num)
                num = 0  # Reset num after handling the consecutive digits

        i += 1

    arr1.append(arr)

# print(arr1[21])
# original_df['NEW COL'] = arr1
# print(original_df['NEW COL'])
# print(original_df)
# original_df.to_clipboard(index=False, excel=True)
original_df['DAYS/H'] = original_df['DAYS/H'].apply(ast.literal_eval)
for row in original_df['DAYS/H']:
  splitted_col = row
  converted_col = []

  # time_mapping = {}
  for item in (splitted_col):
    # times = []
    try: 
      item = int(item)
    except ValueError:
      item = item
      # times = []

    converted_col.append(item)
  # print(converted_col)
  row = converted_col
def convert_to_int(lst):
  res = []
  for item in lst:
    try:
      item = int(item)
    except ValueError:
      item = item
    res.append(item)
  return res

original_df['DAYS/H'] = original_df['DAYS/H'].apply(convert_to_int)
def convert_to_pairs(lst):
  i=0
  n = len(lst)
  time_mapping = {}

  for i in range(0,n):
    if isinstance(lst[i],int):
      continue
    else:
      j = i
      while(j<n and isinstance(lst[j],str)):
        j=j+1
      while(j<n and isinstance(lst[j],int)):
        if lst[i] not in time_mapping.keys():
          time_mapping[lst[i]] = []
        
        time_mapping[lst[i]].append(lst[j])
        j=j+1
  res = []
  for day in time_mapping.keys():
    times = time_mapping[day]
    for time in times:
      s = "{} {}".format(day,str(time))
      #s=day +" "+ str(time)
      res.append(s)
  return res

original_df['DAY_TIME_PAIR'] = original_df['DAYS/H'].apply(convert_to_pairs)
new_df= original_df.explode('DAY_TIME_PAIR')
new_file_path = '/content/output.xlsx'
new_df.to_excel(new_file_path,index=False)
x = pd.DataFrame(new_df['ROOM'].drop_duplicates())
x['key'] = 1

y = pd.DataFrame({'DAY':['M','T','W','B','F','S']})
y['key'] = 1

z = pd.DataFrame({'TIME':range(1,13)})
z['key'] = 1
res = pd.merge(x,y,how='left',on='key')
res = pd.merge(res,z,how='left',on='key')
res = res.drop(columns=['key'])
res['TIME'] = res['TIME'].astype(str)
res['DAY_TIME_PAIR'] = res['DAY']+' ' + res['TIME']
merged_pairs = pd.merge(res,occupied_df,how='left',on=['ROOM','DAY_TIME_PAIR'])
merged_pairs['FLAG']=merged_pairs['FLAG'].replace(np.nan,0)
merged_file_path = '/content/outputdf.xlsx'
merged_pairs.to_excel(merged_file_path,index=False)