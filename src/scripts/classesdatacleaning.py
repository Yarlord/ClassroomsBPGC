import pandas as pd
import numpy as np
import re
import pyperclip

original_file_path = 'C:/Users/HP/Desktop/Projects/classes/src/scripts/timetabl.xlsx'

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
print(original_df['DAYS/H'])

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

print(arr1[21])
original_df['NEW COL'] = arr1
print(original_df['NEW COL'])
print(original_df.iloc[31])
original_df.to_clipboard(index=False, excel=True)
