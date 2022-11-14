import openpyxl #allows us to read excel files
import matplotlib
matplotlib.use('TkAgg')
import pandas as pd #perhaps the most powerful and easy-to-understand data organization and visusalisation library in python. We'll be using it frequently from here on
import matplotlib.pyplot as plt #for plotting simple graphs
import seaborn as sns #another plotting library
import sklearn
from sklearn.preprocessing import PowerTransformer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score
from sklearn.metrics import mean_squared_error
from sklearn.tree import DecisionTreeRegressor
import math
from sklearn.svm import SVC
from sklearn.metrics import confusion_matrix
from sklearn.metrics import plot_confusion_matrix
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score
from sklearn.metrics import roc_auc_score
from sklearn.metrics import roc_curve
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.preprocessing import MinMaxScaler
from imblearn.over_sampling import RandomOverSampler
import pickle

# loads the data and creates a table(formally called a pandas DataFrame)
data = pd.read_excel('./input/PCOS_data_without_infertility.xlsx', sheet_name=1)
# let us load the infertility table too
data_inf = pd.read_csv('./input/PCOS_infertility.csv')
data['Patient File No.'] = data['Patient File No.'].apply(lambda x:  x+10000).astype('int64')
data = pd.merge(data,
                data_inf[['Patient File No.', '  I   beta-HCG(mIU/mL)', 'II    beta-HCG(mIU/mL)']],
                on='Patient File No.',
                how='left')
pd.isnull(data).sum()
del data['Unnamed: 44']
data['Marraige Status (Yrs)'].fillna(0, inplace=True)
data['Fast food (Y/N)'].fillna(0, inplace=True)

data = data[['PCOS (Y/N)', 'BMI','Weight gain(Y/N)','Cycle length(days)',' Age (yrs)']]

X=data.drop(["PCOS (Y/N)"],axis = 1)
y=data["PCOS (Y/N)"]

oversample = RandomOverSampler(sampling_strategy=0.7)
X, y = oversample.fit_resample(X, y)

sscaler = MinMaxScaler() #helps us scale the dataset. This makes it easy for the model to train
cols = X.columns
x_scaled = sscaler.fit_transform(X)
# print(x_scaled)
X_scaled = pd.DataFrame(x_scaled, columns=cols) # Maybe we should modify it in the future
# print(X, x_scaled)

X_scaled_values = X_scaled.to_numpy() #convert the DataFrame to a numpy array
# X_train,X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2) #creating a training split. We divide the data in a train and a test set respectively
X_train,X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

rfc = RandomForestClassifier(n_jobs=-1, n_estimators=150, max_features='sqrt', min_samples_leaf=10) #creates a Random forest model
rfc.fit(X_train, y_train) #trains model on data
pred_rfc = rfc.predict(X_test) #prediction
accuracy = accuracy_score(y_test, pred_rfc)
# print(accuracy)
classi_report = classification_report(y_test, pred_rfc)
# print(classi_report)


import xgboost as xgb

xgb_cl = xgb.XGBClassifier(learning_rate = 0.001, gamma = 0.03, max_depth = 20, subsample = 0.5 )
xgb_cl.fit(X_train, y_train)

# Predict
preds = xgb_cl.predict(X_test)

# Score
accuracy_score(y_test, preds)


file_name = 'test.pkl'
pickle.dump(xgb_cl, open(file_name, "wb"))
xgb_model_loaded = pickle.load(open(file_name, "rb"))
xgb_model_loaded.predict(X_test)

print(X_test)
print(preds)

test_data = [[28.3, 1, 2, 33]]
test_data = pd.DataFrame(test_data, columns=cols)
ret = xgb_model_loaded.predict_proba(test_data)
print(ret)