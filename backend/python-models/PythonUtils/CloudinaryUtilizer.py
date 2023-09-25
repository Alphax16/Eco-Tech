import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
import requests
import numpy as np
import cv2
from os import getenv
from librosa import load
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from io import BytesIO
# import tempfile


load_dotenv()

cloudinary.config(
    cloud_name = getenv('CLOUDNAME'),
    api_key = getenv('APIKEY'),
    api_secret = getenv('APISECRET')
)

def readImgFromURL(cloudinary_url):
    try:
        response = requests.get(cloudinary_url)
        
        if response.status_code == 200:
            image_data = np.frombuffer(response.content, np.uint8)
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
        _, encoded_image = cv2.imencode(".jpg", image)
        result = cloudinary.uploader.upload(encoded_image.tobytes(), format="jpg")
        
        return result['secure_url']
    except Exception as ex:
        print(f"Error uploading image to Cloudinary: {str(ex)}")
        return None

def uploadPlotToCloudinary(plot):
    try:
        image_buffer = BytesIO()
        plot.savefig(image_buffer, format='png')
        image_buffer.seek(0)

        image = cv2.imdecode(np.frombuffer(image_buffer.read(), np.uint8), 1)
        _, encoded_image = cv2.imencode('.png', image)

        result = cloudinary.uploader.upload(encoded_image.tobytes(), format="png")

        return result['secure_url']
    except Exception as ex:
        print(f"Error uploading plot to Cloudinary: {str(ex)}")
        return None

def uploadAudioData2Cloudinary(audio_data):
    try:
        result = cloudinary.uploader.upload_resource(audio_data, resource_type="auto")
        audio_url = result.get("secure_url")

        return audio_url
    except Exception as ex:
        print("Error uploading audio data to Cloudinary:", ex)
        return None

def readAudioFromURL(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            audio_data, sr = load(BytesIO(response.content), sr=None)
            return audio_data, sr
        else:
            print(f"Failed to fetch the audio from URL. Status code: {response.status_code}")
            return None, None
    except Exception as e:
        print(f"Error reading audio from URL: {str(e)}")
        return None, None

