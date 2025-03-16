# 🎯 Real-Time Object Recognition System - ObjectifyAI

## 🌟 Overview

ObjectifyAI is a real-time object detection web application built with React.js and TensorFlow.js, powered by the COCO-SSD model. It enables users to detect objects in real-time and provides a statistical analysis of the detected objects.

## 📁 Project Structure

```
objectify-ai/
│
├── backend/
│   ├── colab/
│   │   └── objectify_model_training/
│   ├── source/
│   │   ├── model/
│   │   │   ├── classes.npy
│   │   │   └── object_recognition_model__final.keras
│   ├── app.py (Flask Backend)
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   │   ├── Navbar.js
│   │   │   │   └── Navbar.css
│   │   │   ├── Hero/
│   │   │   │   ├── Hero.js
│   │   │   │   └── Hero.css
│   │   │   ├── Features/
│   │   │   │   ├── Features.js
│   │   │   │   └── Features.css
│   │   │   ├── ObjectDetector/
│   │   │   │   ├── ObjectDetector.js
│   │   │   │   └── ObjectDetector.css
│   │   │   ├── Analysis/
│   │   │   │   ├── Analysis.js
│   │   │   │   └── Analysis.css
│   │   │   ├── Chart/
│   │   │   │   ├── Chart.js
│   │   │   │   └── Chart.css
│   │   ├── App.js
│   │   └──index.js
│
├── app.py (Flask Backend)
├── requirements.txt
├── yolov5s.pt
├── yolov5s.pt
└── README.md
```

## 🚀 Features

- Real-time object detection with TensorFlow.js and COCO-SSD
- User-friendly interface
- Live confidence scores
- Privacy-focused (local processing)
- Statistical analysis with dynamic charts

## 🛠️ Technologies Used

- React.js (Frontend)
- TensorFlow.js (AI Model Integration)
- Flask (Backend API for handling advanced model inference)
- Chart.js (Data visualization)
- Bootstrap (UI Styling)

## 🎯 Model Training (Flask Backend)

### Model Architecture and Training Pipeline

1. **Dataset**: COCO 2017 Dataset
2. **Model Used**: MobileNetV2-based Custom Model
3. **Training Environment**: Google Colab with TensorFlow and Keras
4. **Training Strategy**:
   - Data Augmentation
   - Transfer Learning
   - Multi-label Classification with Binary Cross-Entropy Loss
   - Regularization and Dropout for Overfitting Control

### Training Code Snippet

```python
import tensorflow as tf
import numpy as np
import tensorflow_datasets as tfds
from tensorflow.keras import layers, models, regularizers
from tensorflow.keras.layers import Input
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ReduceLROnPlateau, ModelCheckpoint

# Load the COCO dataset
datasets, info = tfds.load('coco/2017', with_info=True, split=['train[:10%]', 'validation[:10%]'])
train_data, val_data = datasets

# Preprocessing and training pipeline
# (Refer to the complete code in the `colab/objectify_model_training` folder)
```

### Flask Backend (`app.py`):

- Handles image input from the React frontend.
- Runs inference using the custom-trained MobileNetV2 model.
- Returns the detection results in JSON format.

## 📂 Public Folder

Contains static assets such as the `index.html` file, favicon, `manifest.json`, and `robots.txt`, essential for React.js rendering and SEO optimization.

## 📈 Chart Component

- Bar chart for object statistics.
- Real-time FPS and total detection count.

## 🛤️ Installation Guide

1. Clone the repository

```bash
git clone https://github.com/your-repo/objectify-ai.git
```

2. Install dependencies

```bash
cd frontend
npm install
```

3. Run Flask backend

```bash
cd backend
python app.py
```

4. Start React frontend

```bash
cd frontend
npm start
```


## 💻 Contributors

- [Sarika M N](https://github.com/Sarika362)

## 🌱 Future Enhancements

- Support for multiple object detection models
- Enhanced UI/UX with additional features
- Integration with cloud storage

---

