import React from 'react'
import { ChatState } from '../Context'

const ChatBox = () => {
  const {selectedUser} = ChatState()
  return (
    <div style={{width:"73%", background:'white', border:'1px solid black', margin:'5px'}}>
      {selectedUser.name}
      </div>
  )
}

export default ChatBox