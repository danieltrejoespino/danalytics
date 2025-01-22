import { useState } from "react";

import { styled } from "@mui/material/styles";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import { enqueueSnackbar } from "notistack";
import { Gif } from "@mui/icons-material";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F5F6FA",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  minWidth: "200px",
  ...theme.applyStyles("dark", {
    backgroundColor: "#3e5266",
    color: "#EDEFF4",
  }),
}));

export default function Utilities() {
  const [dataInput, setDataInput] = useState({
    inputValue: "",
    codeInput: "",
    decodeInput: "",
  });

  const [query, setQuery] = useState("2445925");
  const [birthDate, setbirthDate] = useState("");

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
      decodeInput: decodedValue,
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        const message = "Texto copiado";
        enqueueSnackbar(message, {
          variant: "info",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      })
      .catch((err) => {
        console.error("Error al copiar:", err);
      });
  };

  const handleInputDateB = (e) => {
    if (!/^\d*$/.test(e.target.value)) {
      const message = "Solo se aceptan numeros";
      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
      return false;
    }

    setQuery(e.target.value);
  };

  const handleDate = async () => {
    const url = "https://172.20.1.97:3009/api-serv/testOraQuery";
    const params = {
      query: `SELECT FECHANACIMIENTO  FROM HSBC.PERSONAS WHERE U_PERSONA = ${query} `,
      campaign: "0",
    };
    try {
      const response = await axios.post(url, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log(response.status);
      if (response.status == 200) {
        const message = "Consulta generada";
        enqueueSnackbar(message, {
          variant: "info",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setbirthDate(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Item>
              <Typography variant="h5" gutterBottom>
                Encriptar / desencriptar Base 64
              </Typography>

              <Grid container spacing={3}>
                <Grid xs={12}>
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
                <Grid xs={6}>
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
                              position: "absolute",
                              top: 0,
                              right: 0,
                              zIndex: 1,
                              color: "inherit",
                              size: "small",
                            }}
                          >
                            <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid xs={6}>
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
                              position: "absolute",
                              top: 0,
                              right: 0,
                              zIndex: 1,
                              color: "inherit",
                              size: "small",
                            }}
                          >
                            <ContentCopyRoundedIcon sx={{ fontSize: 15 }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Item>
          </Grid>

          <Grid xs={6}>
            <Item>
              <Typography variant="h5" gutterBottom>
                Contar caracteres
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={12}>
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

          {/* ----------------------------------------------------         */}
          <Grid xs={6}>
            <Item>
              <Typography variant="h5" gutterBottom>
                Consultar Fecha nacimiento
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={4}>
                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      onChange={handleInputDateB}
                      label="SOLICITUD"
                      placeholder="SOLICITUD"
                      multiline
                      fullWidth
                      focused
                      variant="outlined"
                      type="number"
                    />
                  </Box>
                </Grid>{" "}
                {/* fin grid 6 */}
                <Grid xs={4}>
                  <Box sx={{ marginBottom: 2 }}>
                    <Button
                      onClick={handleDate}
                      variant="success"
                      style={{
                        background: "#ce93d8",
                      }}
                    >
                      Consultar
                    </Button>
                  </Box>
                </Grid>
                <Grid xs={4}>
                  <Box sx={{ marginBottom: 2 }}>
                    <Box sx={{ marginBottom: 2 }}>
                      {birthDate && (
                        <Typography variant="h6" gutterBottom>
                          {JSON.stringify(
                            birthDate[0].FECHANACIMIENTO,
                            null,
                            2
                          )}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>{" "}
              {/* fin grid container */}
            </Item>
          </Grid>

          <Grid xs={6}>
            <Item>
              <Typography variant="h5" gutterBottom>
                SMS Impulse
              </Typography>
              <Grid container spacing={3}>
                <Grid xs={4}>Numero</Grid>
                
                <Grid xs={4}>
                  <Box sx={{ marginBottom: 2 }}>
                    <Button
                      // onClick={handleDate}
                      variant="success"
                      style={{
                        background: "#ce93d8",
                      }}
                    >
                      Disparar SMS
                    </Button>
                  </Box>
                </Grid>
                <Grid xs={4}>ss</Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

// http://172.20.1.95/sms_hsbc/index2.php?numero=4428450036&mensaje=Prueba_hsbc1&campana=998
