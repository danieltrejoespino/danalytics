import { useEffect, useState } from "react";
import axios from "axios";

import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { enqueueSnackbar } from "notistack";

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

const ItemRespuesta = styled(Paper)(({ theme }) => ({
  backgroundColor: "#F5F6FA",
  ...theme.typography.body2,
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

  const handleSubmit = async () => {
    const url = "https://172.20.1.97:3009/api-serv/testOraQuery";
    const params = {
      query: ` ${query} `,
      campaign: "0",
    };
    try {
      const response = await axios.post(url, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.status);
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
      } else {
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
            </Typography>

            <Grid container spacing={3}>
              <Grid xs={12}>
                <Box sx={{ marginBottom: 2 }}>
                  <TextField
                    onChange={handleInputChange}
                    value={query}
                    fullWidth
                    label="Escribe o pega algo"
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ marginBottom: 2 }}>
                  <Button
                    onClick={handleSubmit}
                    variant="success"
                    style={{ background: "#ce93d8", width: "200px" }}
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
            {/* <pre style={{height: '200px',verflowY: "scroll"}} >{JSON.stringify(data, null, 2)}</pre> */}
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </ItemRespuesta>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SelectQuery;
