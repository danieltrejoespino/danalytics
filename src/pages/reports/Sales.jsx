import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Unstable_Grid2";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TableComponent from "../../components/TableComponent";
import TextField from '@mui/material/TextField';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F5F6FA',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Sales = () => {
  return (
    <Grid container spacing={2} >
      <Grid xs={12}>
        <Typography variant="h5" gutterBottom>
          Reporte de ventas
        </Typography>
      </Grid>
      <Grid xs={6}>
        <Grid container spacing={2} >
          <Grid xs={4}>
            <Item>
              <TextField id="outlined-basic" label="Fecha " variant="standard" />
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>
              <TextField id="outlined-basic" label="Fecha 2" variant="standard" />
            </Item>
          </Grid>
          <Grid xs={4}>
            <Item>
              <Button variant="outlined" startIcon={<SearchIcon />}>
                Generar
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Item>xs=8
        <TableComponent/>
        </Item>
      </Grid>
    </Grid>
  );
};

export default Sales;
