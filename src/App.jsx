import { createTheme } from '@mui/material/styles';
import useThemeMode from './hooks/useThemeMode';
import GetSignInTheme from './theme/GetSignInTheme';
import AppRoutes from './routes/AppRoutes';
import AppProviders from './contexts/AppProviders';

function App() {
  const [mode] = useThemeMode();  // Usando el hook personalizado para el tema
  const signInTheme = createTheme(GetSignInTheme(mode));

  return (
    <AppProviders theme={signInTheme}>
      <AppRoutes />
    </AppProviders>
  );
}

export default App;
