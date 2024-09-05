import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';




const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));



export default function FormSign() {
  return (
    <Card variant="outlined">
    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
    </Box>
    <Typography
      component="h1"
      variant="h4"
      sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
    >
      Inicio de sesion
    </Typography>
    <Box
      component="form"
      // onSubmit={handleSubmit}
      noValidate
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
    >
      <FormControl>
        <FormLabel htmlFor="email">Usuario</FormLabel>
        <TextField
          // error={emailError}
          // helperText={emailErrorMessage}
          id="email"
          type="email"
          name="email"
          placeholder="nomina"
          autoComplete="email"
          autoFocus
          required
          fullWidth
          variant="outlined"
          // color={emailError ? 'error' : 'primary'}
          sx={{ ariaLabel: 'email' }}
        />
      </FormControl>
      <FormControl>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <Link
            component="button"
            // onClick={handleClickOpen}
            variant="body2"
            sx={{ alignSelf: 'baseline' }}
          >
            Olvidaste tu contraseña?
          </Link>
        </Box>
        <TextField
          // error={passwordError}
          // helperText={passwordErrorMessage}
          name="password"
          placeholder="••••••"
          type="password"
          id="password"
          autoComplete="current-password"
          autoFocus
          required
          fullWidth
          variant="outlined"
          // color={passwordError ? 'error' : 'primary'}
        />
      </FormControl>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Recuerdame"
      />
      {/* <ForgotPassword open={open} handleClose={handleClose} /> */}
      <Button type="submit" fullWidth variant="contained"
      //  onClick={validateInputs}
       >
        Iniciar sesión
      </Button>      
    </Box>    
  </Card>
  )
}
