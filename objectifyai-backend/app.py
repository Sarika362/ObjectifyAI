from flask import Flask, Response, jsonify, request
import cv2
import numpy as np
import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"
import tensorflow as tf
tf.compat.v1.disable_eager_execution()

from tensorflow.keras.models import load_model
from tensorflow.keras.layers import Layer
import time

app = Flask(__name__)

# Load the trained model and class labels
MODEL_PATH = "source/model/object_recognition_model__final.keras"
CLASS_PATH = "./source/model/classes1.npy"
class Cast(Layer):
    def call(self, inputs):
        return inputs
    
model = load_model("object_recognition_model.h5", custom_objects={"Cast": Cast})

class_names = np.load(CLASS_PATH, allow_pickle=True)

detection_active = False

# Initialize video capture
cap = cv2.VideoCapture(0)

def detect_objects(frame):
    img = cv2.resize(frame, (128, 128))
    img = img.astype("float32") / 255.0
    img = np.expand_dims(img, axis=0)
    predictions = model.predict(img)[0]
    detected_objects = []
    
    for i, prob in enumerate(predictions):
        if prob > 0.5:
            detected_objects.append({"label": class_names[i], "confidence": float(prob)})
    
    return detected_objects

def generate_frames():
    global detection_active
    while detection_active:
        success, frame = cap.read()
        if not success:
            break
        
        detections = detect_objects(frame)
        for detection in detections:
            label = f"{detection['label']} ({detection['confidence']:.2f})"
            cv2.putText(frame, label, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        
        ret, buffer = cv2.imencode(".jpg", frame)
        frame = buffer.tobytes()
        yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n")

@app.route("/start_detection", methods=["POST"])
def start_detection():
    global detection_active
    detection_active = True
    return jsonify({"message": "Object detection started"})

@app.route("/stop_detection", methods=["POST"])
def stop_detection():
    global detection_active
    detection_active = False
    return jsonify({"message": "Object detection stopped", "detections": []})

@app.route("/video_feed")
def video_feed():
    return Response(generate_frames(), mimetype="multipart/x-mixed-replace; boundary=frame")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
