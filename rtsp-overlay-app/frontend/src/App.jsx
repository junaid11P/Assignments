import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './components/VideoPlayer';
import Overlay from './components/Overlay';
import { Plus, Link, Type, Image as ImageIcon, Play, Save } from 'lucide-react';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

function App() {
  const [streamUrl, setStreamUrl] = useState('https://vjs.zencdn.net/v/oceans.mp4');
  const [tempUrl, setTempUrl] = useState('');
  const [overlays, setOverlays] = useState([]);
  const [newOverlay, setNewOverlay] = useState({
    type: 'text',
    content: '',
  });

  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/overlays`);
      setOverlays(response.data);
    } catch (error) {
      console.error('Error fetching overlays:', error);
    }
  };

  const handleCreateOverlay = async () => {
    if (!newOverlay.content) return;
    try {
      const data = {
        ...newOverlay,
        position: { x: 50, y: 50 },
        size: { width: 150, height: 50 }
      };
      const response = await axios.post(`${API_BASE_URL}/overlays`, data);
      setOverlays([...overlays, response.data]);
      setNewOverlay({ ...newOverlay, content: '' });
    } catch (error) {
      console.error('Error creating overlay:', error);
    }
  };

  const handleUpdateOverlay = async (id, updates) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/overlays/${id}`, updates);
      setOverlays(overlays.map(o => o._id === id ? response.data : o));
    } catch (error) {
      console.error('Error updating overlay:', error);
    }
  };

  const handleDeleteOverlay = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/overlays/${id}`);
      setOverlays(overlays.filter(o => o._id !== id));
    } catch (error) {
      console.error('Error deleting overlay:', error);
    }
  };

  const updateStream = () => {
    if (tempUrl) {
      if (tempUrl.startsWith('rtsp://')) {
        alert("Browsers cannot play RTSP directly. Please convert your stream to HLS (.m3u8) using FFmpeg as described in the help section.");
      } else {
        setStreamUrl(tempUrl);
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 p-4 mb-8 flex justify-between items-center px-10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          RTSP Stream Master
        </h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter Stream URL (RTSP/HLS/MP4)"
            className="w-80"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
          />
          <button onClick={updateStream} className="btn-primary flex items-center gap-2">
            <Play size={18} /> Load Stream
          </button>
        </div>
      </nav>

      {/* Camera Templates */}
      <div className="container mx-auto px-4 mb-6 flex flex-wrap gap-2 items-center">
        <span className="text-sm text-slate-400 mr-2">Quick Templates:</span>
        <button
          onClick={() => setTempUrl('rtsp://admin:pass@8.8.8.8:554/Streaming/Channels/101')}
          className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs hover:bg-white/10 transition-colors"
        >
          Hikvision
        </button>
        <button
          onClick={() => setTempUrl('rtsp://admin:pass@8.8.8.8:554/cam/realmonitor?channel=1&subtype=0')}
          className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs hover:bg-white/10 transition-colors"
        >
          Dahua
        </button>
        <button
          onClick={() => setTempUrl('rtsp://admin:pass@8.8.8.8:9784/cameras/0/streaming/main?audio=1')}
          className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs hover:bg-white/10 transition-colors"
        >
          MyVMS
        </button>
        <button
          onClick={() => setTempUrl('https://vjs.zencdn.net/v/oceans.mp4')}
          className="bg-white/5 border border-white/10 px-3 py-1 rounded text-xs hover:bg-white/10 transition-colors"
        >
          Sample MP4
        </button>

      </div>

      <main className="container mx-auto px-4">
        {/* Video Section */}
        <div className="video-container">
          <VideoPlayer url={streamUrl} />

          <div className="overlay-container">
            {overlays.map(overlay => (
              <Overlay
                key={overlay._id}
                overlay={overlay}
                onUpdate={handleUpdateOverlay}
                onDelete={handleDeleteOverlay}
              />
            ))}
          </div>
        </div>

        {/* Content Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 control-panel glass">
          <div>
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Plus className="text-indigo-400" /> Add New Overlay
            </h2>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setNewOverlay({ ...newOverlay, type: 'text' })}
                  className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${newOverlay.type === 'text' ? 'bg-indigo-600 border-indigo-400' : 'bg-white/5 border-white/10'} border`}
                >
                  <Type size={18} /> Text
                </button>
                <button
                  onClick={() => setNewOverlay({ ...newOverlay, type: 'image' })}
                  className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 transition-all ${newOverlay.type === 'image' ? 'bg-indigo-600 border-indigo-400' : 'bg-white/5 border-white/10'} border`}
                >
                  <ImageIcon size={18} /> Image URL
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-slate-400">Content</label>
                <textarea
                  value={newOverlay.content}
                  onChange={(e) => setNewOverlay({ ...newOverlay, content: e.target.value })}
                  placeholder={newOverlay.type === 'text' ? 'Enter overlay text...' : '/logo-demo.png'}
                  className="w-full h-24 bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-indigo-500 transition-colors"
                />
              </div>

              <button
                onClick={handleCreateOverlay}
                className="btn-primary w-full py-4 mt-2 flex items-center justify-center gap-2"
              >
                <Save size={18} /> Add to Stream
              </button>
            </div>
          </div>

          <div className="border-l border-white/10 pl-8">
            <h2 className="text-xl font-bold mb-6">Instructions & Help</h2>
            <div className="space-y-4 text-slate-300">
              <p>1. <strong>RTSP Streams:</strong> Since browsers don't support RTSP directly, use a converter like RTSP.me or FFmpeg to stream as HLS (.m3u8).</p>
              <p>2. <strong>Management:</strong> Drag any overlay to reposition it. Use the bottom-right corner of an overlay to resize.</p>
              <p>3. <strong>Persistence:</strong> All overlays are automatically saved to the database on drag/resize.</p>
              <p>4. <strong>Supported Media:</strong> Supports HLS, MP4, and WebM for the main stream.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center py-10 text-slate-500 text-sm">
        RTSP Livestream Overlay Application © 2026
      </footer>
    </div>
  );
}

export default App;
