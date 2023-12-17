import React from 'react'
import { ChatState } from '../Context'
import SingleChatBox from './SingleChatBox';

const ChatBox = ({fetchAgain, setFetchAgain}) => {
  const {selectedUser} = ChatState()
  console.log('selectedUser', selectedUser);
  return (
    <div style={{width:"73%", background:'whiteSmoke', border:'1px solid black', margin:'5px'}}>
      {
        <SingleChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      }
    </div>
  )
}

export default ChatBox