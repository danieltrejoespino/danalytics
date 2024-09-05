import * as React from 'react';
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Select, { selectClasses } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent ({setActionMenu }) {
  
  const [company, setCompany] = React.useState(1);

  const handleChange = (event) => {
    console.log(event.target.value);
    setCompany(event.target.value);
    setActionMenu(event.target.value); 
  };


  return (
    <Select
      labelId="company-select"
      id="company-simple-select"
      value={company}
      onChange={handleChange}
      displayEmpty
      inputProps={{ 'aria-label': 'Select company' }}
      fullWidth
      sx={{
        maxHeight: 56,
        width: 215,
        '&.MuiList-root': {
          p: '8px',
        },
        [`& .${selectClasses.select}`]: {
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          pl: 1,
        },
      }}
    >
      <ListSubheader sx={{ pt: 0 }}>Reportes</ListSubheader>
      <MenuItem value={1}>
        <ListItemAvatar>
          <Avatar alt="Sitemark web">
            <StorageIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Conn production" secondary="Conn dbo" />
      </MenuItem>
      <Divider sx={{ mx: -1 }} />
      <ListSubheader>Procesos</ListSubheader>
      <MenuItem value={2}>
        <ListItemAvatar>
          <Avatar alt="Sitemark Store">
            <CodeIcon sx={{ fontSize: '1rem' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Conn developer" secondary="Conn dbo" />
      </MenuItem>            
    </Select>
  );
}
