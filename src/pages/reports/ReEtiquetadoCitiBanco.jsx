import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import CustomBackdrop from "../utilities/CustomBackdrop";
import axios from "axios";

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

const QueryPostgress = `
select count(*)  from (
select solicitud
from grabaciones
where left(fechahora,6) = '202405' and  estatus_venta is not null
group by solicitud
) as ventas

`;
const QueryOracle = `
SELECT customerid  
FROM CITI.SURVEYPERSONAS s               
WHERE RAZONCANCELACIONID = 0 AND COMMENTS = 'VENTA OK'    
AND ESTATUS = 'VALIDACION OK' AND VALIDANDO=4 AND VALIDAVOZ = 1               
AND TRUNC(s.PROCDATE) BETWEEN '01/05/2024' and '31/05/2024'
GROUP BY customerid
`;

const ReEtiquetadoCitiBanco = () => {
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [rsptaDuplicados, setRsptaDuplicados] = useState("prueba dsa");

  const [formValues, setFormValues] = useState({
    date1: "",
    date2: "",
  });

  const handleDate = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const duplicado = async () => {
      setOpenBackdrop(true);
      try {
        const fechas = {
          fechaInicio: formValues.date1,
          fechaFin: formValues.date2,
        };

        const url = "http://172.23.62.183:3000/api/consultaDuplicadosGrab";
        const rspta = await axios.post(url, fechas, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (rspta.data[0].duplicados == 1) {
          setRsptaDuplicados("Existen duplicados en este rango de fechas");
        } else {
          setRsptaDuplicados("Sin duplicados en este rango de fechas");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setOpenBackdrop(false);
      }
    };

    duplicado();

  };
  const handleSubmit = () => {
    console.log(formValues);
  };

  return (
    <>
      <CustomBackdrop open={openBackdrop} />

      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Item>
              <Typography
                variant="h6"
                gutterBottom
                component="a"
                href="http://172.23.62.183:3000/api/test"
                target="_blank"
                rel="noopener noreferrer"
              >
                Re-etiquetado CITI BANCO
              </Typography>

              <Grid container spacing={3}>
                <Grid xs={3}>
                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      name="date1"
                      value={formValues.date1}
                      onChange={handleDate}
                      type="date"
                      label="Fecha inicio"
                      variant="standard"
                      fullWidth
                    />
                  </Box>
                </Grid>
                <Grid xs={3}>
                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      name="date2"
                      value={formValues.date2}
                      onChange={handleDate}
                      type="date"
                      label="Fecha fin"
                      variant="standard"
                      fullWidth
                    />
                  </Box>
                </Grid>
                <Grid xs={3}>
                  <Box sx={{ marginBottom: 2 }}>
                    <Button
                      variant="Outlined"
                      color="success"
                      style={{ background: "#ce93d8" }}
                      onClick={handleSearch}
                    >
                      Consultar
                      <SearchIcon />
                    </Button>
                  </Box>
                </Grid>
                <Grid xs={3}>
                  
                  {rsptaDuplicados && (
                    <Alert variant="filled" severity="warning">
                      {rsptaDuplicados}
                    </Alert>
                  )}
                </Grid>
                <Grid xs={12}>
                  <Box sx={{ marginBottom: 2 }}>
                    <Button
                      variant="Outlined"
                      color="success"
                      style={{ background: "#ce93d8" }}
                      onClick={handleSubmit}
                    >
                      Comenzar re-etiquetado
                      <ArrowForwardIosIcon />
                    </Button>
                  </Box>

                  <Grid xs={6}>
                    <Typography variant="h6" gutterBottom>
                      Query postgres
                    </Typography>
                    <pre>
                      <code>{QueryPostgress}</code>
                    </pre>
                  </Grid>
                  <Grid xs={6}>
                    <Typography variant="h6" gutterBottom>
                      Query Oracle
                    </Typography>
                    <pre>
                      <code>{QueryOracle}</code>
                    </pre>
                  </Grid>
                </Grid>
              </Grid>

              {/* <Grid container spacing={3}>

            </Grid> */}
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ReEtiquetadoCitiBanco;
