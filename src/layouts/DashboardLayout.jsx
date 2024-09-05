import {useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import GetSignInTheme from '../theme/GetSignInTheme';
import Header from './Header';
import MainGrid from './MainGrid';
import SideMenu from './SideMenu';


import { ThemeProvider, useTheme } from '../contexts/ThemeContext';  

export default function DashboardLayout() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}

function DashboardContent() {
  const { mode} = useTheme(); 
  const signInTheme = createTheme(GetSignInTheme(mode));
  const [selectedComponent, setSelectedComponent] = useState(0); 

  return (
    <MuiThemeProvider theme={signInTheme}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu setSelectedComponent={setSelectedComponent} /> 
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 10,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid  selectedComponent={selectedComponent}/> 
          </Stack>
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}
