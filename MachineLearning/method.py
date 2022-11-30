import pickle
import sys
import pandas as pd
import json

file_name = './test.pkl'
# /venv/bin/python method.py '{"hello": [[1,2,3,4]]}'
if __name__ == '__main__':
    data = sys.argv[1] # Input a list
    data = json.loads(data)
    data = data['input']

    xgb_model_loaded = pickle.load(open(file_name, "rb"))
    test_data = pd.DataFrame(data)
    test_data.columns = ['BMI', 'Weight gain(Y/N)', 'Cycle length(days)', 'Weight (Kg)']
    ret = xgb_model_loaded.predict_proba(test_data)
    print(ret)

# ../MachineLearning/venv/bin/python ../MachineLearning/method.py '{"input": [[24.6, 1, 5, 43]]}'

