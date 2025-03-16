from flask import Flask, Response, request, jsonify
import cv2
import numpy as np
import torch
from flask_cors import CORS
import time
from collections import defaultdict

app = Flask(__name__)
CORS(app)

# Load your custom YOLO model (Replace 'yolov5s.pt' with your own model if needed)
yolo_model = torch.hub.load('ultralytics/yolov5', 'custom', path='yolov5s.pt', force_reload=True)

# Initialize detection variables
video_capture = cv2.VideoCapture(0)  # Open webcam
is_detecting = False
object_counts = defaultdict(int)
detections = []

# 🟢 Start Detection Route
@app.route('/start_detection', methods=['POST'])
def start_detection():
    global is_detecting, detections, object_counts
    is_detecting = True
    detections = []
    object_counts.clear()
    return jsonify({"message": "Detection started"})


# 🔴 Stop Detection Route
@app.route('/stop_detection', methods=['POST'])
def stop_detection():
    global is_detecting
    is_detecting = False

    print("Detections:", detections)
    print("Object Count:", object_counts)

    return jsonify({
        "message": "Detection stopped",
        "detections": detections if detections else [],
        "object_count": dict(object_counts) if object_counts else {},  # Ensure dictionary is sent
        "fps": 0,
        "total_detections": sum(object_counts.values()) if object_counts else 0,  # Sum of all detections
    })


# 🎥 Video Streaming Generator
def generate_frames():
    global detections, object_counts, is_detecting

    while True:
        success, frame = video_capture.read()
        if not success:
            break

        start_time = time.time()

        if is_detecting:
            results = yolo_model(frame)

            detections = []  # Reset detections each frame
            object_counts.clear()

            for *box, conf, cls in results.xyxy[0].tolist():
                label = yolo_model.names[int(cls)]
                object_counts[label] += 1
                detections.append({
                    'label': label,
                    'confidence': conf,
                    'box': box
                })

                x1, y1, x2, y2 = map(int, box)
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(frame, f"{label}: {conf:.2f}", (x1, y1 - 10),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

            fps = 1 / (time.time() - start_time)

        # Always store the last valid detections, even if detection is stopped
        last_detections = detections.copy()
        last_object_counts = dict(object_counts)

        _, buffer = cv2.imencode('.jpg', frame)
        frame_bytes = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
# Send last valid detections, even if detection is stopped

# 🎥 Video Feed Route
@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(debug=True)