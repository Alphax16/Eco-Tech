import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import requests
import numpy as np
from io import BytesIO
import cv2
from os import getenv

# Load environment variables from .env
load_dotenv()

# Configure Cloudinary with your credentials
cloudinary.config(
    cloud_name = getenv('CLOUDNAME'),
    api_key = getenv('APIKEY'),
    api_secret = getenv('APISECRET')
)

def readImgFromURL(cloudinary_url):
    try:
        # Fetch the image from the Cloudinary URL
        response = requests.get(cloudinary_url)
        if response.status_code == 200:
            # Convert the image content to a NumPy array
            image_data = np.frombuffer(response.content, np.uint8)
            
            # Decode the image using OpenCV
            image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
            
            return image
        else:
            print(f"Failed to fetch the image from URL. Status code: {response.status_code}")
            return None
    except Exception as e:
        print(f"Error reading image from URL: {str(e)}")
        return None

def uploadImage2Cloudinary(image):
    try:
        # Encode the image as bytes
        _, encoded_image = cv2.imencode(".jpg", image)
        
        # Upload the encoded image to Cloudinary
        result = cloudinary.uploader.upload(encoded_image.tobytes(), format="jpg")
        return result['secure_url']
    except Exception as e:
        print(f"Error uploading image to Cloudinary: {str(e)}")
        return None

