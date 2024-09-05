import {useState } from "react";
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

export default function SideMenu ({ setSelectedComponent }) {
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

        <Avatar
          sizes="small"
          alt="Riley Carter"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            Daniel Trejo
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
