import numpy as np
import tensorflow as tf
from keras.models import load_model
import cv2
from PythonUtils.CloudinaryUtilizer import readImgFromURL
from sys import argv
from os import environ
import warnings


def preProcessImageFromURL(cloudinary_url):
    img = readImgFromURL(cloudinary_url)
    if img is not None:
        img_array = cv2.resize(img, (224, 224))
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0
        return img_array
    else:
        return None

def predict_no_fire_from_url(cloudinary_url, threshold=0.1):
    img_array = preProcessImageFromURL(cloudinary_url)
    if img_array is not None:
        autoencoder = load_model("./weights-pickles/ConflagrationClassifier.h5")
        reconstructed_img = autoencoder.predict(img_array)

        mse = np.mean(np.square(img_array - reconstructed_img))

        has_fire = mse < threshold

        return not has_fire
    else:
        return False

def main():
    warnings.filterwarnings('ignore', category=FutureWarning)
    
    tf.keras.utils.disable_interactive_logging()
    tf.get_logger().setLevel('INFO')
    environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
    
    cloudinary_url = argv[-1]
    result = predict_no_fire_from_url(cloudinary_url)

    if result:
        print("No Fire detected.")
    else:
        print("Fire Alert!")

if __name__ == '__main__':
    main()
