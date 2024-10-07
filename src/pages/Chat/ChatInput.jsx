import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { Box, TextField, IconButton } from '@mui/material';


const ChatInput = ({ message, handleMessage, handleKeyPress, handleFileChange,handleBtnSend }) => {
  return (
    <Box p={2} borderTop="1px solid #ddd" display="flex">

      <IconButton
        component="label"
        style={{ color: "#5f6368" }}
      >
        <AttachFileIcon />
        <input
          type="file"
          onChange={handleFileChange}
          multiple
          hidden
        />
      </IconButton>

      <TextField
        value={message}
        onChange={handleMessage}
        onKeyPress={handleKeyPress}
        multiline
        maxRows={1}
        fullWidth variant="outlined"
        placeholder="Escribe un mensaje"
        style={{ overflowY: 'auto' }}
      />
      <IconButton
        onClick={handleBtnSend}
        style={{ color: "#60aefa" }} 
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};


export default ChatInput