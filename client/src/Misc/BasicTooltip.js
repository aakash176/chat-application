import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function BasicTooltip({m}) {
  return (
    <Tooltip title={m.sender.name}>
      <img style={{width:'30px', height:'30px', borderRadius:'50%'}} src={m.sender.pic} />
    </Tooltip>
  );
}