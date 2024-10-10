import { List, ListItem, ListItemButton, ListItemIcon, ListItemAvatar, Avatar, ListItemText, Divider, Paper } from '@mui/material';
import { useState, useEffect, useRef, useContext, Fragment } from 'react';

const Sidebar = ({ rooms, setSelectRoom }) => {

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuClick = (room) => {
    // console.log(room);
    setSelectedIndex(room);
    setSelectRoom(room); // Ahora pasamos el objeto room completo o room.ID según lo que prefieras
  };

  return (
    <Paper elevation={3} style={{ height: '100vh', overflowY: 'auto', width: '200px' }}>
      <List>
        {rooms.map((room) => (
          <Fragment key={room.ID}>
            <ListItemButton
              selected={selectedIndex === room.ID} // Verificar si el índice actual es el seleccionado
              onClick={() => handleMenuClick(room.ID)}
              sx={{
                ...(selectedIndex === room.ID && {
                  backgroundColor: 'rgba(0, 0, 255, 0.1)', 
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 255, 0.2)', // Fondo más oscuro al pasar el ratón
                  },
                }),
              }}
            >
              <ListItemAvatar>                
                <Avatar src={`https://robohash.org/${room.ID}.png`} />
              </ListItemAvatar>
              <ListItemText primary={room.NAME} 
              // secondary="Last message..." 

              />
            </ListItemButton>
            <Divider variant="inset" component="li" />
          </Fragment>

        ))}
      </List>
    </Paper>
  );
};

export default Sidebar;

