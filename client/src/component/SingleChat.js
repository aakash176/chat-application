import React from 'react'
import { ChatState } from '../Context'

const SingleChat = ({chat}) => {
  const {selectedUser, setSelectedUser, user} = ChatState()
  const handleClick = () => {
    setSelectedUser(chat)
    console.log("selectedUser from chat", selectedUser);

  }
  return (
    <div className='single-chat' style={{background:selectedUser && selectedUser._id === chat._id? '#a9dfbf':''}} onClick={handleClick}>
      {
        chat.isGroupChat == true? (
          <span style={{margin:'10px', fontWeight:'400'}}>{chat.chatName}</span>
        ):(
          <>
            <img src={chat.users[1].pic}/>
            <span style={{margin:'10px', fontWeight:'400'}}>{chat.users[0]._id === user.id?chat.users[1].name:chat.users[0].name}</span>
          
          </>
        )
      }
    </div>
  )
}

export default SingleChat