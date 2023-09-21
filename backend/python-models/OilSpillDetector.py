# import cloudinary
# import cloudinary.uploader
# from dotenv import load_dotenv
import numpy as np
import cv2
from sys import argv
from os import getenv
from PythonUtils.CloudinaryUtilizer import readImgFromURL, uploadImage2Cloudinary


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


image = readImgFromURL(argv[-1])


# Define the lower and upper bounds of the color range you want to segment
# In this example, we'll segment the color blue
lower_blue = np.array([100, 0, 0])
upper_blue = np.array([255, 100, 100])

# Create a mask that selects pixels within the specified color range
mask = cv2.inRange(image, lower_blue, upper_blue)

# Apply the mask to the original image to extract the segmented region
segmented_image = cv2.bitwise_and(image, image, mask=mask)

# fig = plt.figure(figsize=(80, 40))

# # Display  the original image, mask, and segmented image
# fig.add_subplot(2, 2, 1)
# plt.imshow(image)
# fig.add_subplot(2, 2, 2)
# plt.imshow(mask)
# fig.add_subplot(2, 2, 3)
# plt.imshow(segmented_image)
# plt.savefig("/kaggle/working/SegmentationSteps.png")
# plt.show()

cloudinary_url = uploadImage2Cloudinary(segmented_image)

# Print the image URL
print(cloudinary_url)
