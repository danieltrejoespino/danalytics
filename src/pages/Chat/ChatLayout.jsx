import { useState, useEffect, useRef,useContext } from 'react';

import Grid from "@mui/material/Unstable_Grid2";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";


const rooms = [
  {
    ID: "1",
    NAME: "DSA"
  },
  {
    ID: "2",
    NAME: "Dani"
  },
  {
    ID: "3",
    NAME: "Cris"
  },
  {
    ID: "4",
    NAME: "Jorge"
  },
  {
    ID: "5",
    NAME: "Luis"
  },
  {
    ID: "6",
    NAME: "Marco"
  },
]


export default function ChatLayout() {

  const [selectRoom, setSelectRoom] = useState('')
  const [selectedRoomDetails, setSelectedRoomDetails] = useState({});

useEffect(()=>{
  const selectedRoom = rooms.find(room => room.ID === selectRoom);
  setSelectedRoomDetails(selectedRoom || {});
},[selectRoom])

  return (
    <Grid container spacing={2}>
      <Grid>
        <Sidebar rooms={rooms} setSelectRoom={setSelectRoom} />
      </Grid>

      {selectRoom && (
        <Grid xs>
          <ChatWindow room={selectRoom} 
          nameRoom={selectedRoomDetails.NAME || 'Room'}

          />
        </Grid>
      )}


    </Grid>
  )
}


