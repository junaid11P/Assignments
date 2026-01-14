import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as ReactDOM from 'react-dom'
import './index.css'
import App from './App.jsx'

// Shim for findDOMNode which was removed in React 19
// Many libraries like react-draggable and react-resizable still rely on it
if (typeof ReactDOM.findDOMNode !== 'function') {
  window.ReactDOM = ReactDOM || window.ReactDOM || {};
  window.findDOMNode = (instance) => {
    if (!instance) return null;
    if (instance instanceof HTMLElement) return instance;
    if (instance.current instanceof HTMLElement) return instance.current;
    return null;
  };
  // @ts-ignore
  window.ReactDOM.findDOMNode = window.findDOMNode;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
