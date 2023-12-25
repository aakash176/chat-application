import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import BasicTooltip from '../Misc/BasicTooltip'
import { isLastMessage, isSameSender } from '../Misc/chatLogics'
import { ChatState } from '../Context'
const ScrolableChat = ({messages}) => {
    const {user} = ChatState()
  return (
    <ScrollableFeed>
        <div style={{}}>
            {messages && messages.map((m,i) => (
                <div style={{display:'flex'}} key={m._id} > 
                    {((isSameSender(messages,m,i, user.id) || (isLastMessage(messages,i,user.id)))&& (
                        <BasicTooltip m={m} />
                    ))}
                    <span style={{background:m.sender._id === user.id?'#BEE3F8':'#B9F5D0', maxWidth:'75%', borderRadius:'30px', padding:'4px 15px', marginLeft:m.sender._id === user.id?'69rem':'0px', marginTop:i>0&&messages[i-1].sender._id === m.sender._id?'10px':'0px'}}>{m.content}</span>
                </div>
            ))}

        </div>
        
    </ScrollableFeed>
  )
}

export default ScrolableChat