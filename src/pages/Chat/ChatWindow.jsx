import { useState, useEffect, useRef,useContext } from 'react';
import { Box, Typography,Paper } from '@mui/material';

import { AuthContext  } from "../../contexts/AuthContext";
import socketIOClient from "socket.io-client";



// import { useSocket } from "../../hooks/useSocket";
import TypeMessage from "./TypeMessage";
import ChatInput from "./ChatInput";


const ChatWindow = () => {
  // const { socket, online } = useSocket('http://localhost:3000', Cookies.get('token'))
  const { userName,userId} = useContext(AuthContext);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  const ENDPOINT = import.meta.env.VITE_API_URL_CHAT;

  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);

    socketRef.current.on("previousMessages", (previousMessages) => {
      // console.log(previousMessages)
      setMessages(previousMessages);
    });

    socketRef.current.on("chatMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   if (!socket) return;
  
  //   // Cuando se conecta o se reconecta, solicita los mensajes anteriores
  //   socket.on("connect", () => {
  //     socket.emit("getPreviousMessages");
  //   });
  
  //   socket.on("previousMessages", (messages) => {
  //     setMessages(messages);  // Almacena los mensajes recibidos en el estado
  //   });
  
  //   socket.on("chatMessage", (message) => {
  //     setMessages((prevMessages) => [...prevMessages, message.data]);  // Añade los mensajes nuevos
  //   });
  
  //   return () => {
  //     socket.off("previousMessages");
  //     socket.off("chatMessage");
  //   };
  // }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

const online = 1

  const sendMessage = () => {


    if (message.trim()) {
      let data = {
        USERID: userId,
        NAME_USER: userName,
        TYPE: 'text',
        MSG: message
      }
      socketRef.current.emit('chatMessage', data);
      setMessage('');

    }
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const { type, name } = file;

      let typeFile = type == 'image/jpeg' ? 'image' : 'file'

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result;
        // console.log(base64String);
        let data = {
          USERID: 1,
          NAME_USER: userName,
          TYPE: typeFile,
          NAMEFILE: name,
          MSG: base64String
        }
        // socket.emit('chatMessage', data);
        socketRef.current.emit('chatMessage', data);
      }
      reader.readAsDataURL(file);
    }

  }

  return (
    <Paper elevation={3} style={{ height: '100vh', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Box p={2} borderBottom="1px solid #ddd">
        <Typography variant="h6">Chat DSA  {online ? "Conectado" : "Desconectado"}</Typography>
      </Box>

      <Box p={2} flex={1} overflow="auto">
        {messages.map((msg, index) => {
          {/* console.log('Mensaje:', msg); */ }
          return (
            <TypeMessage
              key={index}
              data={msg}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
      <ChatInput handleFileChange={handleFileChange} handleKeyPress={handleKeyPress} handleMessage={handleMessage} message={message} sendMessage={sendMessage} />

    </Paper>
  )
};

export default ChatWindow;
