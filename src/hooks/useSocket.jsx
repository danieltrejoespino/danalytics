import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useSocket = (serverPath, token) => {
  const [online, setOnline] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    // Conecta el socket y pasa el token para la autenticación
    socket.current = io(serverPath, {
      auth: {
        token: token,  // Aquí pasas el token JWT
      },
    });

    // Actualiza el estado de conexión
    socket.current.on('connect', () => {
      setOnline(true);
    });

    socket.current.on('disconnect', () => {
      setOnline(false);
    });

    // Cleanup al desmontar
    return () => {
      socket.current.disconnect();
    };
  }, [serverPath, token]);

  return { socket: socket.current, online };
};