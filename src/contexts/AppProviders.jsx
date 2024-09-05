import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AuthProvider } from "./AuthContext";

const AppProviders = ({ theme, children }) => (
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  </AuthProvider>
);

export default AppProviders;
