import { useContext , useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../contexts/AuthContext";
import axios from 'axios';

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
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


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
  const { login} = useContext(AuthContext);
  const navigate = useNavigate()
  const [dataLogin, setDataLogin] = useState({
    loginUser: "",
    loginPass: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleCredentials = (e) => {
    // console.log(e.target.value);
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value })
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const URL = import.meta.env.VITE_API_URL;

    const ENDPOINT = URL+'auth/login'

    let data = {
      username : dataLogin.loginUser,
      password : dataLogin.loginPass
    }
    try {
      const response = await axios.post(ENDPOINT,data)
      
      if (response.status == 200) {
        login(response.data.token,response.data.idUser,response.data.nameUser)
        navigate('/')
      }

    } catch (error) {
      if (error.status != 200) {
        alert('Credenciales incorrectas')
      }
      console.log(error);
      console.log('---',error.status);
      console.log('---',error.response.data.message);
    }
    
    
  }


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
        <a href="https://192.168.1.80:3000/api/auth" target="_blank" rel="noopener noreferrer">api</a>
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}

          sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
        >

          <FormControl>
            <FormLabel htmlFor="email">Usuario</FormLabel>
            <TextField
              value={dataLogin.loginUser}
              onChange={handleCredentials}
              id="email"
              type="text"
              name="loginUser"
              placeholder="Usuario"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              sx={{ ariaLabel: 'email' }}
            />
          </FormControl>
          <FormControl>
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <FormLabel htmlFor="http://localhost:5173/login">Contraseña</FormLabel>
              <Link
                component="button"
                variant="body2"
                sx={{ alignSelf: 'baseline' }}
              >
                Olvidaste tu contraseña?
              </Link>
            </Box> */}
            <OutlinedInput
            id="outlined-adornment-password"
            value={dataLogin.loginPass}
            onChange={handleCredentials}
            name="loginPass"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
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
