import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function Pilots() {

  const socket = io('http://localhost:3001/api/pilots')

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });



    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);


  return (
    <div></div>
  )  

}

export default Pilots