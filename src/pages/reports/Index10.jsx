import DataTable, { createTheme } from "react-data-table-component";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

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

createTheme("lightTheme", {
  text: {
    primary: "#000000",
    secondary: "#2c2c2c",
  },
  background: {
    default: "#F5F6FA",
  },
  divider: {
    default: "#e0e0e0",
  },
});

createTheme("darkTheme", {
  text: {
    primary: "#EDEFF4",
    secondary: "#b9b9b9",
  },
  background: {
    default: "#3e5266",
  },
  divider: {
    default: "#444444",
  },
});

const ExpandedComponent = ({ data }) => (
  <pre>{JSON.stringify(data, null, 2)}</pre>
);

const paginationOptions = {
  rowsPerPageText: "Filas por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

export default function Index10() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState({
    nomina:'',
    nombre:'',
    depa:''
  
  });

  const [searchData, setSearchData] = useState({
    fecha: "",
    specify: "",
    hora: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchText((prevState) => ({
      ...prevState,[name]: value }));

  };

  // const handleSearch = (e) => {
  //   setSearchData({ ...searchData, [e.target.name]: e.target.value });
  // };

  const columns = [
    {
      name: "CLAVE",
      selector: (row) => row.CLAVE,
      // selector: (row, index) => row.TOP <= 5 ? `${row.TOP} ⭐` : row.TOP,
      sortable: true,
      width: "100px",
    },
    {
      name: "NOMBRE",
      selector: (row) => row.NOMBRE,
      sortable: true,
    },
    {
      name: "APELLIDO_PATERNO",
      selector: (row) => row.APELLIDO_PATERNO,
      sortable: true,
    },
    {
      name: "APELLIDO_MATERNO",
      selector: (row) => row.APELLIDO_MATERNO,
      sortable: true,
    },
    {
      name: "FECHA_NAC",
      selector: (row) => row.FECHA_NAC,
      sortable: true,
    },
    {
      name: "NOMBRE_DEPARTAMENTO",
      selector: (row) => row.NOMBRE_DEPARTAMENTO,
      sortable: true,
    },
    {
      name: "EMPRESA",
      selector: (row) => row.EMPRESA,
      sortable: true,
      width: "150px",
    },
    {
      name: "EQUIPO",
      selector: (row) => row.EQUIPO,
      sortable: true,
    },
    {
      name: "HORA",
      selector: (row) => row.HORA,
      sortable: true,
    },
    {
      name: "FOTO",
      cell: (row) => (
        <img
          src={`https://172.20.1.79:9080/fotos/Fotos/${row.CLAVE}.jpg`}
          alt={row.CLAVE}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          // onClick={() => handleImageClick(row.NOMINA)}
        />
      ),
      ignoreRowClick: false,
      allowOverflow: true,
      button: true,
    },
  ];

  const params = {
    campaign: "1",
    nameProcedure: "SPS_INFO",
    parameters: {
      fecha: searchData.fecha,
      specify: searchData.specify,
      hora: searchData.hora,
      access: "",
    },
  };

  const theme = useTheme();
  useEffect(() => {
    axios
      .post("https://172.20.1.97:3009/api-serv/testOraProcedure", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        // console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredData = data.filter((item) => {
    const matchesNomina =
      searchText.nomina.length === 0 || 
      (item.CLAVE && item.CLAVE.toString().toLowerCase().includes(searchText.nomina.toLowerCase()));
  
    const matchesNombre =
      searchText.nombre.length === 0 || 
      ((item.NOMBRE && item.NOMBRE.toLowerCase().includes(searchText.nombre.toLowerCase())) ||
      (item.APELLIDO_PATERNO && item.APELLIDO_PATERNO.toString().toLowerCase().includes(searchText.nombre.toLowerCase())) ||
      (item.APELLIDO_MATERNO && item.APELLIDO_MATERNO.toString().toLowerCase().includes(searchText.nombre.toLowerCase())));
  
    const matchesDepartamento =
      searchText.depa.length === 0 || 
      (item.NOMBRE_DEPARTAMENTO && item.NOMBRE_DEPARTAMENTO.toString().toLowerCase().includes(searchText.depa.toLowerCase()));
  
    return matchesNomina && matchesNombre && matchesDepartamento;
  });

  return (
    <>
      <Box sx={{ width: "100%", flexGrow: 1, marginBottom: 2 }}>
        <Item>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid xs={4} display="flex" justifyContent="center">
                <TextField
                label="Buscar por Nomina"
                variant="outlined"
                name="nomina"
                fullWidth
                value={searchText.nomina}
                onChange={handleChange}
              />
                </Grid>
                <Grid xs={4} display="flex" justifyContent="center">
                <TextField
                label="Buscar por Nombre"
                variant="outlined"
                name="nombre"
                fullWidth
                value={searchText.nombre}
                onChange={handleChange}
              />
                </Grid>
                <Grid xs={4} display="flex" justifyContent="center">
                <TextField
                label="Buscar por Departamento"
                variant="outlined"
                name="depa"
                fullWidth
                value={searchText.depa}
                onChange={handleChange}
              />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Item>
      </Box>

      <DataTable
        columns={columns}
        data={filteredData}
        expandableRows
        pagination
        // title="Index 10"
        theme={theme.palette.mode === "dark" ? "darkTheme" : "lightTheme"}
        expandableRowsComponent={ExpandedComponent}
        paginationComponentOptions={paginationOptions}
        fixedHeaderScrollHeight="800px"
        fixedHeader
        responsive
      />
    </>
  );
}
