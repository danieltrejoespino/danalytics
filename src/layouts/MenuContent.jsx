import { useState } from 'react';
import { Stack, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import ChatIcon from '@mui/icons-material/Chat';
import StorageIcon from '@mui/icons-material/Storage';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import GroupIcon from '@mui/icons-material/Group';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import AddCardIcon from '@mui/icons-material/AddCard';

const mainListItems = [
  { text: 'Inicio', icon: <HomeRoundedIcon /> },
  { text: 'Chat', icon: <ChatIcon /> },
  // { text: 'Reportes', icon: <AnalyticsRoundedIcon /> },
  // { text: 'Utilidades', icon: <PeopleRoundedIcon /> },
  { text: 'Utilidades', icon: <AssignmentRoundedIcon /> },
  { text: 'Query', icon: <StorageIcon /> },
  { text: 'Caja de ahorro', icon: <AccountBalanceIcon /> },
  { text: 'Index10', icon: <GroupIcon /> },
  { text: 'Bines', icon: <AddCardIcon /> },
  { text: 'Extensiones', icon: <PhoneEnabledIcon /> },
  { text: 'Re etiquetado citibanco', icon: <FmdBadIcon /> },
];


export default function MenuContent({ actionMenu, setSelectedComponent }) {
  const [selectedIndex, setSelectedIndex] = useState(0); // Estado para almacenar el índice seleccionado

  const handleMenuClick = (index) => {
    setSelectedIndex(index); // Actualizar el índice seleccionado
    setSelectedComponent(index); // Actualizar el componente seleccionado
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              selected={selectedIndex === index} // Verificar si el índice actual es el seleccionado
              onClick={() => handleMenuClick(index)} // Actualizar el índice seleccionado al hacer clic
              sx={{ // Estilos adicionales para el botón seleccionado
                ...(selectedIndex === index && {
                  backgroundColor: 'rgba(0, 0, 255, 0.1)', // Ejemplo de fondo azul claro
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 255, 0.2)', // Fondo más oscuro al pasar el ratón
                  },
                }),
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
