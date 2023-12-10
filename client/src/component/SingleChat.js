import React from 'react'
import { ChatState } from '../Context'

const SingleChat = ({chat}) => {
  const {selectedUser, setSelectedUser} = ChatState()
  const handleClick = () => {
    setSelectedUser(chat)
    console.log("selectedUser from chat", selectedUser);

  }
  return (
    <div className='single-chat' style={{background:selectedUser._id === chat._id? 'green':''}} onClick={handleClick}>
        <img src={chat.pic}/>
        <span style={{margin:'10px', fontWeight:'600'}}>{chat.name}</span>
    </div>
  )
}

export default SingleChat