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
import DataTable, { createTheme } from "react-data-table-component";
const URL = import.meta.env.VITE_API_URL;
import { enqueueSnackbar } from "notistack";

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

export default function CheckBin() {

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [ready, setReady] = useState(false);
  const [bin, setBin] = useState();

  const [formValues, setFormValues] = useState({
    bin: "477212",
  });

  const handleDate = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {

    if (formValues.bin.length <6) {
      const message = "BIN debe ser a 6 digitos";
      enqueueSnackbar(message, {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
      });
      return false;
    }


    setOpenBackdrop(true);
    const ENDPOINT = URL + "general/bin";
    let data = {
      bin: formValues.bin,
    };

    try {
      const response = await axios.post(ENDPOINT, data);

      if (response.data.code == 200) {
        const {
          valid,
          number,
          brand,
          type,
          level,
          currency,
          issuer: { name: issuerName },
          country: { name: countryName },
          country: { currency: countryCurrency },
        } = response.data.BIN;
        const dataUseful = {
          BIN: number,
          VALIDA: valid ? "SI" : "NO",
          TIPO: type,
          MARCA: brand,
          NIVEL: level,
          DIVISA: currency,
          EMISOR: issuerName,
          PAIS: countryName,
          DIVISA_PAIS: countryCurrency

        }
        setBin(dataUseful)
        setReady(true)

      }
    } catch (error) {
      console.log(error);
    } finally {
      setOpenBackdrop(false);
    }
  };

  return (
    <>
      <CustomBackdrop open={openBackdrop} text="Consultando datos" />

      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Item>
              <Typography
                variant="h6"
                gutterBottom
                component="a"
                href="https://bin-ip-checker.p.rapidapi.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Valida Bin
              </Typography>

              <Grid container spacing={3}>
                <Grid xs={4}>
                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      name="bin"
                      value={formValues.bin}
                      onChange={handleDate}
                      type="text"
                      label="Bin a consultar"
                      variant="standard"
                      fullWidth
                    />
                  </Box>
                </Grid>

                <Grid xs={8}>
                  <Box sx={{ marginBottom: 2 }}>
                    <Button
                      variant="Outlined"
                      color="success"
                      style={{ background: "#ce93d8" }}
                      onClick={handleSubmit}
                    >
                      Consultar
                      <ArrowForwardIosIcon />
                    </Button>
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid xs={12}>
                  {/* <pre>{JSON.stringify(bin, null, 2)}</pre> */}
                  {ready && (
                    <TableAnswer answer={[bin]} />
                  )}
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}



const TableAnswer = ({ answer }) => {  
  const columns = Object.keys(answer[0] || {}).map((key) => ({
    name: key.toUpperCase(),
    selector: (row) => row[key],
    sortable: true,             
    wrap: true                  
  }));

  return (
    <DataTable
      columns={columns}
      data={answer}    
      // pagination    
      striped          
      highlightOnHover 
      responsive       
    />
  );
}
