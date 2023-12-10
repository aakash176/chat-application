import { Button, Container, FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { backend_api_url } from '../config';
import axios from 'axios'
import { ChatState } from '../Context';
const Login = () => {
  const {selectedUser} = ChatState()
    const navigate = useNavigate();
    const {user,setUser} = ChatState()
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('')
    const handleShowPassClick = () => {
        setShowPassword(!showPassword)
    }
    const [email, setEmail] = useState('')
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
     
      if (userInfo) navigate("/chats");
    }, []);
    const handleClick = async() => {
      try{
        
        const body = {email, password}
        const {data} = await axios.post(`${backend_api_url}/user/login`, body);
        localStorage.setItem("userInfo", JSON.stringify(data))
        setUser(data)
        console.log("selectedUser", selectedUser);
        navigate('/chats')
      } catch(err){
        alert("invalid email or password!");
      }
    }

    const handlePassChange = (e) => {
        setPassword(e.target.value)
    }
    
    
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            background: "white",
            height: "60px",
            width: "100%",
            border: "1px solid aliceblue",
            textAlign:'center'
          }}
        >
          <h2>Chat APP</h2>
        </div>
        <FormControl
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            marginTop: "10px",
            background: "white",
            border: "1px solid aliceblue",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label
            style={{
              fontSize: "16px",
              fontWeight: "500",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            Email <span style={{ color: "red" }}>*</span>
          </label>
          <TextField
          onChange={(e) => handleEmailChange(e)}
            style={{ width: "80%" }}
            id="outlined-basic"
            label="enter email"
            variant="outlined"
          />
          <label
            style={{
              fontSize: "16px",
              fontWeight: "500",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            Password <span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            type={showPassword ? "text" : "password"}
            style={{ width: "80%" }}
            id="outlined-basic"
            onChange={(e) => handlePassChange(e)}
            label="Enter password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleShowPassClick}
                    edge="end"
                  >
                    {showPassword ? <Button>Hide</Button> : <Button>Show</Button>}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button onClick={handleClick} type="submit" style={{ marginTop: "10px" }} variant="contained">
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login