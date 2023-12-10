import { Box, Tab, Typography } from '@mui/material';
import Tabs  from "@mui/material/Tabs";
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import  PropTypes  from 'prop-types';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import { ChatState } from '../Context';
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Homepage() {
  const {user} = ChatState()
  const navigate = useNavigate()
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log('user', user);
    
    if(userInfo) navigate('/chats')
  }, [])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        background: "aliceblue",
        height: "100vh",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Sign Up" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} style={{ width: "33%" }}>
        <Login />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} style={{ width: "33%" }}>
        <Signup />
      </CustomTabPanel>
    </Box>
  );
}