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

  // send click position to socket server
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
          height: '600px', 
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
          style={{backgroundColor: 'white', position: 'absolute', width:'150px', height:'50px', top: '5px', left: '5px'}}
          onClick={() => console.log('button A clicked!')}
          id='button A'
        >
          button A
        </div>
        <div 
          style={{backgroundColor: 'white', position: 'absolute', width:'150px', height:'50px', top: '5px', left: '200px'}}
          onClick={() => console.log('button B clicked!')}
          id='button B'
        >
          button B
        </div>
        <div 
          style={{backgroundColor: 'white', position: 'absolute', width:'400px', height:'350px', top: '200px', left: '20px', padding: '2rem', overflow: 'hidden', boxSizing: 'border-box'}}
          onClick={() => console.log('iframe clicked!')}
          id='remoteIframe'
        >
          <div>
            <button style={{fontSize: '25px'}} onClick={() => alert('iframe button click!')}>Button</button>
          </div>
          <h1 onClick={() => console.log('text clicked!')}>Vite + React</h1>
          <div className="card">
            <button >
              count is 
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </div>
      </div>
    </div>
  );
};
