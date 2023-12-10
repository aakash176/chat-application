import { Box, Divider, Drawer, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import List from "@mui/material/List";
import axios from 'axios';
import React, { useState } from 'react'
import { backend_api_url } from '../config';
import { ChatState } from '../Context';
import SearchedUser from './SearchedUser';
import Loading from '../Misc/Loading';


const LeftDrawer = ({open, setOpen}) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const {user} = ChatState()
  const anchor = 'left'
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const getUsers = async(e) => {
    setLoading(true)
    setUsers([])
    const {data} = await axios.get(`${backend_api_url}/user/all-users?search=${e.target.value}`, config);
    if(e.target.value){
      setUsers(data)
    }
    setLoading(false)
  }
  const toggleDrawer = () => (event) => {
    if (event.type === "keydown" &&(event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setOpen(false);
  };
  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <TextField
        onChange={(e) => getUsers(e)}
        style={{ margin: "10px", padding: "5px" }}
        id="outlined-basic"
        label="Search Users"
        variant="outlined"
      />
      <div>
        {users &&
          users.length > 0 &&
          users.map((u) => <SearchedUser singleUser={u} />)}
      </div>
      {loading && <Loading />}
    </Box>
  );
  return (
    <div>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
      
    </div>
  );
}

export default LeftDrawer