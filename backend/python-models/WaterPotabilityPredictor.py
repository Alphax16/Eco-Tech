from pickle import load
import numpy as np
from sys import argv
import warnings
import os


def main():
    warnings.filterwarnings('ignore')

    # curr_dir = os.getcwd()
    # dirs = os.listdir(curr_dir)
    # dirs_string = ', '.join(dirs)
    # print(dirs_string)

    try:
        with open("./weights-pickles/WaterPotability_RF.pkl", 'rb') as fpk:
            model = load(fpk)
            ph, Hardness, Solids, Chloramines, Sulfate, Conductivity, Organic_carbon, Trihalomethanes, Turbidity = argv[1:]

        X = np.array([[ph, Hardness, Solids, Chloramines, Sulfate, Conductivity, Organic_carbon, Trihalomethanes, Turbidity]])

        try:
            X_pred = ['potable', 'not potable'][model.predict(X)[0]]
            print(X_pred)
        except Exception as ex:
            print(ex)
    except Exception as ex:
        curr_dir = os.getcwd()
        dirs = os.listdir(curr_dir)
        dirs_string = ', '.join(dirs)
        print(f'Exception: {ex} ================= Dir. List: ', dirs_string)

    # print(model)

    # ph = 7.5
    # Hardness = 145
    # Solids = 19909
    # Chloramines = 7
    # Sulfate = 350
    # Conductivity = 500
    # Organic_carbon = 14
    # Trihalomethanes = 50
    # Turbidity = 4


    # ph, Hardness, Solids, Chloramines, Sulfate, Conductivity, Organic_carbon, Trihalomethanes, Turbidity = argv[1:]

    # X = np.array([[ph, Hardness, Solids, Chloramines, Sulfate, Conductivity, Organic_carbon, Trihalomethanes, Turbidity]])

    # try:
    #     X_pred = ['potable', 'not potable'][model.predict(X)[0]]
    #     print(X_pred)
    # except Exception as ex:
    #     print(ex)

if __name__ == '__main__':
    main()
