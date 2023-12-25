import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backend_api_url } from '../config'
import { ChatState } from '../Context'
import SideDrawer from './SideDrawer'
import ChatBox from './ChatBox'
import MyChat from './MyChat'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router'

const Chats = () => {
    const navigate = useNavigate()
    const [fetchAgain, setFetchAgain] = useState(false)
    const {user} = ChatState()
    
  return (
    <div style={{width:'100%'}}>
        {user && <SideDrawer setFetchAgain={setFetchAgain} fetchAgain={fetchAgain} />}
        <Box style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', height:'92vh'}}>
            {user && <MyChat fetchAgain={fetchAgain}/>}
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
        </Box>
    </div>
  )
}

export default Chats