import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backend_api_url } from '../config'
import { ChatState } from '../Context'
import SearchedUser from './SearchedUser'
import Loading from '../Misc/Loading'

import SingleChat from './SingleChat'
import Groupchat from './Groupchat'
const MyChat = () => {
  const {user, chats, setChats, selectedUser, setSelectedUser} = ChatState()
  const [btnClicked, setButtonClicked] = useState(false)
  const fetchChats = async() => {
    let config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const {data} = await axios.get(`${backend_api_url}/chats`, config);
    console.log('chat', data);
    console.log("selected user from mychat", selectedUser);
    setChats(data)
  }
  useEffect(() => {
    fetchChats()
  }, [])
  return (
    <div
      style={{
        width: "25%",
        background: "#E6E6FA",
        border: "1px solid purple",
        margin: "6px",
      }}
    >
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <p style={{fontSize:'26px', cursor:'pointer'}}>My Chats</p>
        <Groupchat />
      </div>
      {chats.length < 1 && <Loading />}
      {chats.map((c) => (
        <SingleChat chat={c.users[1]}  />
      ))}
      
    </div>
    
  );
}

export default MyChat