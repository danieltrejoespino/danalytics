import Grid from "@mui/material/Unstable_Grid2";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";



export default function ChatLayout() {
  return (
    <Grid container spacing={2}>
      <Grid>
        <Sidebar/>
      </Grid>

      <Grid xs>
        <ChatWindow/>
      </Grid>
    </Grid>
  )
}
