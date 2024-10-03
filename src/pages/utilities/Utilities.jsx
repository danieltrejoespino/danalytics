import { useState } from "react";


import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography, Box, TextField, InputAdornment, IconButton } from '@mui/material';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#dbecfe',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minWidth: '200px',
  ...theme.applyStyles('dark', {
    backgroundColor: '#3e5266',
    color: '#EDEFF4'
  }),
}));

export default function Utilities() {
  const [dataInput, setDataInput] = useState({
    inputValue: '',
    codeInput: "",
    decodeInput: ""
  });

  const [words, setWords] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleWords = (e) => {
    let count = e.target.value;
    setWords(count.length);
  };

  const handleCursorPosition = (event) => {
    const position = event.target.selectionStart;
    setCursorPosition(position);
  };


  const handleInputChange = (e) => {
    const value = e.target.value;
    setDataInput({
      inputValue: value,
    });

    const encodedValue = btoa(value);
    let decodedValue = "";

    try {
      decodedValue = atob(value);
    } catch (error) {
      decodedValue = "No se puede desencriptar";
    }

    setDataInput({
      codeInput: encodedValue,
      decodeInput: decodedValue
    });

  }


  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        console.log("Texto copiado:", text);
        // Puedes agregar una notificación aquí si deseas
      })
      .catch(err => {
        console.error("Error al copiar:", err);
      });
  };

  return <>

    <Box sx={{ width: '100%', flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <Typography variant="h5" gutterBottom>
              Encriptar / desencriptar Base 64
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    onChange={handleInputChange}
                    value={dataInput.inputValue}
                    fullWidth
                    label="Escribe o pega algo"
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={dataInput.codeInput}
                  name="codeInput"
                  label="Encode (Base64)"
                  fullWidth
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleCopy(dataInput.codeInput)}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 1,
                            color: 'inherit',
                            size: 'small'
                          }}
                        >
                          <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={dataInput.decodeInput}
                  label="Decode (Base64)"
                  name="decodeInput"
                  fullWidth
                  variant="outlined"
                  sx={{ marginBottom: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleCopy(dataInput.decodeInput)}
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            zIndex: 1,
                            color: 'inherit',
                            size: 'small'
                          }}
                        >
                          <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
          </Item>
        </Grid>

        <Grid item xs={6}>
          <Item>
            <Typography variant="h5" gutterBottom>
              Contar caracteres
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    onChange={handleWords}
                    onClick={handleCursorPosition}
                    onKeyUp={handleCursorPosition}
                    id="standard-textarea"
                    label="Texto a contar"
                    placeholder="Texto"
                    multiline
                    fullWidth
                    // color="secondary"
                    focused
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Total de palabras: {words}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Posición del cursor: {cursorPosition}
                  </Typography>                  
                </Box>
              </Grid>

            </Grid>

          </Item>
        </Grid>
      </Grid>
    </Box>


  </>
}


