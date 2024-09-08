import {useState } from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import GetSignInTheme from '../theme/GetSignInTheme';
import MainGrid from './MainGrid';
import SideMenu from './SideMenu';
import { Box, CssBaseline } from '@mui/material';


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
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden',mx: 3, }}>
        <SideMenu setSelectedComponent={setSelectedComponent} /> 

        <MainGrid  selectedComponent={selectedComponent}/> 
        
      </Box>
    </MuiThemeProvider>
  );
}
