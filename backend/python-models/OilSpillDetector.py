import numpy as np
import cv2
from sys import argv
from PythonUtils.CloudinaryUtilizer import readImgFromURL, uploadImage2Cloudinary


def main():
    image = readImgFromURL(argv[-1])

    lower_oil_spill = np.array([0, 0, 0])
    upper_oil_spill = np.array([100, 100, 100])

    oil_spill_mask = cv2.inRange(image, lower_oil_spill, upper_oil_spill)

    contours, _ = cv2.findContours(oil_spill_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    oil_spill_bounded = image.copy()
    cv2.drawContours(oil_spill_bounded, contours, -1, (0, 255, 255), 3)

    oil_spill_heatmap = np.zeros_like(image)
    for contour in contours:
        cv2.drawContours(oil_spill_heatmap, [contour], -1, (128, 0, 128), -1)

    oil_spill_highlighted = cv2.addWeighted(image, 1, oil_spill_heatmap, 0.5, 0)

    cloudinary_url = uploadImage2Cloudinary(oil_spill_highlighted)

    print(cloudinary_url)

if __name__ == '__main__':
    main()
