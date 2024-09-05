import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import Sales from "../pages/reports/Sales";
import Cancelled from "../pages/reports/Cancelled";

export default function MainGrid({selectedComponent}) {
  

  const data = [
    { idCom:1, name: "Ventas", component: Sales, icon: AttachMoneyIcon },
    { idCom:2, name: "Ventas Canceladas", component: Cancelled, icon: AttachMoneyIcon },
    // { idCom:3, name: "Ventas Validadas", component: Validadas, icon: AttachMoneyIcon },
  ]
  const selectedData = data.find((item) => item.idCom === selectedComponent);

  const ComponentToRender = selectedData ? selectedData.component : null;

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
      {selectedComponent}
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {ComponentToRender && <ComponentToRender />} {}

      </Grid>
    </Box>
  );
}
