import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { enqueueSnackbar } from "notistack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";

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

const ReEtiquetadoCitiBanco = () => {
  const [formValues, setFormValues] = useState({
    date1: '',
    date2: '',
  });

  const handleDate = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  

  return (
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
              Re etiquetado CITI BANCO
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
              <Grid xs={6}>
                <Box sx={{ marginBottom: 2 }}>
                  <Button
                    variant="Outlined"
                    color="success"
                    style={{ background: "#ce93d8", width: "400px" }}
                  >
                    Consultar
                    <SearchIcon />
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReEtiquetadoCitiBanco;
