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
import { enqueueSnackbar } from "notistack";
const URL = import.meta.env.VITE_API_URL;

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
  const [rsptaDuplicados, setRsptaDuplicados] = useState("");
  const [ready, setReady] = useState(false);
  const [textLoading, setTextLoading] = useState("");

  const [readyEtiquetado, setReadyEtiquetado] = useState(false);
  const [rsptaEtiquetado, setRsptaEtiquetado] = useState({});

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

  const handleSearch = async () => {
    if (!formValues.date1 || !formValues.date2) {
      const message = "Debes agregar ambas fechas";
      enqueueSnackbar(message, {
        variant: "warning",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return false;
    }
    setTextLoading("Consultando datos");
    setOpenBackdrop(true);
    const fechas = {
      fechaInicio: formValues.date1,
      fechaFin: formValues.date2,
    };
    // console.log(fechas)
    // return false
    const ENDPOINT = URL + "general/reEtiquetadoConsultaDuplicados";

    try {
      const response = await axios.post(ENDPOINT, fechas);

      if (response.status == 200) {
        const { duplicados } = response.data[0];
        setRsptaDuplicados(
          duplicados == 1 ? "Con duplicados" : "Sin duplicados"
        );
        setReady(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpenBackdrop(false);
    }
  };

  const handleSubmit = async () => {
    if (!formValues.date1 || !formValues.date2) {
      const message = "Debes agregar ambas fechas";
      enqueueSnackbar(message, {
        variant: "warning",
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
      return false;
    }
    setTextLoading("Re etiquetando grabaciones");
    setOpenBackdrop(true);
    const fechas = {
      fechaInicio: formValues.date1,
      fechaFin: formValues.date2,
    };
    // console.log(fechas)
    // return false
    const ENDPOINT = URL + "general/reEtiquetado";

    try {
      const response = await axios.post(ENDPOINT, fechas);

      // console.log(response.data);
      if (response.status == 200) {
        // const {duplicados} = response.data[0]
        setRsptaEtiquetado(response.data);
        setReadyEtiquetado(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpenBackdrop(false);
    }
  };

  return (
    <>
      <CustomBackdrop open={openBackdrop} text={textLoading} />

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
                  {ready && (
                    <Alert variant="filled" severity="warning">
                      <pre>{JSON.stringify(rsptaDuplicados, null, 2)}</pre>
                    </Alert>
                  )}
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid xs={3}>
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
                </Grid>
                <Grid xs={9}>
                  <Box
                    sx={{
                      height: 300,
                      overflowY: "auto",
                    }}
                    variant="filled"
                    severity="warning"
                  >
                    {readyEtiquetado && (
                      <pre>{JSON.stringify(rsptaEtiquetado, null, 2)}</pre>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ReEtiquetadoCitiBanco;

{
  /* <Grid xs={12}>
<Grid xs={6}>ddd</Grid>
<Grid xs={6}>ddd</Grid>

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
</Grid>  */
}
