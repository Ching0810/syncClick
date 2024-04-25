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

  const handleClick = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    ws.emit('sendPosition', { x, y });
    console.log(`Current web A position: x=${x}, y=${y}`)
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
          width: '500px', 
          height: '200px', 
          position: 'absolute', 
          top: '0px', 
          left: '0px',
          cursor: 'none' // Hide the default cursor
        }} 
        onClick={handleClick}
        onMouseMove={handleMouseMove} // Add the mousemove event listener
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
        <div 
          style={{backgroundColor: 'white', position: 'absolute', width:'100px', height:'40px', top: '10px', left: '10px', zIndex: 1}}
          onClick={() => console.log('button A clicked!')}
        >
          button A
        </div>
        <div 
          style={{backgroundColor: 'white', position: 'absolute', width:'100px', height:'40px', top: '10px', left: '160px', zIndex: 1}}
          onClick={() => console.log('button B clicked!')}
        >
          button B
        </div>
        <div 
          style={{backgroundColor: 'white', position: 'absolute', width:'40px', height:'40px', top: '110px', left: '160px', borderRadius: '20px', zIndex: 1}}
        >
          button C
        </div>
      </div>
    </div>
  );
};
