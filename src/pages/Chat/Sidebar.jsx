import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Paper } from '@mui/material';




const Sidebar = () => (
  <Paper elevation={3} style={{ height: '100vh', overflowY: 'auto', width: '200px' }}>
    <List>


      <ListItem >
        <ListItemAvatar>
          <Avatar src="path/to/avatar.jpg" />
        </ListItemAvatar>
        <ListItemText primary="Contact Name" secondary="Last message..." />
      </ListItem>


      <Divider variant="inset" component="li" />
    </List>
  </Paper>
);

export default Sidebar;
