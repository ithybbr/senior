import requests
import time
import random
import os
import subprocess
CAMERA_URL = "http://192.168.0.132:8081/"
SAVE_FOLDER = "snapshots"

os.makedirs(SAVE_FOLDER, exist_ok=True)

counter = 0

while True:
    delay = random.randint(15, 20)
    command = [
        "ffmpeg",
        "-y",
        "-i", CAMERA_URL,
        "-frames:v", "1",
        f"{SAVE_FOLDER}/img_{int(time.time())}_{counter}.jpg"
    ]
    print("Waiting", delay, "seconds...")
    time.sleep(delay)
    print("1s")
    try:
        subprocess.run(command)
        print("Saved")
        counter += 1
    except Exception as e:
        print("Error:", e)
