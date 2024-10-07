import { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

export const useSocket = (userId, userName) => {
  const ENDPOINT = import.meta.env.VITE_API_URL_CHAT;
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false)
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      // console.log("Conectado al servidor");
    });

    // Cuando se desconecta
    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
      console.log("Desconectado del servidor");
    });

    // Escuchar mensajes anteriores
    socketRef.current.on("previousMessages", (previousMessages) => {
      console.log("Mensajes anteriores:", previousMessages); // Agrega este log
      setMessages(previousMessages);
    });

    // Escuchar nuevos mensajes de chat
    socketRef.current.on("chatMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Desconectar cuando se desmonta el componente
    return () => {
      socketRef.current.disconnect();
    };
  }, [ENDPOINT]);

  const sendMessage = (message) => {
    if (message) {
      let data = {
        USERID: userId,
        NAME_USER: userName,
        TYPE: 'text',
        MSG: message
      };
      socketRef.current.emit('chatMessage', data);
    }
  };

  const sendFile = (file) => {
    if (file) {
      const { type, name } = file;

      const fileTypes = {
        'image/jpeg': 'image',
        'image/png': 'image',
        'image/gif': 'image',
        'image/webp': 'image',
        // Otros tipos de imagen
        'application/pdf': 'file',
        'text/plain': 'file',
        'application/msword': 'file',
        // Otros tipos de archivo
      };

      let typeFile = fileTypes[type] || 'file';

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        let data = {
          USERID: userId,
          NAME_USER: userName,
          TYPE: typeFile,
          NAMEFILE: name,
          MSG: base64String
        };
        socketRef.current.emit('chatMessage', data);
      };
      reader.readAsDataURL(file); // Leer archivo como base64
    }
  };


  return {isConnected, messages, sendMessage,sendFile  };
};
