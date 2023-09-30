# import cloudinary
# import cloudinary.uploader
# from dotenv import load_dotenv
import numpy as np
import cv2
from sys import argv
from os import getenv, environ
from keras.models import load_model
from keras.utils import disable_interactive_logging
from PythonUtils.CloudinaryUtilizer import readImgFromURL
import warnings


# # Load environment variables from .env
# load_dotenv()

# # Configure Cloudinary with your credentials
# cloudinary.config(
#     cloud_name = getenv('CLOUDNAME'),
#     api_key = getenv('APIKEY'),
#     api_secret = getenv('APISECRET')
# )

# Upload an image to Cloudinary
# result = cloudinary.uploader.upload("path_to_your_image.jpg", folder="Outputs/Oil_Spill_Detector")

# # Extract the URL of the uploaded image
# image_url = result['secure_url']




def main():
    warnings.filterwarnings('ignore')
    
    disable_interactive_logging()
    environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
    
    model = load_model("./weights-pickles/ConflagrationClassifier.h5")
    image = readImgFromURL(argv[-1])
    # print('Image:', image)
    # print('Image Shape:', image.shape)
    img_resize = cv2.resize(image, (224, 224))
    # print('Image Resize:', img_resize)
    result = model.predict(np.array(img_resize))
    # print('Result:', result)
    print(result)

if __name__ == '__main__':
    main()
