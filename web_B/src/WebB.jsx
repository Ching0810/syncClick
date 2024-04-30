import { useEffect } from 'react';
import { useWebSocket } from '../../useWebSocket';
import Iframe from './components/Iframe';

export const ViewB = () => {
  const ws = useWebSocket('http://localhost:8080');

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
      const configPositionX = position.x
      const configPositionY = position.y
      const element = document.elementFromPoint(configPositionX, configPositionY)
      if (element.tagName !== 'IFRAME') {
        element.click()
      } else {
        element.contentWindow.postMessage({"x": configPositionX, "y": configPositionY}, "http://localhost:5175/");
      }
  })
}

  return (
    <div>
      <div 
        style={{ backgroundColor: 'blue', width: '500px', height: '600px', position: 'absolute', left: '0', top: '0', display: 'flex', flexDirection: 'column' }}
        id='background'
      >
        <div 
          style={{backgroundColor: 'green', position: 'absolute', width:'150px', height:'50px', top: '5px', left: '5px'}}
          onClick={() => console.log('button A clicked!')}
          id='button A'
        >
          button A
        </div>
        <div 
          style={{backgroundColor: 'green', position: 'absolute', width:'150px', height:'50px', top: '5px', left: '200px'}}
          onClick={() => console.log('button B clicked!')}
          id='button B'
        >
          button B
        </div>
        <div 
          style={{backgroundColor: 'green', position: 'absolute', width:'150px', height:'50px', top: '75px', left: '200px'}}
          onClick={() => console.log('button C clicked!')}
          id='button C'
        >
          button C
        </div>
        <Iframe />
      </div>
    </div>
  );
};
