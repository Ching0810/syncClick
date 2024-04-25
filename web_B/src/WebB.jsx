import { useEffect, useRef } from 'react';
import { useWebSocket } from '../../useWebSocket';

export const ViewB = () => {
  const ws = useWebSocket('http://localhost:8080');
  const buttonARef = useRef(null);
  const buttonBRef = useRef(null);
  const buttonCRef = useRef(null); // Create a separate ref for button C

  useEffect(() => {
    if (ws) {
      console.log('success connect!');
      initWebSocket();
    } else {
      console.error('WebSocket connection not established');
    }
  }, [ws]);

  const initWebSocket = () => {
    ws.on('sendPosition', (position) => {
      // Check if the received position is within button A
      const configPositionX = position.x/2
      const configPositionY = position.y/2
      if (buttonARef.current) {
        const rectA = buttonARef.current.getBoundingClientRect();
        const isInsideButtonA = configPositionX >= rectA.left &&
                                configPositionX <= rectA.right &&
                                configPositionY >= rectA.top &&
                                configPositionY <= rectA.bottom;
        if (isInsideButtonA) {
          buttonARef.current.click();
          return; // Exit the function if a click is triggered
        }
      }

      // Check if the received position is within button B
      if (buttonBRef.current) {
        const rectB = buttonBRef.current.getBoundingClientRect();
        const isInsideButtonB = configPositionX >= rectB.left &&
                                configPositionX <= rectB.right &&
                                configPositionY >= rectB.top &&
                                configPositionY <= rectB.bottom;
        if (isInsideButtonB) {
          buttonBRef.current.click();
          return; // Exit the function if a click is triggered
        }
      }

      // Check if the received position is within button C
      if (buttonCRef.current) {
        const rectC = buttonCRef.current.getBoundingClientRect();
        const centerX = rectC.left + rectC.width / 2;
        const centerY = rectC.top + rectC.height / 2;
        const radius = rectC.width / 2; // Assuming the circle is a square
        const distance = Math.sqrt(Math.pow(configPositionX - centerX, 2) + Math.pow(configPositionY - centerY, 2));

        if (distance <= radius) {
          buttonCRef.current.click();
        }
      }
    });
  };

  return (
    <div>
      <div 
        style={{ backgroundColor: 'blue', width: '250px', height: '100px', position: 'absolute', left: '0', top: '0' }}
      >
        <div 
          style={{backgroundColor: 'green', position: 'absolute', width:'50px', height:'20px', top: '5px', left: '5px'}}
          onClick={() => console.log('button A clicked!')}
          ref={buttonARef}
        >
          button A
        </div>
        <div 
          style={{backgroundColor: 'green', position: 'absolute', width:'50px', height:'20px', top: '5px', left: '80px'}}
          onClick={() => console.log('button B clicked!')}
          ref={buttonBRef}
        >
          button B
        </div>
        <div 
          style={{backgroundColor: 'green', position: 'absolute', width:'20px', height:'20px', top: '55px', left: '80px', borderRadius: '10px'}}
          onClick={() => console.log('button C clicked!')}
          ref={buttonCRef} // Use the separate ref for button C
        >
          button C
        </div>
      </div>
    </div>
  );
};
