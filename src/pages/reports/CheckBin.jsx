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

export default function CheckBin() {

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [ready, setReady] = useState(false);
  const [bin, setBin] = useState({});

  const [formValues, setFormValues] = useState({
    bin: "",
  });

  const handleDate = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setOpenBackdrop(true);
    const ENDPOINT = URL + "general/bin";
    let data = {
      bin: formValues.bin,
    };

    try {
      const response = await axios.post(ENDPOINT, data);

      if (response.data.code == 200) {
        // console.log(response.data.BIN)
        setBin (response.data.BIN)
      }

      setReady(true)
      setOpenBackdrop(false);
    } catch (error) {
      console.log(error);
    }
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
              {ready && (
                    <pre>{JSON.stringify(bin, null, 2)}</pre>
                  )}

            </Grid>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
// https://rapidapi.com/jfhe88/api/rfc-generator-mexico/playground/53aa317ee4b0f2c97546e929