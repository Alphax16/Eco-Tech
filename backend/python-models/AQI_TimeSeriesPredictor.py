import numpy as np
from keras.models import load_model
from keras.utils import disable_interactive_logging
from pickle import load
from datetime import datetime
from sys import argv
from os import environ
import warnings


def make_prediction_for_date(model, scaler, num_steps):
    input_date_str = argv[-1]           # Date in 'DD-MM-YYYY' format.
    
    try:
        input_date = datetime.strptime(input_date_str, "%d-%m-%Y")
        
        today = datetime.today()
        days_ago = (today - input_date).days
        
        if days_ago < num_steps:
            print("Not enough historical data available for prediction.")
        else:
            user_input = np.zeros((num_steps, 1))
            
            scaled_input = scaler.transform(user_input)
            
            scaled_input = scaled_input.reshape(1, num_steps, 1)
            
            prediction = model.predict(scaled_input)
            
            predicted_pm25 = scaler.inverse_transform(prediction)
            
            print(predicted_pm25[0][0])
    
    # except Exception as ex:
        # print("Invalid date format. Please enter the date in YYYY-MM-DD format.", ex)
    except ValueError:
        print("Invalid date format. Please enter the date in YYYY-MM-DD format.")

def main():
    # print("PM2.5 Prediction Tool")
    
    warnings.filterwarnings('ignore')
    
    disable_interactive_logging()
    environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
    

    model = load_model("./weights-pickles/AQI_Predictor.h5")

    with open("./weights-pickles/AQI_Time_Series_Data_Scaler.pkl", "rb") as scaler_file:
        scaler = load(scaler_file)

    num_steps = 60
    
    try:
        make_prediction_for_date(model, scaler, num_steps)
    except Exception as ex:
        print(f'An error occurred: {str(ex)}')

if __name__ == '__main__':
    main()
