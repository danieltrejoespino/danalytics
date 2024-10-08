
import DataTable,{ createTheme } from 'react-data-table-component';
import { useTheme } from '@mui/material/styles';

createTheme('lightTheme', {
  text: {
    primary: '#000000',
    secondary: '#2c2c2c',
  },
  background: {
    default: '#ffffff',
  },
  divider: {
    default: '#e0e0e0',
  },
});

createTheme('darkTheme', {
  text: {
    primary: '#EDEFF4',
    secondary: '#b9b9b9',
  },
  background: {
    default: '#3e5266',
  },
  divider: {
    default: '#444444',
  },
});

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


const columns = [
	{
		name: 'Title',
		selector: row => row.title,
		sortable: true,
	},
	{
		name: 'Year',
		selector: row => row.year,
		sortable: true,
	},
];

const data = [
  	{
		id: 1,
		title: 'Beetlejuice',
		year: '1988',
	},
	{
		id: 2,
		title: 'Ghostbusters',
		year: '1984',
	},
]


export default function SavingsBank() {
  const theme = useTheme();
  return (
    <DataTable
    columns={columns}
    data={data}
    expandableRows
    title="Top caja de ahorro"
    theme={theme.palette.mode === 'dark' ? 'darkTheme' : 'lightTheme'}
    expandableRowsComponent={ExpandedComponent}
  />
  )
}
