import { useState, useEffect } from 'react';
import webSocket from 'socket.io-client';

export const useWebSocket = (url) => {
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = webSocket(url);
    setWs(socket);
    return () => socket.close();
  }, [url]);

  return ws;
};
