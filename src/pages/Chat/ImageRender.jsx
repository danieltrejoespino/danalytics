import { useState} from 'react';

import { Box, Typography, TextField, Button, IconButton, Paper, styled, Card, CardMedia, Fab, Menu, MenuItem } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';



const ImageRender = ({ img }) => {
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
        image={img.MSG}
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
          <a href={img.MSG} download="imagen_descargada" style={{ textDecoration: 'none', pointerEvents: 'auto' }}>
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



export default ImageRender
