import {useState,useContext } from "react";
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import { useTheme } from '../contexts/ThemeContext';
import ToggleColorMode from '../theme/ToggleColorMode';
import Badge from '@mui/material/Badge';

import {AuthContext  } from "../contexts/AuthContext";
import { useSocket } from "../hooks/useSocket";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});


const StyledBadge = styled(({ isConnected, ...props }) => <Badge {...props} />)(({ theme, isConnected }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: isConnected ? '#44b700' : '#f44336', 
    color: isConnected ? '#44b700' : '#f44336', 
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));




export default function SideMenu ({ setSelectedComponent }) {
  const { userName,userId} = useContext(AuthContext);
  const { isConnected } = useSocket(userId, userName);

  const { mode, toggleMode } = useTheme();

  const [actionMenu, setActionMenu] = useState(1);

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            Danalyze
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Procesos, reportes y mas
          </Typography>
        </Box>
      <Box
        sx={{
          display: 'flex',
          mt: '60px',
          p: 1.5,
        }}
      >
        <SelectContent setActionMenu={setActionMenu} />
      </Box>
      <Divider />
      <MenuContent actionMenu={actionMenu} setSelectedComponent={setSelectedComponent} />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ToggleColorMode
            data-screenshot="toggle-mode"
            mode={mode}
            toggleColorMode={toggleMode}
          />
        </Box>

        <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        isConnected={isConnected} // Pasar el estado de conexión
      >
        <Avatar
        sx={{ width: 36, height: 36,bgcolor: "#DBECFE", color: "black" }}
        >
        {userName.charAt(0)}
        </Avatar>
        </StyledBadge>
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            {userName}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
