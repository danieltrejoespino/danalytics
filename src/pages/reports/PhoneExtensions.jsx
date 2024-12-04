import { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CustomBackdrop from "../utilities/CustomBackdrop";
import axios from "axios";
import DataTable from "react-data-table-component";
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

export default function PhoneExtensions() {
  const [openBackdrop, setOpenBackdrop] = useState(true);
  const [ready, setReady] = useState(false);
  const [phoneExt, setPhoneExt] = useState([]);

  useEffect(() => {
    const getExt = async () => {
      try {
        const ENDPOINT = URL + "general/getPhoneExtensions";
        const rspta = await axios.get(ENDPOINT, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(rspta.data);
        setPhoneExt(rspta.data);
        setReady(true);
      } catch (error) {
        console.log(error);
      } finally {
        setOpenBackdrop(false);
      }
    };
    getExt();
  }, []);

  const columns = Object.keys(phoneExt[0] || {}).map((key) => ({
    name: key.toUpperCase(),
    selector: (row) => row[key],
    sortable: true,
    wrap: true,
  }));

  return (
    <>
      <CustomBackdrop open={openBackdrop} text="Consultando datos" />

      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Item>


            <Grid container spacing={3}>
                <Grid xs={12}>
                <Typography
                variant="h6"
                gutterBottom
                // component="a"
                // href="https://bin-ip-checker.p.rapidapi.com"
                // target="_blank"
                // rel="noopener noreferrer"
              >
                Reporte de extensiones Impulse
              </Typography>
                </Grid>
              </Grid>



              <Grid container spacing={3}>
                <Grid xs={12}>
                  {/* <pre>{JSON.stringify(bin, null, 2)}</pre> */}
                  {ready && (
                    <DataTable
                      columns={columns}
                      data={phoneExt}
                      pagination
                      striped
                      highlightOnHover
                      fixedHeaderScrollHeight="800px"
                      fixedHeader
                      responsive
                    />
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
 