import React, { useState } from 'react'
import { Box, Modal, TextField, Typography } from '@mui/material';
import { ChatState } from '../Context';
import { TiDeleteOutline } from "react-icons/ti";
import axios from 'axios';
import { backend_api_url } from '../config';
const GroupChatUpdate = ({chat, openModal, setOpenModal, fetchAgain, setFetchAgain}) => {
    const {selectedUser, setSelectedUser} = ChatState()
    const handleCloseModal = () => setOpenModal(false);
    const [chatName, setChatName] = useState()
    const {user} = ChatState()
    const [users, setUsers] = React.useState([])
    const [groupMember, setGroupMember] = useState(chat.users.filter((u) => u._id != user.id))
    // let groupMem = chat.users.filter((u) => u._id != user.id)
    // setGroupMember(groupMem)
    
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    };
    const handleRemoveUser = (g) => {
        let newgroupUser = groupMember.filter((u)=> u._id !== g._id)
        setGroupMember(newgroupUser)
        
    }

    const handleUpdateMemberClick = async() => {
      if(groupMember.length < 2){
        alert("Group must have minimun 3 members including you")
        return
      }
      else{
        let config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        
        const {data} = await axios.put(`${backend_api_url}/chats/update-users`,{_id:selectedUser._id, users:groupMember}, config)
        alert("Group updated")
        setFetchAgain(!fetchAgain)
        setSelectedUser(data)
        handleCloseModal()
        
      }
    }

    const handleLeaveGroup = async() => {

      console.log("inside handle group function");
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.put(`${backend_api_url}/chats/leave`,{_id:selectedUser._id, users:groupMember}, config)
      setSelectedUser(null)
      setFetchAgain(!fetchAgain)
      handleCloseModal()
      alert("You left group")

    }
    const handleUpdateClick = async() => {
        if(!chatName){
            return
        }
        else{
            let config = {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
            };
            const {data} = await axios.put(`${backend_api_url}/chats/rename`, {_id:selectedUser._id, chatName:chatName}, config)
            setSelectedUser(data)
            setFetchAgain(!fetchAgain)
            handleCloseModal()


        }
    }
    const handleChatName = (e) => {
        setChatName(e.target.value)
    }

    const handleAdduser = (u) => {
        if(groupMember.includes(u)){
          alert("User already added")
        }
        else{
          
          setGroupMember([...groupMember, u])
        }
        
    
    }

    const getUsers = async(e) => {
        const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
        setUsers([])
        const {data} = await axios.get(`${backend_api_url}/user/all-users?search=${e.target.value}`, config);
        if(e.target.value){
          setUsers(data)
        }
    
      }
  return (
    <div>
        <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <button
            onClick={handleCloseModal}
            style={{
              float: "right",
              cursor: "pointer",
              borderRadius: "30px",
              background:'#38B2AC',
              color:'white',
              float:'right'
            }}
          >
            close
          </button>
         <h3>{chat.chatName}</h3>
         <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(100px, 1fr))'}}>
              {
                groupMember.map((g) => (
                  <div style={{display:'flex', alignItems:'center',justifyItems:'center' , borderRadius:'30px'}}>
                    <p style={{color:'purple'}}>{g.name}</p>
                    <TiDeleteOutline style={{cursor:'pointer',display:user.id===selectedUser.groupAdmin._id?"block":'none'}} onClick={() => handleRemoveUser(g)}/>
                  </div>
                ))
              }
              <button className='updateBtn' style={{height:'40px', marginTop:'1rem', background:'#38B2AC', color:'white', fontWeight:'500', cursor:'pointer', display:user.id===selectedUser.groupAdmin._id?"block":'none'}} onClick={handleUpdateMemberClick}>Update Members</button>
          </div>
          <div style={{display:'flex'}}>
              <TextField
              style={{width:'100%', margin: "10px", padding: "5px" }}
              onChange={(e) => handleChatName(e)}
              id="outlined-basic"
              label="Chat Name"
              variant="outlined"
              />
              <button className='updateBtn' style={{height:'40px', marginTop:'1rem', background:'#38B2AC', color:'white', fontWeight:'500', cursor:'pointer'}} onClick={handleUpdateClick}>Update</button>
          </div>
            
            <TextField
            onChange={(e) => getUsers(e)}
            style={{ margin: "10px", padding: "5px", width:'100%', display:user.id===selectedUser.groupAdmin._id?"block":'none' }}
             label='Add Users'
            />
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
            <button className='updateBtn' style={{ background:'red', border:'none',padding:'5px', margin:'5px', color:'white', fontWeight:'500', float:'right', display:user.id===selectedUser.groupAdmin._id?"none":'block', cursor:'pointer'}} onClick={handleLeaveGroup}>Leave Group</button>
         
        </Box>
      </Modal>
    </div>
  )
}

export default GroupChatUpdate