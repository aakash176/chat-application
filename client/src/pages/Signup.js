import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios'
import { backend_api_url } from "../config";

const Signup = () => {
  const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confPass, setConfPass] = useState('')
    const [pic, setPic] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfPassword, setShowConfPassword] = useState(false)
  const navigate = useNavigate();
  const handleShowPassClick = () => {
    setShowPassword(!showPassword)
  }
  // const handleClickSnack = () => {
  //   setOpen(true);
  // }
  
  const handleShowConfPass = () => {
    setShowConfPassword(!showConfPassword)
  }
  const postDetails = (e) =>{

  }
  const handleClick = async() => {
    if(!email || !username || !password){
      alert("All Fields are mandatory")
    }
    if(password !== confPass){
      alert("Passwords do not match!")
      
    }
    else{
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }
      const { data } = await axios.post(`${backend_api_url}/user/register`, {email,password,name:username}, config);
      alert("Registration sucessful")
      window.location.reload()
    }
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
        <div
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
            style={{ width: "80%" }}
            id="outlined-basic"
            label="enter email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            style={{
              fontSize: "16px",
              fontWeight: "500",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            Username <span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            style={{ width: "80%" }}
            id="outlined-basic"
            label="enter username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
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
            label="Enter password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassClick} edge="end">
                    {showPassword ? (
                      <Button>Hide</Button>
                    ) : (
                      <Button>Show</Button>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <label
            style={{
              fontSize: "16px",
              fontWeight: "500",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            Confirm Password <span style={{ color: "red" }}>*</span>
          </label>
          <TextField
            type={showConfPassword ? "text" : "password"}
            onChange={(e) => setConfPass(e.target.value)}
            style={{ width: "80%" }}
            id="outlined-basic"
            label="Confirm password"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowConfPass} edge="end">
                    {showConfPassword ? (
                      <Button>Hide</Button>
                    ) : (
                      <Button>Show</Button>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <label
            style={{
              fontSize: "16px",
              fontWeight: "500",
              marginRight: "10px",
              marginTop: "10px",
            }}
          >
            Upload Profile picture
          </label>
          <TextField
            style={{ width: "80%" }}
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </div>
        <Button onClick={handleClick} type="submit" style={{ marginTop: "10px" }} variant="contained">
          Signup
        </Button>
      </div>
    </div>
  );
};

export default Signup;
