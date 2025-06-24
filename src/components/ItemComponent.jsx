import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#F5F6FA",
    // height: "400px",
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


  export default Item