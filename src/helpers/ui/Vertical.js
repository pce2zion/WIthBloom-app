import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import {  Link } from 'react-router-dom'
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import classes from './Vertical.module.css';

const options = [
  'Convert',
  'Logout',
  
];

const ITEM_HEIGHT = 48;

export default function Vertical() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.vert}>
      <IconButton 
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        
        
      >
        <MoreVertIcon sx={{fontSize:"15px" }}/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '12ch',
            position:"relative",
            right:"500px"
          },
        }}
      >
        
          <MenuItem  onClick={handleClose}>
            <ul style={{listStyleType:"none",}}>
              <li style={{marginBottom:"10px"}}><Link style={{textDecoration:"none", color:"#133a39", fontSize:"12px" }} to={'/exchange'}>Convert</Link> </li>
              <li ><Link style={{textDecoration:"none", color:"#133a39", fontSize:"12px"}} to={'/'}>Logout</Link></li>
            </ul>
          
        
          </MenuItem>
      </Menu>
    </div>
  );
}