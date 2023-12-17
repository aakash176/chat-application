import { Box, Modal, Typography } from '@mui/material';
import React from 'react'

const Profile = ({user, openModal, setOpenModal}) => {
    
    
    const handleCloseModal = () => setOpenModal(false);
    
      const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      };
  return (
    <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h3"
            style={{ textAlign: "center", padding: "5px", margin: "5px" }}
          >
            <b>{user.name}</b>
          </Typography>
          <img
            style={{
              height: "300px",
              width: "300px",
              borderRadius: "50%",
              marginLeft: "50px",
            }}
            src={user.pic}
          />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            style={{ textAlign: "center" }}
          >
            <b>Email</b>:{user.email}
          </Typography>
          <button
            onClick={handleCloseModal}
            style={{
              float: "right",
              cursor: "pointer",
              borderRadius: "30px",
            }}
          >
            close
          </button>
        </Box>
      </Modal>
  )
}

export default Profile