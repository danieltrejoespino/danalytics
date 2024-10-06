import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from "./AuthContext";
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

const AppProviders = ({ theme, children }) => (
  <AuthProvider>
  <SnackbarProvider maxSnack={6} />
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  </AuthProvider>
);

export default AppProviders;
