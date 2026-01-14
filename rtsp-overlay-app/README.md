# RTSP Livestream Overlay Web Application

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Backend-Flask-000000?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Video.js](https://img.shields.io/badge/Streaming-Video.js-0051BB?logo=videojs&logoColor=white)](https://videojs.com/)


## Project Structure
The project is divided into two main components:
- **Backend:** Flask application serving a RESTful API and connecting to MongoDB.
- **Frontend:** React application with a modern UI, Video.js integration, and interactive overlay management.

```text
rtsp-overlay-app/
├── backend/
│   ├── app.py             # Main Flask server
│   ├── requirements.txt   # Python dependencies
│   └── .env               # Environment variables
└── frontend/
    ├── src/
    │   ├── components/    # Reusable UI components (VideoPlayer, Overlay)
    │   ├── App.jsx        # Main application logic
    │   ├── main.jsx       # Entry point with React 19 shim
    │   └── index.css      # Custom styling & glassmorphism
    ├── public/            # Static assets & HLS stream output
    └── package.json       # Node.js dependencies
```

---

## Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **MongoDB** (Local instance or MongoDB Atlas)
- **FFmpeg** (Required for converting RTSP to browser-compatible HLS)

### 2. Backend Setup
1. Navigate to the `backend` folder:
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
4. Run the server:
   ```bash
   python app.py
   ```
   The backend will start on `http://localhost:5000`.

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   Access the app at: `http://localhost:5173`

---

## Livestream & RTSP Configuration

### How to Provide or Change RTSP URL
Web browsers do not support the RTSP protocol natively. To view a livestream, you must convert the RTSP stream into **HLS (m3u8)** format using FFmpeg.

1. **Obtain RTSP URL:** Get your stream URL (e.g., `rtsp://admin:password@192.168.1.10:554/stream`).
2. **Convert to HLS:** Run the following command in a new terminal window:
   ```bash
   ffmpeg -i "YOUR_RTSP_URL" -codec:v copy -codec:a copy -f hls -hls_time 2 -hls_list_size 3 -hls_flags delete_segments frontend/public/stream.m3u8
   ```
   *Note: For testing without a camera, you can use any video file or a public stream as the input.*
3. **Load in App:** In the application top bar, enter `http://localhost:5173/stream.m3u8` and click **Load Stream**.

---

## CRUD API Documentation

**Base API URL:** `http://localhost:5000/api`

### 1. Fetch Overlays
- **Endpoint:** `/overlays`
- **Method:** `GET`
- **Description:** Returns a list of all saved overlays.
- **Example Response:**
  ```json
  [
    {
      "_id": "64f1...",
      "type": "text",
      "content": "Cam 01 - Main Entrance",
      "position": {"x": 50, "y": 50},
      "size": {"width": 200, "height": 40}
    }
  ]
  ```

### 2. Create Overlay
- **Endpoint:** `/overlays`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "type": "image",
    "content": "https://example.com/logo.png",
    "position": {"x": 100, "y": 100},
    "size": {"width": 100, "height": 100}
  }
  ```

### 3. Update Overlay
- **Endpoint:** `/overlays/<overlay_id>`
- **Method:** `PUT`
- **Description:** Updates position, size, or content.
- **Body:** `{ "position": {"x": 150, "y": 80} }`

### 4. Delete Overlay
- **Endpoint:** `/overlays/<overlay_id>`
- **Method:** `DELETE`

---

## User Guide

### Livestream Playback
1. **Source:** Paste your HLS (`.m3u8`) or MP4 URL in the stream path input.(eg: `http://localhost:5173/stream.m3u8` or 'https://vjs.zencdn.net/v/oceans.mp4' or 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
2. **Action:** Click **Load Stream**.
3. **Controls:** Use the integrated Video.js bar to play, pause, or adjust volume.

### Managing Overlays
1. **Add:** In the "Add New Overlay" section, choose **Text** (for labels) or **Image URL** (for logos).
2. **Positioning:** Click and drag any overlay to move it anywhere within the video frame.
3. **Resizing:** Grab the **blue handle** at the bottom-right corner of an overlay to adjust its dimensions.
4. **Removal:** Click the red trash icon on the overlay to permanently delete it.
5. **Auto-Save:** Every change to an overlay (repositioning or resizing) is automatically saved to the database.

---

## Troubleshooting
- **Video Not Loading:** Ensure FFmpeg is running and generating `.ts` segments in `frontend/public/`.
- **Database Connection:** Verify MongoDB is running on `mongodb://localhost:27017/`.
- **Styling:** If overlays don't look right, ensure `index.css` is correctly imported in `main.jsx`.

---
*Created by Juned*
