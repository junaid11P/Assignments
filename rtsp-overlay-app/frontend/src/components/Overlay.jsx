import React from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { Trash2 } from 'lucide-react';

const Overlay = ({ overlay, onUpdate, onDelete }) => {
    const nodeRef = React.useRef(null);

    const onDragStop = (e, data) => {
        onUpdate(overlay._id, {
            position: { x: data.x, y: data.y }
        });
    };

    const onResize = (e, { size }) => {
        onUpdate(overlay._id, {
            size: { width: size.width, height: size.height }
        });
    };

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            defaultPosition={overlay.position}
            onStop={onDragStop}
            cancel=".react-resizable-handle"
        >
            <div ref={nodeRef} style={{ position: 'absolute' }}>
                <Resizable
                    width={overlay.size.width}
                    height={overlay.size.height}
                    onResize={onResize}
                    draggableOpts={{ enableUserSelectHack: false }}
                >
                    <div
                        className="overlay-item"
                        style={{
                            width: overlay.size.width + 'px',
                            height: overlay.size.height + 'px',
                            backgroundColor: overlay.type === 'text' ? 'rgba(0,0,0,0.3)' : 'transparent',
                            padding: '4px',
                        }}
                    >
                        <button
                            onClick={() => onDelete(overlay._id)}
                            style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                background: '#ef4444',
                                border: 'none',
                                borderRadius: '50%',
                                padding: '4px',
                                cursor: 'pointer',
                                color: 'white',
                                zIndex: 10,
                                display: 'flex'
                            }}
                        >
                            <Trash2 size={12} />
                        </button>

                        {overlay.type === 'text' ? (
                            <span className="overlay-text" style={{ fontSize: `${overlay.size.height * 0.5}px` }}>
                                {overlay.content}
                            </span>
                        ) : (
                            <img src={overlay.content} alt="overlay" className="overlay-image" />
                        )}
                    </div>
                </Resizable>
            </div>
        </Draggable>
    );
};

export default Overlay;
