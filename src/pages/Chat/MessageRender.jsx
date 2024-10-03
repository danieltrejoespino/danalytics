import { Box, Typography, TextField, Button, IconButton, Paper, styled, Card, CardMedia, Fab, Menu, MenuItem } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'; 
import Avatar from '@mui/material/Avatar';

const MessageRender = ({ text }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(text.MSG).then(() => {
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
      <Avatar alt={text.NAME_USER} src={`https://robohash.org/${text.NAME_USER}.png`} sx={{ marginRight: 1 }} />

      <pre style={{ wordWrap: 'break-word' }}>
        <code>{text.MSG}</code>
      </pre>

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
        <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />
      </IconButton>
    </Box>
  );
};


export default MessageRender