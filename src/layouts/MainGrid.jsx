import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// import Sales from "../pages/reports/Sales";
// import Cancelled from "../pages/reports/Cancelled";
import ChatLayout from "../pages/Chat/ChatLayout";
import Utilities from "../pages/utilities/Utilities";
import SelectQuery from "../pages/selectDB/SelectQuery";

export default function MainGrid({selectedComponent}) {
  const data = [
    { idCom:1, name: "Chat", component: ChatLayout },
    { idCom:2, name: "Utilities", component: Utilities},
    { idCom:3, name: "Query", component: SelectQuery}
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
