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

export default function SavingsBank() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const params = {
    query: ` 
    WITH 
    c1 AS (
        SELECT
            usuario_id,
            cantidad
        FROM asistencia.caja_ahorros
        WHERE concepto LIKE '%Ahorro al%' ),
        
    fechas_actuales AS ( 
        SELECT MAX(fecha2) AS fecha, substr(concepto, 1, 8) AS concepto
        FROM asistencia.caja_ahorros
        WHERE ( concepto LIKE '%Ahorro Q%' OR concepto LIKE '%Ahorro S%' )
        GROUP BY substr(concepto, 1, 8) ), 
    c2 AS (
            SELECT
        r.usuario_id,
        r.cantidad,
        ROW_NUMBER()
        OVER(PARTITION BY usuario_id
        ORDER BY
        fecha2 DESC
        ) AS rn
        FROM
        asistencia.caja_ahorros r
        JOIN fechas_actuales fa ON fa.concepto = substr(r.concepto, 1, 8)
        AND fa.fecha = r.fecha2
        WHERE
        r.concepto LIKE '%Ahorro Q%'
        OR r.concepto LIKE '%Ahorro S%'
        ), c3 AS (
        SELECT
        usuario_id,
        SUM(cantidad) AS cantidad
        FROM
        asistencia.caja_ahorros c3
        GROUP BY
        usuario_id
        )
        SELECT
        ROW_NUMBER() OVER( ORDER BY c3.cantidad DESC) AS TOP,
        c3.USUARIO_ID NOMINA,
        u.nombre
        || ' '
        || u.apellido_paterno
        || ' '
        || u.apellido_materno AS NOMBRE,
        c1.cantidad           AS HASTA_CORTE,
        nvl(c2.cantidad, 0)   AS AHORRO_S_Q,
        c3.cantidad           AHORRO_TOTAL
        FROM
        c3
        LEFT JOIN c2 ON c2.usuario_id = c3.usuario_id
        AND c2.rn = 1
        LEFT JOIN c1 ON c3.usuario_id = c1.usuario_id
        JOIN asistencia.usuarios u ON u.id_usuario = c3.usuario_id
        WHERE u.status_id = 1   
        GROUP BY
        c3.usuario_id, u.nombre  || ' '   || u.apellido_paterno || ' ' || u.apellido_materno, c1.cantidad,  c2.cantidad, c3.cantidad
        ORDER BY 6 DESC `,
    campaign: "0",
  };

  const columns = [
    {
      name: "TOP",
      // selector: (row) => row.TOP,
      selector: (row, index) => (row.TOP <= 5 ? `${row.TOP} ⭐` : row.TOP),
      sortable: true,
      width: "100px",
    },
    {
      name: "NOMINA",
      selector: (row) => row.NOMINA,
      sortable: true,
      width: "100px",
    },
    {
      name: "NOMBRE",
      selector: (row) => row.NOMBRE,
      sortable: true,
    },
    {
      name: "HASTA_CORTE",
      selector: (row) => `$ ${row.HASTA_CORTE}`,
      sortable: true,
    },
    {
      name: "AHORRO_S_Q",
      // selector: (row) => row.AHORRO_S_Q,
      selector: (row) => `$ ${row.AHORRO_S_Q}`,
      sortable: true,
    },
    {
      name: "AHORRO_TOTAL",
      selector: (row) => `$ ${row.AHORRO_TOTAL}`,
      sortable: true,
    },
    {
      name: "FOTO",
      cell: (row) => (
        <img
          src={`https://172.20.1.79:9080/fotos/Fotos/${row.NOMINA}.jpg`}
          alt={row.NOMINA}
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

  const theme = useTheme();
  useEffect(() => {
    axios
      .post("https://172.20.1.97:3009/api-serv/testOraQuery", params, {
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

  const filteredData =
    searchText.length === 0
      ? data
      : data.filter(
          (item) =>
            (item.NOMINA &&
              item.NOMINA.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (item.NOMBRE &&
              item.NOMBRE.toLowerCase().includes(searchText.toLowerCase())) ||
            (item.HASTA_CORTE &&
              item.HASTA_CORTE.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (item.AHORRO_S_Q &&
              item.AHORRO_S_Q.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (item.AHORRO_TOTAL &&
              item.AHORRO_TOTAL.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase()))
        );

  return (
    <>
      <Box sx={{ width: "100%", flexGrow: 1, marginBottom: 2 }}>
        <Item>
          <Typography variant="h5" gutterBottom>
            Top caja de ahorro
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={6}>
              <TextField
                label="Escribe algo para buscar"
                variant="outlined"
                fullWidth
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Grid>
            <Grid xs={6}>
            {/* dd */}
            </Grid>
          </Grid>
        </Item>
      </Box>

      <DataTable
        columns={columns}
        data={filteredData}
        expandableRows
        pagination
        // title="Top caja de ahorro"
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
