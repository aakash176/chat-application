import axios from 'axios';
import React, { useState } from 'react'
import { backend_api_url } from '../config';
import { ChatState } from '../Context';
import { useNavigate } from 'react-router';
import LeftDrawer from './LeftDrawer';
const SearchedUser = ({singleUser}) => {
  const {selectedUser, setSelectedUser} = ChatState()
  const fetchChats = async () => {
    let config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(`${backend_api_url}/chats`, config);
    console.log("chat", data);
    setChats(data);
  };
  const {chats, setChats,user} = ChatState()
  const [add, setAdd] = useState(false)
  const navigate = useNavigate()

  const saveChat = async() =>{
    console.log('chats', chats);
    let config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    let body = { userId: singleUser._id };
    const {data} = await axios.post(`${backend_api_url}/chats`,body, config)
    console.log(data);
    setSelectedUser(data.users[1])
    let isPresent = chats.map(c => c.users[1]._id===data.users[1]._id)
    console.log('isPresent', isPresent);
    if(isPresent.includes(true)){
      console.log("yes");
    }else{
      fetchChats()

    }
  }
  return (
    <div className='user-card' onClick={saveChat}>
      <img src={singleUser.pic}/>
      <span style={{margin:'10px'}} >{singleUser.name}</span>
      
    </div>
  );
}

export default SearchedUser