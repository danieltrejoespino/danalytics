import { useState, useEffect } from "react";
import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import CustomBackdrop from "../utilities/CustomBackdrop";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useTheme } from "@mui/material/styles";
import Item  from "../../components/ItemComponent";
const URL = import.meta.env.VITE_API_URL;




export default function IdApplications() {
  const [openBackdrop, setOpenBackdrop] = useState(true);
  const [ready, setReady] = useState(false);
  const [phoneExt, setPhoneExt] = useState([]);
  const [searchText, setSearchText] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const getExt = async () => {
      try {
        const ENDPOINT = URL + "general/getIpsApp";
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

  const paginationOptions = {
    rowsPerPageText: "Filas por página:",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };

const filteredData =
searchText.length === 0
  ? phoneExt
  : phoneExt.filter(
      (item) =>
        (item.NOMBRE_MOSTRAR &&
          item.NOMBRE_MOSTRAR.toString()
            .toLowerCase()
            .includes(searchText.toLowerCase())) ||
        (item.EXTENSION &&
          item.EXTENSION.toLowerCase().includes(searchText.toLowerCase())) ||
        (item.AREA &&
          item.AREA.toString()
            .toLowerCase()
            .includes(searchText.toLowerCase()))
    );

 



  return (
    <>
      <CustomBackdrop open={openBackdrop} text="Consultando datos" />

      <Box sx={{ width: "100%", flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Item>
              <Grid container spacing={3}>
                <Grid xs={6}>
                  <Typography
                    variant="h6"
                    gutterBottom
                  >
                    Aplicativos e IPs
                  </Typography>
                </Grid>
                <Grid xs={6}>
                  <TextField
                    label="Escribe algo para buscar"
                    variant="outlined"
                    fullWidth
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid xs={12}>
                  {ready && (
                    <DataTable
                      columns={columns}
                      data={filteredData}
                      // expandableRows
                      pagination
                      // title="Index 10"
                      theme={
                        theme.palette.mode === "dark"
                          ? "darkTheme"
                          : "lightTheme"
                      }
                      paginationComponentOptions={paginationOptions}
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
