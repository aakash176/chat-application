import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context'
import { IoEyeOutline } from "react-icons/io5";
import Profile from './Profile';
import GroupChatUpdate from './GroupChatUpdate';
import { Box, TextField } from '@mui/material';
import axios from 'axios';
import { backend_api_url } from '../config';
import Loading from '../Misc/Loading'
import ScrolableChat from './ScrolableChat';
import io from 'socket.io-client'
const ENDPOINT = 'http://localhost:5000'
let socket, selectedChatCompare
const SingleChatBox = ({fetchAgain, setFetchAgain}) => {
    const [newMessage, setNewMessage] = useState('')
    const {user, selectedUser} = ChatState()
    const [socketConnected, setSocketConnected] = useState(false)
    const [messages, setMessages] = useState([])
    const [openModal, setOpenModal] = React.useState(false);
    const [secondOpenModal, setSecondOpenModal] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const handleEyeClick = (e) => {
      console.log(selectedUser.users[1]);
      setOpenModal(true)
      e.stopPropagation()
    }
    const handleSecondEyeClick = (e) => {
      console.log(selectedUser);
      setSecondOpenModal(true)
      e.stopPropagation()
    }

    const fetchMessages = async () => {
      if(!selectedUser) return

      try {
        setLoading(true)
        let config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const {data} = await axios.get(`${backend_api_url}/messages/${selectedUser._id}`, config)
        setMessages(data)
        setLoading(false)
        socket.emit('join chat', selectedUser._id)
      } catch (error) {
        alert("Something wrong happened while fetching messages!")
      }
    }
    useEffect(()=>{
      socket = io(ENDPOINT)
      socket.emit('setup', user)
      socket.on('connected', ()=>setSocketConnected(true))
      socket.on('typing', () => setIsTyping(true))
      socket.on('stop typing', () => setIsTyping(false))
    }, [])

    useEffect(() => {
      socket.on("message recieved", (newMessageRecieved) => {
        if (
          !selectedChatCompare || // if chat is not selected or doesn't match current chat
          selectedChatCompare._id !== newMessageRecieved.chat._id
        ) {
          // if (!notification.includes(newMessageRecieved)) {
          //   setNotification([newMessageRecieved, ...notification]);
          //   setFetchAgain(!fetchAgain);
          // }
        } else {
          setMessages([...messages, newMessageRecieved]);
        }
      });
    });

    useEffect(() => {
      fetchMessages()
      selectedChatCompare = selectedUser
    },[selectedUser])

    const typingHandler = (e) => {
      setNewMessage(e.target.value)
      if(!socketConnected) return
      if (!typing) {
        setTyping(true);
        socket.emit("typing", selectedUser._id);
      }
      let lastTypingTime = new Date().getTime();
      var timerLength = 3000;
      setTimeout(() => {
        var timeNow = new Date().getTime();
        var timeDiff = timeNow - lastTypingTime;
        if (timeDiff >= timerLength && typing) {
          socket.emit("stop typing", selectedUser._id);
          setTyping(false);
        }
      }, timerLength);


    }
    const handleSendMessage = async(e) => {
      
      if(e.key==='Enter' && newMessage){
        socket.emit("stop typing", selectedUser._id);
        let config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        let body = {content:newMessage, chatId:selectedUser._id}
        setNewMessage('')
        const {data} = await axios.post(`${backend_api_url}/messages`, body, config )
        socket.emit("new message", data);
        setMessages([...messages, data]);

      }
    }
  return (
    <>
    {
        selectedUser?
        <>
        
         {

          <div style={{padding:'5px'}}>
          {
            !selectedUser.isGroupChat?
            <>
              {
                <>
                    <div style={{fontSize:'26px', marginLeft:'2rem', display:'flex', justifyContent:'space-between'}}>
                      {selectedUser.users[0]._id === user.id?selectedUser.users[1].name:selectedUser.users[0].name}
                      <IoEyeOutline onClick={(e) => handleEyeClick(e)}/>
                    </div> 
                    <div>
                      {
                        openModal && <Profile user={selectedUser.users[1]} openModal={openModal} setOpenModal={setOpenModal} />
                      }
                    </div>
                </>
              }
            </>:
            (<>
              <div style={{marginLeft:'2rem', fontSize:'24px', display:'flex', justifyContent:'space-between'}}>
                {selectedUser.chatName.toUpperCase()}
                <IoEyeOutline onClick={(e) => handleSecondEyeClick(e)} />
              </div>
              <div>
                {
                  secondOpenModal && <GroupChatUpdate fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} chat={selectedUser} openModal={secondOpenModal} setOpenModal={setSecondOpenModal} />
                }
              </div>
            </>)
              

          }
          </div>
         }
        <Box sx={{display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:3, background:'#E8E8E8', overflow:'hidden', maxWidth:'100%', maxHeight:'100%'}} >
          <div onKeyDown={handleSendMessage}>
              {
                loading?<Loading/>:(
                  <div className='messages'>
                    <ScrolableChat messages={messages} />
                    
                  </div>
                )
              }
              {istyping ? (
                <div>
                  Typing....
                </div>
              ) : (
                <></>
              )}
              <TextField fullWidth type='text' id="outlined-basic" variant='outlined' onChange={(e) => typingHandler(e)} value={newMessage} label="Enter message" style={{ background:'white', zIndex:'1', border:'black'}} />
            </div>
        </Box>
        </>:(<p style={{fontSize:'26px', display:'flex', justifyContent:'center', marginTop:'30%'}}>Click on a user to start chatting</p>)
    }
    </>
  )
}

export default SingleChatBox