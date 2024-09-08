import React from 'react';
import { Box, Typography, TextField, Button, Paper, styled, Card, CardMedia } from '@mui/material';


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
  return (
    <Card sx={{ maxWidth: 400 }}>
    <CardMedia
      component="img"
      height="140"
      image={img}
      alt="Descripción de la imagen"
    />
  </Card>
  )
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
      data='https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw' 
      orientation={2} 
      media={'img'} />
          <Msg 
      data='https://play-lh.googleusercontent.com/1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA=w3840-h2160-rw' 
      orientation={1} 
      media={'img'} />

    </Box>

    <Box p={2} borderTop="1px solid #ddd" display="flex">
      <TextField fullWidth variant="outlined" placeholder="Type a message..." />
      <Button variant="contained" color="primary" style={{ marginLeft: '8px' }}>
        Enviar
      </Button>
    </Box>
  </Paper>
);

export default ChatWindow;
