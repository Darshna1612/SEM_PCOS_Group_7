import pickle
import sys
import pandas as pd
import json
import lightgbm as lgb

file_name = './pcos_model.txt'
# /venv/bin/python method.py '{"hello": [[1,2,3,4]]}'
if __name__ == '__main__':
    data = sys.argv[1] # Input a list
    data = json.loads(data)
    data = data['input']

    xgb_model_loaded = pickle.load(open(file_name, "rb"))
    test_data = pd.DataFrame(data)
    test_data.columns = ['BMI', 'Weight gain(Y/N)', 'Cycle length(days)', ' Age (yrs)']
    ret = xgb_model_loaded.predict_proba(test_data)
    print(ret)


