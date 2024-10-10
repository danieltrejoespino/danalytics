import { useState, useEffect, useRef,useContext } from 'react';
import { Box, Typography,Paper } from '@mui/material';
import { AuthContext  } from "../../contexts/AuthContext";
// import socketIOClient from "socket.io-client";

import { useSocket } from "../../hooks/useSocket";
import TypeMessage from "./TypeMessage";
import ChatInput from "./ChatInput";


const ChatWindow = ({room,nameRoom}) => {
  const { userName, userId } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);  
  
  const { messages, sendMessage,isConnected,sendFile } = useSocket(userId, userName,room);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleBtnSend = (e) => {    
      sendMessage(message);
      setMessage(''); 

  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(message);
      setMessage(''); 
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      sendFile(file);
    }
  };

  return (
    <Paper elevation={3} style={{ height: '100vh', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Box p={2} borderBottom="1px solid #ddd">
        <Typography variant="h6">Chat con {nameRoom} </Typography>
      </Box>

      <Box p={2} flex={1} overflow="auto">
        {messages.map((msg, index) => {
          {/* console.log(msg) */}
          return (
            <TypeMessage
              key={index}
              data={msg}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
      <ChatInput handleFileChange={handleFileChange} handleKeyPress={handleKeyPress} handleMessage={handleMessage} message={message} handleBtnSend={handleBtnSend}/>

    </Paper>
  )
};

export default ChatWindow;
