import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as ReactDOM from 'react-dom'
import './index.css'
import App from './App.jsx'

// Shim for findDOMNode which was removed in React 19
// Many libraries like react-draggable and react-resizable still rely on it
window.ReactDOM = ReactDOM; // Ensure it's available globally for some older libs

if (typeof ReactDOM.findDOMNode !== 'function') {
  const findDOMNode = (instance) => {
    if (!instance) return null;
    if (instance instanceof HTMLElement) return instance;
    if (instance.current instanceof HTMLElement) return instance.current;

    // For class components, the DOM node is usually stored in an internal property 
    // or we can try to find it via the stateNode if we were deep debugging, 
    // but for simple shims, returning null or the instance itself if it's an element is safest.
    // Most libraries using this with 'nodeRef' won't even hit this.
    return null;
  };
  // @ts-ignore
  ReactDOM.findDOMNode = findDOMNode;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
