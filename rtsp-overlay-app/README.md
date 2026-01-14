# RTSP Livestream Overlay Web Application

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Backend-Flask-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Video.js](https://img.shields.io/badge/Streaming-Video.js-0051BB?logo=videojs&logoColor=white)](https://videojs.com/)

## 📄 Assignment Overview
Build a web application that plays a livestream video from an RTSP source and allows users to create, manage, and display custom overlays on top of the video in real time.

---

## ✅ Assignment Requirements Checklist

- [x] **Landing Page:** Displays livestream video with a clear Play option.
- [x] **RTSP Playback:** Supports user-provided RTSP URLs (via conversion).
- [x] **Basic Controls:** Play, Pause, and Volume controls via Video.js.
- [x] **Overlay Functionality:**
    - [x] Text overlays.
    - [x] Image/Logo overlays (via URL).
    - [x] Freely movable (drag-and-drop).
    - [x] Fully resizable.
    - [x] Real-time updates and visibility.
- [x] **CRUD APIs:** Full backend support for Create, Read, Update, and Delete operations.
- [x] **Technology Stack:** Python (Flask), MongoDB, React.

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18+)
- **Python** (v3.9+)
- **MongoDB** (Local instance or Atlas)
- **FFmpeg** (Recommended for RTSP conversion)

### 2. Backend Setup (Flask & MongoDB)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure `.env`:
   ```env
   MONGO_URI=mongodb://localhost:27017/rtsp_overlay_db
   PORT=5000
   ```
5. Run the server:
   ```bash
   python app.py
   ```

### 3. Frontend Setup (React & Vite)
1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
   Access the app at: `http://localhost:5173`

---

## 📹 Livestream Management

### How to Play RTSP Streams
Since web browsers cannot play RTSP directly, we use **FFmpeg** to convert the stream into **HLS (m3u8)** in real-time.

1. **RTSP Source:** Obtain your RTSP URL (e.g., from an IP camera or RTSP.me).
2. **Start Conversion:** Run this command in your terminal:
   ```bash
   ffmpeg -i "rtsp://YOUR_RTSP_URL" -codec:v copy -codec:a copy -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments frontend/public/stream.m3u8
   ```
3. **Load in App:** In the "RTSP Stream Master" top bar, enter: `http://localhost:5173/stream.m3u8` and click **Load Stream**.

---

## 🛠 CRUD API Documentation

**Base URL:** `http://localhost:5000/api`

### 1. Fetch All Overlays
- **Endpoint:** `/overlays`
- **Method:** `GET`
- **Response:** Array of overlay objects.

### 2. Create Overlay
- **Endpoint:** `/overlays`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "type": "text",
    "content": "Live Display",
    "position": {"x": 50, "y": 50},
    "size": {"width": 150, "height": 50}
  }
  ```

### 3. Update Overlay
- **Endpoint:** `/overlays/<overlay_id>`
- **Method:** `PUT`
- **Body:** `{ "position": {"x": 200, "y": 100} }`

### 4. Delete Overlay
- **Endpoint:** `/overlays/<overlay_id>`
- **Method:** `DELETE`

---

## 📖 User Guide

### 🎬 Livestream Playback
1. Paste your HLS/MP4 link in the top input.
2. Click **Load Stream**.
3. Use the Video.js controls (Play/Pause/Speaker) to manage playback.

### 🖼 Managing Overlays
1. **Add:** Use the "Add New Overlay" section below the video. Select "Text" or "Image URL".
2. **Move:** Click and drag any overlay on the video.
3. **Resize:** Drag the **blue handle** in the bottom-right corner of an overlay.
4. **Delete:** Click the red trash icon above an overlay.
5. **Auto-Save:** All movements and size changes are instantly persisted to the database.

---

## 📬 Submission Details

- **To:** rakesh@gonote.ai
- **CC:** safiya@gonote.ai, aman@gonote.ai
- **Deliverables:** GitHub Repo Link, Demo Video (Mandatory).

---

## 🛠 Troubleshooting
- **CORS Errors:** Ensure the Flask backend is running and `flask-cors` is configured (Default in `app.py`).
- **Video Not Loading:** Check if your HLS segments are being generated in the `frontend/public/` folder.
- **Resize Handle Missing:** Ensure `index.css` is loaded to see the custom-styled Draggable/Resizable handles.

---
*Created by [Your Name/GitHub Profile] for the GoNote.ai Assessment 2026*
