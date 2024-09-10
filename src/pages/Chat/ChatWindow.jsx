import { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Paper, styled, Card, CardMedia, Fab, Menu, MenuItem } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#dbecfe',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#3e5266',
    color: '#EDEFF4'
  }),
}));

const Msgtext = ({ text }) => {
  return (
    <Typography variant="body2">{text}</Typography>
  )
}
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


const FloatingActionButtons = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Adjuntar</MenuItem>
        <MenuItem onClick={handleClose}>Imagen</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}

const Msg = ({ data, orientation, media }) => {
  const sxProps = {
    my: 1,
    borderRadius: '8px',
    width: 'fit-content',
    ...(orientation !== 1 && { ml: 'auto' })
  };
  let CompToRender = null

  switch (media) {
    case 'text':
      CompToRender = <Msgtext text={data} />
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

const ChatWindow = () => (
  <Paper elevation={3} style={{ height: '100vh', flex: 1, display: 'flex', flexDirection: 'column' }}>
    {/* Chat Header */}
    <Box p={2} borderBottom="1px solid #ddd">
      <Typography variant="h6">Chat with Contact Name</Typography>
    </Box>

    <Box p={2} flex={1} overflow="auto">
      <Msg data='Hola mundo' orientation={1} media={'text'} />
      <Msg data='Hola mundo' orientation={2} media={'text'} />
      <Msg
        data='https://w7.pngwing.com/pngs/258/281/png-transparent-letter-alphabet-blue-letter-d-miscellaneous-rectangle-teal-thumbnail.png'
        orientation={2}
        media={'img'} />
      <Msg
        data='https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw'
        orientation={1}
        media={'img'} />

    </Box>

    <FloatingActionButtons />

    <Box p={2} borderTop="1px solid #ddd" display="flex">
      <TextField fullWidth variant="outlined" placeholder="Type a message..." />
      <Button variant="contained" color="primary" style={{ marginLeft: '8px' }}>
        Enviar
      </Button>
    </Box>
  </Paper>
);

export default ChatWindow;
