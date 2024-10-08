import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import ChatLayout from "../pages/Chat/ChatLayout";
import Utilities from "../pages/utilities/Utilities";
import SelectQuery from "../pages/selectDB/SelectQuery";
import SavingsBank from "../pages/reports/SavingsBank";
import Index10 from "../pages/reports/Index10";

export default function MainGrid({selectedComponent}) {
  const data = [
    { idCom:1, name: "Chat", component: ChatLayout },
    { idCom:2, name: "Utilidades", component: Utilities},
    { idCom:3, name: "Query", component: SelectQuery},
    { idCom:4, name: "Caja de ahorro", component: SavingsBank},
    { idCom:5, name: "Index10", component: Index10}
  ];
  const selectedData = data.find((item) => item.idCom === selectedComponent);
  const ComponentToRender = selectedData ? selectedData.component : null;

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {ComponentToRender && (
          <Grid xs={12}>
            <ComponentToRender />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
