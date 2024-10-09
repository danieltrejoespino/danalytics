import { useState, useEffect, useRef,useContext } from 'react';

import Grid from "@mui/material/Unstable_Grid2";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";


const rooms = [
  {
    ID: "123",
    NAME: "DSA"
  },
  {
    ID: "124",
    NAME: "Dani"
  },
]


export default function ChatLayout() {

  const [selectRoom, setSelectRoom] = useState('')

  return (
    <Grid container spacing={2}>
      <Grid>
        <Sidebar rooms={rooms} setSelectRoom={setSelectRoom} />
      </Grid>

      {selectRoom && (
        <Grid xs>
          <ChatWindow room={selectRoom} />
        </Grid>
      )}


    </Grid>
  )
}


