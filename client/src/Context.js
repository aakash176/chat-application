import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {backend_api_url} from './config'
import axios from "axios";
const chatContext = createContext()
const Context = ({children}) => {
    const navigate = useNavigate()
    const [selectedUser, setSelectedUser] = useState()
    const [user, setUser] = useState()
    const [chats, setChats] = useState([])
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if(userInfo){
            setUser(userInfo);
            // let config = {
            //   headers: {
            //     Authorization: `Bearer ${user.token}`,
            //   },
            // };
            
            // const {data} = axios.get(`${backend_api_url}/chats`, config)
            // setChats(data)

        }
        else{
            navigate('/')
        }
    }, [])
    return (
      <chatContext.Provider
        value={{
          user,
          setUser,
          chats,
          setChats,
          selectedUser,
          setSelectedUser,
        }}
      >
        {children}
      </chatContext.Provider>
    );
}

export const ChatState = () => { 
    return useContext(chatContext)
}
export default Context