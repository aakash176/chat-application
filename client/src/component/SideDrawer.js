import { Title } from '@mui/icons-material';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import React, { useState } from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import BasicMenu from './BasicMenu';
import LeftDrawer from './LeftDrawer';
const SideDrawer = () => {
    const [search, setSearch] = useState(false)
    const handleSearch = (e) => {
        e.stopPropagation()
        setSearch(true)
    }
  return (
    <div>
      <Box
        style={{
          background: "white",
          padding: "2px",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderWidth: "5px",
        }}
      >
        <Tooltip title="Search users">
          <IconButton>
            <Button onClick={(e) => handleSearch(e)}
              style={{
                border: "1px solid black",
                fontSize: "20px",
                color: "black",
              }}
            >
              <AiOutlineSearch />
            </Button>
          </IconButton>
        </Tooltip>
        <h3>Chat App</h3>
        <BasicMenu style={{ paddingRight: "5px" }} />
        {search && <LeftDrawer open={search} setOpen={setSearch} />}
      </Box>
    </div>
  );
}

export default SideDrawer