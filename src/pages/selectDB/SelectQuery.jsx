import { useEffect, useState } from "react";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";

import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { enqueueSnackbar } from "notistack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F5F6FA",
  // height: "400px",
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

const ItemRespuesta = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F5F6FA",
  ...theme.typography.body2,
  height: "600px",
  padding: theme.spacing(1),
  overflowY: "scroll",
  // textAlign: "center",
  color: theme.palette.text.secondary,
  minWidth: "200px",
  maxHeight: "800px",
  ...theme.applyStyles("dark", {
    backgroundColor: "#3e5266",
    color: "#EDEFF4",
  }),
}));

const SelectQuery = () => {
  const [query, setQuery] = useState("SELECT * FROM DUAL");
  const [data, setData] = useState("");
  const [userConn, setUserConn] = useState("");

  const handleChange = (event) => {
    setUserConn(event.target.value);
  };

  const handleSubmit = async () => {
    const url = "https://172.20.1.97:3009/api-serv/testOraQuery";
    const params = {
      query: ` ${query} `,
      campaign: userConn,
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
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Box sx={{ width: "100%", flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Item>
            <Typography variant="h5" gutterBottom>
              Consulta a Oracle{" "}
              <span style={{ color: "red" }}>(Siempre agrega un WHERE)</span>
              <a
                href={`https://172.20.1.97:3009/api-serv/testApi`}
                target="_blank"
                rel="noopener noreferrer"
              >
                api
              </a>
            </Typography>

            <Grid container spacing={3}>
              <Grid xs={6}>
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    onChange={handleInputChange}
                    value={query}
                    fullWidth
                    multiline
                    label="Escribe o pega algo"
                    variant="standard"
                    sx={{
                      height: 300,
                      overflowY: "auto",
                    }}
                    InputProps={{
                      // style: { maxHeight: "400px", overflow: "auto" },
                    }}
                  />
                </Box>
              </Grid>
              <Grid xs={6}>
                <Box sx={{ marginBottom: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Esquemas
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userConn}
                      label="Conexiones"
                      onChange={handleChange}
                    >
                      <MenuItem value={0}>DBO</MenuItem>
                      <MenuItem value={1}>ASISTENCIA</MenuItem>
                      <MenuItem value={1008}>AMEXINSURANCEDIG</MenuItem>
                      <MenuItem value={998}>HSBCAPP</MenuItem>
                      <MenuItem value={1013}>CITIBANCOWEB</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Button
                    onClick={handleSubmit}
                    variant="success"
                    style={{ background: "#ce93d8", width: "400px" }}
                  >
                    Consultar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={12}>
          <ItemRespuesta>
            <Typography variant="h5" gutterBottom>
              Respuesta:
            </Typography>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          <TableAnswer answer={data}/>
          </ItemRespuesta>
        </Grid>
      </Grid>
    </Box>
  );
};

const TableAnswer = ({answer}) => {

    // 1. Genera las columnas dinámicamente basándote en las claves del primer objeto
    const columns = Object.keys(answer[0] || {}).map((key) => ({
      name: key.toUpperCase(),      // Nombre de la columna (en mayúsculas)
      selector: (row) => row[key],  // Accede a cada propiedad dinámica
      sortable: true,               // Habilita la ordenación
      wrap: true                    // Envuelve el texto si es muy largo
    }));
  
    return (
      <DataTable
        columns={columns}       // Pasa las columnas generadas
        data={answer}             // Pasa los datos
        pagination              // Agrega paginación
        striped                 // Filas con rayado alterno
        highlightOnHover        // Resalta al pasar el cursor
        responsive              // Hace la tabla adaptable a pantallas móviles
        // defaultSortField="SOLICITUD" // Campo predeterminado de ordenación
        
      />
    );
}

export default SelectQuery;
