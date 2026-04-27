import cv2
import time
from pathlib import Path
from datetime import datetime
from ultralytics import YOLO

import paho.mqtt.client as mqtt
import json
import uuid
import requests

# ── MQTT CONFIG ─────────────────────────────────────────────
MQTT_BROKER = "192.168.0.127"
MQTT_PORT = 1883
MQTT_USER = "csci437"
MQTT_PASS = "fall2024"
MQTT_TOPIC = "ML/people"

device_id = hex(uuid.getnode())
mqtt_connected = False

# ── SERVER CONFIG ───────────────────────────────────────────
SERVER_URL = "http://192.168.0.174:8225/upload"

# ── MQTT CALLBACKS ──────────────────────────────────────────
def on_connect(client, userdata, flags, rc):
    global mqtt_connected
    if rc == 0:
        print("✅ MQTT connected")
        mqtt_connected = True
    else:
        print(f"❌ MQTT failed: {rc}")

mqtt_client = mqtt.Client(client_id=device_id)
mqtt_client.username_pw_set(MQTT_USER, MQTT_PASS)
mqtt_client.on_connect = on_connect
mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
mqtt_client.loop_start()

# ── CONFIG ──────────────────────────────────────────────────
MODEL_PATH = "/home/user/Desktop/detector/best.pt"
VIDEO_SOURCE = "http://192.168.0.132:8081/"
CONFIDENCE = 0.37
CAPTURE_INTERVAL = 3

# ── COUNTER DRAW ────────────────────────────────────────────
def draw_counter(frame, count):
    text = f"People: {count}"
    cv2.rectangle(frame, (5, 5), (220, 50), (30, 30, 30), -1)
    cv2.putText(frame, text, (10, 35),
                cv2.FONT_HERSHEY_DUPLEX, 1,
                (255, 255, 255), 2)

# ── UPLOAD FUNCTION ─────────────────────────────────────────
def upload_snapshot(frame, count):
    _, img_encoded = cv2.imencode(".jpg", frame)

    files = {
        "image": ("snapshot.jpg", img_encoded.tobytes(), "image/jpeg")
    }

    data = {
        "people": count
    }

    try:
        response = requests.post(SERVER_URL, files=files, data=data, timeout=5)
        print("📤 Uploaded:", response.json())
    except Exception as e:
        print("❌ Upload failed:", e)

# ── MAIN LOOP ───────────────────────────────────────────────
def main():
    print("Loading YOLO model...")
    model = YOLO(MODEL_PATH)

    print("Opening video stream...")
    cap = cv2.VideoCapture(VIDEO_SOURCE)

    if not cap.isOpened():
        raise RuntimeError("Cannot open video source")

    last_capture = time.time() - CAPTURE_INTERVAL

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        now = time.time()

        if now - last_capture >= CAPTURE_INTERVAL:
            results = model(frame, conf=CONFIDENCE, classes=[0], verbose=False)

            annotated = results[0].plot()
            count = len(results[0].boxes)

            draw_counter(annotated, count)

            # ── MQTT SEND ─────────────────────────────
            mqtt_client.publish(MQTT_TOPIC, json.dumps({"people": count}))
            print("📡 MQTT:", count)

            # ── HTTP UPLOAD ───────────────────────────
            upload_snapshot(annotated, count)

            # ── SHOW ─────────────────────────────────
            #cv2.imshow("People Detector", annotated)

            last_capture = now

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

    cap.release()
    cv2.destroyAllWindows()

# ── RUN ────────────────────────────────────────────────────
if __name__ == "__main__":
    main()