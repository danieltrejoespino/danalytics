import MessageRender from "./MessageRender";
import ImageRender from "./ImageRender";
import FilesRender from "./FilesRender";
import { Paper, styled } from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#dbecfe',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minWidth: '200px',
  ...theme.applyStyles('dark', {
    backgroundColor: '#3e5266',
    color: '#EDEFF4'
  }),
}));



const TypeMessage = ({ data }) => {
  const sxProps = {
    my: 1,
    borderRadius: '10px',
    width: 'fit-content',
    ...(data.USERID !== 1 && { ml: 'auto' })
  };
  let CompToRender = null

  switch (data.TYPE) {
    case 'text':
      CompToRender = <MessageRender text={data} />
      break;
    case 'image':
      CompToRender = <ImageRender img={data} />
      break;
    default:
      CompToRender = <FilesRender file={data} />
      break;
  }

  return (
    <>
      <Item sx={sxProps}>
        {CompToRender}
      </Item>
    </>
  )
}


export default TypeMessage