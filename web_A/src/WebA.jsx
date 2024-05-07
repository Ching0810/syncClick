import { useState, useEffect } from 'react';
import { useWebSocket } from '../../useWebSocket';

export const ViewA = () => {
  const ws = useWebSocket('http://localhost:8080');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (ws) {
      console.log('success connect!');
    } else {
      console.error('WebSocket connection not established');
    }
  }, [ws]);

  // send 1. click position & 2. window size to socket server
  const handleClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const windowX = window.innerWidth
    const windowY = window.innerHeight
    ws.emit('sendPosition', { x, y, windowX, windowY });
    console.log(`Current web A position: x=${x}, y=${y}`)
    console.log(`Current web A window size: width=${window.innerWidth}, height=${window.innerHeight}`)
  }

  // Function to handle mouse move event
  const handleMouseMove = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    setCursorPosition({ x, y }); // Update the cursor position state
  }

  return (
    <div>
      <div 
        style={{ 
          backgroundColor: 'green', 
          width: '100%', 
          height: '100vh', 
          position: 'absolute', 
          top: '0px', 
          left: '0px',
          cursor: 'none'
        }} 
        onClick={handleClick}
        onMouseMove={handleMouseMove}
      >
        {/* Display the cursor position */}
        <div style={{
          position: 'absolute',
          top: cursorPosition.y,
          left: cursorPosition.x,
          width: '5px',
          height: '5px',
          backgroundColor: 'red',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10, // Ensure the cursor is above the buttons
        }} />

        {/* mock iframe block with same scale */}
        <div 
          onClick={() => console.log('iframe clicked!')}
          style={{
            backgroundColor: 'white', 
            position: 'absolute', 
            width: '50%', 
            height: '50%', 
            top: '30%', 
            left: '10%',
            overflow: 'hidden',
            justifyContent: 'center'
          }}
          id='remoteIframe'
        >
        </div>
      </div>
    </div>
  );
};
