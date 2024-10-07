import { useState} from 'react';

import { Box, Typography, TextField, Button, IconButton, Paper, styled, Card, CardMedia, Fab, Menu, MenuItem } from '@mui/material';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import DescriptionIcon from '@mui/icons-material/Description'; 

const FilesRender = ({ file }) => {
  const [hover, setHover] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const isPDF = file.NAMEFILE.toLowerCase().endsWith('.pdf');
  const isCSV = file.NAMEFILE.toLowerCase().endsWith('.csv');

  const extension = file.NAMEFILE.split('.').pop();

  // console.log(file)


  const handleCardClick = () => {
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
    maxWidth: isZoomed ? 1000 : 400,
    position: 'relative',
    cursor: 'pointer',
    transition: 'max-width 0.3s ease',
    overflow: 'hidden',
  }}
  onClick={handleCardClick} // Aumentar el tamaño al hacer clic en el Card
  onMouseEnter={handleMouseEnter} // Mostrar botones al pasar el mouse
  onMouseLeave={handleMouseLeave} // Ocultar botones al salir del área del mouse
>
      {/* Nombre del usuario */}
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: "bold", marginRight: 1 }}
      >
        {file.NAME_USER}
      </Typography>
  {/* Mostrar PDF si es un archivo PDF */}
  {isPDF && (
    <iframe
      src={file.MSG}
      title={file.NAMEFILE}
      width={isZoomed ? "1000" : "300"} // Cambia el tamaño del iframe según el estado de zoom
      height={isZoomed ? "800" : "250"}
      style={{ border: 'none', transition: 'width 0.3s ease, height 0.3s ease' }}
    />
  )}

  {/* Mostrar CSV si es un archivo CSV */}
  {!isPDF && (
    <Box
      sx={{
        p: 2,
        width: isZoomed ? 1000 : 300, // Ajusta el tamaño del contenedor de CSV
        height: isZoomed ? 800 : 250,
        border: 'none',
        transition: 'width 0.3s ease, height 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo blanco semitransparente para el CSV
      }}
    >
      <p>Archivo {extension}: {file.NAMEFILE}</p>
    </Box>
  )}

  {/* Botón de descarga visible al pasar el mouse */}
  {hover && (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Fondo semitransparente
        color: '#fff',
        zIndex: 1,
        pointerEvents: 'none', // Permite que el clic pase a través de los botones
      }}
    >
      <a href={file.MSG} download={file.NAMEFILE} style={{ textDecoration: 'none', pointerEvents: 'auto' }}>
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
}

export default FilesRender


