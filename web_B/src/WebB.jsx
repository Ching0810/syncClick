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
      const remotePositionX = position.x
      const remotePositionY = position.y
      const remoteWindowX = position.windowX
      const remoteWindowY = position.windowY
      const machinePositionX = remotePositionX * window.innerWidth / remoteWindowX
      const machinePositionY = remotePositionY * window.innerHeight / remoteWindowY
      
      // select DOM based on receive position
      const element = document.elementFromPoint(machinePositionX, machinePositionY)
      if (element.tagName !== 'IFRAME') {
        element.click()
        console.log(remoteWindowX, remoteWindowY)
      } else {
        console.log('iframe click!')
        // calculate click position relatively inside iframe
        const iframeXPosition = element.getBoundingClientRect().x
        const iframeYPosition = element.getBoundingClientRect().y

        element.contentWindow.postMessage({
          type: 'click',
          data: { x: machinePositionX - iframeXPosition, y: machinePositionY - iframeYPosition },
          origin: 'http://localhost:5175' // Ensure this matches the origin of your iframe
        }, '*')
      }
    })
  }

  return (
    <div>
      <div 
        style={{ backgroundColor: 'blue', width: '100%', height: '100vh', position: 'absolute', left: '0', top: '0', display: 'flex', flexDirection: 'column' }}
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
