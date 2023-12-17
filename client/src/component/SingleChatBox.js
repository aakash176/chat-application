import React, { useState } from 'react'
import { ChatState } from '../Context'
import { IoEyeOutline } from "react-icons/io5";
import Profile from './Profile';
import GroupChatUpdate from './GroupChatUpdate';

const SingleChatBox = ({fetchAgain, setFetchAgain}) => {
    const {user, selectedUser} = ChatState()
    const [openModal, setOpenModal] = React.useState(false);
    const [secondOpenModal, setSecondOpenModal] = React.useState(false);
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
  return (
    <>
    {
        selectedUser?<>
        {
            !selectedUser.isGroupChat?<>
                    {
                      <>
                      <div style={{fontSize:'26px', marginLeft:'2rem', display:'flex', justifyContent:'space-between'}}>
                        {selectedUser.users[1].name}
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
        </>:(<p style={{fontSize:'26px', display:'flex', justifyContent:'center', marginTop:'30%'}}>Click on a user to start chatting</p>)
    }
    </>
  )
}

export default SingleChatBox