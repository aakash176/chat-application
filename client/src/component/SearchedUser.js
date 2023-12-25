import axios from 'axios';
import React, { useState } from 'react'
import { backend_api_url } from '../config';
import { ChatState } from '../Context';
import { useNavigate } from 'react-router';
import LeftDrawer from './LeftDrawer';
const SearchedUser = ({singleUser,setFetchAgain, fetchAgain}) => {
  const {selectedUser, setSelectedUser} = ChatState()
  const {chats, setChats,user} = ChatState()
  

  const saveChat = async() =>{
    console.log('chats', chats);
    let config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    let body = { userId: singleUser._id };
    const {data} = await axios.post(`${backend_api_url}/chats`,body, config)
    
    setFetchAgain(!fetchAgain)
    setSelectedUser(data)
    
  }
  return (
    <div className='user-card' onClick={saveChat}>
      <img src={singleUser.pic}/>
      <span style={{margin:'10px'}} >{singleUser.name}</span>
      
    </div>
  );
}

export default SearchedUser