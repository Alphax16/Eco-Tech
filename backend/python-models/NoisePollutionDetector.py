from PythonUtils.CloudinaryUtilizer import readAudioFromURL, uploadImage2Cloudinary, uploadPlotToCloudinary
import numpy as np
import librosa
import matplotlib.pyplot as plt
import cv2 as cv
from sys import argv
import tempfile


def load_audio(audio_url):
    """Load an audio file and return the audio data and sample rate."""
    # y, sr = librosa.load(audio_file)
    y, sr = readAudioFromURL(audio_url)
    return y, sr

def visualize_audio_waveform(audio_data, sr):
    """Visualize the audio waveform."""
    plt.figure(figsize=(10, 4))
    librosa.display.waveshow(audio_data, sr=sr)
    plt.xlabel('Time (s)')
    plt.ylabel('Amplitude')
    plt.title('Audio Waveform')
    # plt.show()
    return plt

def calculate_max_sound_level(audio_data):
    """Calculate the maximum sound level (in dB) from audio data."""
    db = librosa.amplitude_to_db(librosa.feature.rms(y=audio_data), ref=np.max)
    # print('DB:', db)
    return max(db[0])

def check_noise_level(area_type, daytime, max_db):
    """Check if the sound level exceeds the permissible limit for the given area and time."""
    limits = {
        'industrial_daytime': 75,
        'industrial_night': 70,
        'commercial_daytime': 65,
        'commercial_night': 55,
        'residential_daytime': 55,
        'residential_night': 45,
    }

    limit_key = f'{area_type}_daytime' if daytime else f'{area_type}_night'
    permissible_limit = limits.get(limit_key)

    if permissible_limit is None:
        return "Invalid area or time specified."

    exceedance = max_db - permissible_limit
    return exceedance, permissible_limit

def main():
    if len(argv) != 4:
        print("Usage: python script.py area_type daytime audio_url")
    else:
        try:
            area_type, daytime, audio_url = argv[1:]

            audio_data, sr = load_audio(audio_url)
            # print(f'AUDIO DATA: {audio_data}, SAMPLING RATE: {sr}')
            
            plt = visualize_audio_waveform(audio_data, sr)
            
            plt_url = uploadPlotToCloudinary(plt)
            
            plt.close()
            
            max_db = calculate_max_sound_level(audio_data)
            
            # print('MAX_DB:', max_db)
            
            exceedance, permissible_limit = check_noise_level(area_type.lower(), True if daytime.lower().endswith('AM') else False, max_db)

            if exceedance > 0:
                print(f"{exceedance:.2f}")
            else:
                print(f"{exceedance:0.00}")
        except Exception as ex:
            print('Python Exception:', ex)

if __name__ == '__main__':
    main()
