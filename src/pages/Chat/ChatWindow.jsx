import { useState, useEffect, useRef } from 'react';
import { Box, Typography,Paper } from '@mui/material';


import Cookies from 'js-cookie';
import { useSocket } from "../../hooks/useSocket";
import TypeMessage from "./TypeMessage";
import ChatInput from "./ChatInput";





const ChatWindow = () => {
  const { socket, online } = useSocket('http://localhost:3000', Cookies.get('token'))
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket) return;
    socket.on('chatMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);

    });
    return () => {
      socket.off('chatMessage');
    };
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      let data = {
        USERID: 1,
        NAME_USER: 'daniel',
        TYPE: 'text',
        MSG: message
      }
      socket.emit('chatMessage', data);
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

      console.log(typeFile);

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result;
        // console.log(base64String);
        let data = {
          USERID: 1,
          NAME_USER: 'daniel',
          TYPE: typeFile,
          NAMEFILE: name,
          MSG: base64String
        }
        socket.emit('chatMessage', data);
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
