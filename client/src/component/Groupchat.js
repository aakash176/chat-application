import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { RiAddBoxFill } from "react-icons/ri";
import { TextField } from '@mui/material';
import axios from 'axios';
import { ChatState } from '../Context';
import { TiDeleteOutline } from "react-icons/ti";
import { backend_api_url } from '../config';
import SearchedUser from './SearchedUser';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Groupchat() {
  const [groupUser, setgroupUser] = React.useState([])
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [users, setUsers] = React.useState([])
  const handleClose = () => {
    setOpen(false);
    setgroupUser([])
    setUsers([])
    
  }
  const [chatName, setChatName] = React.useState()
  const {user} = ChatState()
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const getUsers = async(e) => {
    setUsers([])
    const {data} = await axios.get(`${backend_api_url}/user/all-users?search=${e.target.value}`, config);
    if(e.target.value){
      setUsers(data)
    }

  }

  const handleRemoveUser = (g) => {
    let newgroupUser = groupUser.filter((u)=> u._id !== g._id)
    setgroupUser(newgroupUser)
    console.log(groupUser);
  }
  const handleChatName = (e) => {
    setChatName(e.target.value)
    console.log(chatName);
  }

  const handleAdduser = (u) => {
    setgroupUser([...groupUser, u])
    

  }

  return (
    <div>
      <Button onClick={handleOpen}>New group chat <RiAddBoxFill/> </Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create group chat
          </Typography>
          <TextField
            style={{width:'100%', margin: "10px", padding: "5px" }}
            onChange={(e) => handleChatName(e)}
            id="outlined-basic"
            label="Chat Name"
            variant="outlined"
            />
            <TextField
            onChange={(e) => getUsers(e)}
            style={{ margin: "10px", padding: "5px", width:'100%' }}
             label='Add Users'
            />
            <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(100px, 1fr))'}}>
              {
                groupUser && groupUser.length>0 && groupUser.map((g) => (
                  <div style={{display:'flex', alignItems:'center',justifyItems:'center' , borderRadius:'30px'}}>
                    <p style={{color:'purple'}}>{g.name}</p>
                    <TiDeleteOutline style={{cursor:'pointer'}} onClick={() => handleRemoveUser(g)}/>
                  </div>
                ))
              }
            </div>
            <div>
              {
                users &&
                users.length > 0 &&
                users.map((u) => 
                <div className='gchat-card' onClick={() => handleAdduser(u)} >
                  <img src={u.pic}/>
                  <span style={{margin:'10px'}} >{u.name}</span>
                
                </div>)
              }
            </div>
            <button style={{padding:'3px', float:'right'}}>Create Group</button>
        </Box>
      </Modal>
    </div>
  );
}