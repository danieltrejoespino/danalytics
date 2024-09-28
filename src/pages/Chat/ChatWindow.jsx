import { useState, useEffect, useRef } from 'react';
import { Box, Typography, TextField, Button, IconButton, Paper, styled, Card, CardMedia, Fab, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';import Avatar from '@mui/material/Avatar';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { useSocket } from "../../hooks/useSocket";
import Cookies from 'js-cookie';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#dbecfe',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minWidth: '200px',
  ...theme.applyStyles('dark', {
    backgroundColor: '#3e5266',
    color: '#EDEFF4'
  }),
}));

const Msgtext = ({ user = 'guest', text, isOwnMessage }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      // alert('Texto copiado al portapapeles!');
    }).catch(err => {
      console.error('Error al copiar texto: ', err);
    });
  };


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        position: 'relative', // Añadir posición relativa aquí
      }}
    >
      <Avatar alt={user} src={`https://robohash.org/${user}.png`} sx={{ marginRight: 1 }} />
      <Typography variant="body2" sx={{ wordWrap: 'break-word' }}>
        <pre>
          <code>{text}</code>
        </pre>
      </Typography>

      <IconButton
        onClick={handleCopy}
        sx={{
          position: 'absolute', // Cambiar a posición absoluta
          top: 0,
          right: 0,
          zIndex: 1,
          color: 'inherit',
          size: 'small', // Hacer el botón más pequeño
        }}
      >
        <ContentCopyRoundedIcon sx={{ fontSize: 15}}  />
      </IconButton>
    </Box>
  );
};

const MsgImg = ({ img }) => {
  const [hover, setHover] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleImageClick = () => {
    setIsZoomed((prevZoom) => !prevZoom); // Alterna entre ampliado y no ampliado
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <Card
      sx={{
        maxWidth: isZoomed ? 800 : 400,
        position: 'relative', // Necesario para posicionar los botones
        cursor: 'pointer',
        transition: 'max-width 0.3s ease',
        overflow: 'hidden', // Para que la imagen y los botones se mantengan dentro de los límites
      }}
      onMouseEnter={handleMouseEnter} // Mostrar botones al pasar el mouse
      onMouseLeave={handleMouseLeave} // Ocultar botones al salir del área del mouse
    >
      <CardMedia
        component="img"
        height={isZoomed ? 280 : 140}
        image={img}
        alt="Descripción de la imagen"
        onClick={handleImageClick}
        sx={{
          transition: 'height 0.3s ease', // Transición suave para cambiar el tamaño de la imagen
        }}
      />
      {hover && (
        <Box
          sx={{
            position: 'absolute', // Posiciona el contenedor en relación con el Card
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
            color: '#fff',
            zIndex: 1, // Asegura que los botones estén encima de la imagen
            pointerEvents: 'none', // Permite que el clic pase a través de los botones
          }}
        >
          <a href={img} download="imagen_descargada" style={{ textDecoration: 'none', pointerEvents: 'auto' }}>
            <IconButton
              sx={{ color: 'white', mx: 1 }}
              onClick={(e) => {
                e.stopPropagation(); // Evita que el clic en el botón cierre el hover
              }}
            >
              <DownloadForOfflineIcon />
            </IconButton>
          </a>
        </Box>
      )}
    </Card>
  );
};

// orientation={msg.USERID === 1 ? 1 : 2}

const Msg = ({ data, media }) => {
  const sxProps = {
    my: 1,
    borderRadius: '10px',
    width: 'fit-content',
    ...(data.USERID !== 1 && { ml: 'auto' })
  };
  let CompToRender = null

  switch (media) {
    case 'text':
      CompToRender = <Msgtext user={data.NAME_USER} text={data.MSG} isOwnMessage={data.USERID === 1} />
      break;
    case 'img':
      CompToRender = <MsgImg img={data} />
      break;
    default:
      break;
  }

  return (
    <>
      <Item sx={sxProps}>
        {CompToRender}
      </Item>
    </>
  )
}

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

  return (
    <Paper elevation={3} style={{ height: '100vh', flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Chat Header */}
      <Box p={2} borderBottom="1px solid #ddd">
        <Typography variant="h6">Chat DSA  {online ? "Conectado" : "Desconectado"}</Typography>
      </Box>

      <Box p={2} flex={1} overflow="auto">
        {messages.map((msg, index) => {
          console.log('Mensaje:', msg); // Aquí haces el console.log
          return (
            <Msg
              key={index}
              data={msg}
              media={'text'}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
      <Box p={2} borderTop="1px solid #ddd" display="flex">
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
        <Button onClick={sendMessage} variant="contained" color="primary" style={{ marginLeft: '8px' }}>
          Enviar
        </Button>
      </Box>
    </Paper>
  )
};

export default ChatWindow;
