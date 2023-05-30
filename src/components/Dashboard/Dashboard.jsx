import AllInboxRoundedIcon from '@mui/icons-material/AllInboxRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import HouseSidingRoundedIcon from '@mui/icons-material/HouseSidingRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { Goals } from '../Goals/Goals';
import Home from '../Home/Home';
import { Inbox } from '../Inbox/Inbox';
import MyTasks from '../MyTasks/MyTasks';
import './Dashboard.css';
const drawerWidth = 240;
const Dashboard = () => {
  const[option,setOption] = useState('');
    const navigate = useNavigate();
    const[isAuthenticated,setIsAuthenticated] = useState("");
    const logout =()=>{
        signOut(auth);

    }
    
    const auth = getAuth();
    const user = auth.currentUser;
    const [currentUser,setCurrentUser] = useState();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        
        localStorage.setItem('user',JSON.stringify(user.providerData[0]));
        
      } else {
       console.log('user signed out')
       setIsAuthenticated(false);
      }
    });
    
  
   if(!isAuthenticated) navigate('/login')
   else return (
    <>
     <Box sx={{ display: 'flex', }}>
      <CssBaseline />
      

      
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
         <div style={{marginLeft:5}} className='d-flex align-items-center p-2'>
        <img src={logo} /> 
        <Typography sx={{fontFamily:'Montserrat',fontWeight: 600 }} className='logotxt'>FocusFlow</Typography>
        </div>
        <List className='mt-3' sx={{fontFamily:'Montserrat'}}>
          {['Home', 'MyTasks', 'Inbox', 'Goals'].map((text, index) => (
            <ListItem key={text} disablePadding>
               
              
            
              <ListItemButton onClick={()=>{navigate(`/${text.toLowerCase()}`)}} >
              
                <ListItemIcon >
                    {index === 0 ?<HouseSidingRoundedIcon/> : null}
                    {index === 1 ?<AssignmentRoundedIcon/> : null}
                    {index === 2 ?<AllInboxRoundedIcon/> : null}
                    {index === 3 ?<FlagRoundedIcon/> : null}


                </ListItemIcon>
              
                
                <ListItemText primary={text} />
                
              </ListItemButton>
              
            </ListItem>
          ))}
        </List>
        
        <div className='h-75'></div>
        <Divider />
        <div className='d-flex justify-content-center align-items-center m-2 '>
        <Avatar ><img src={currentUser?.photoURL}/>
        </Avatar>
        <div className='d-flex flex-column align-items-start p-2 w-75 '>
        <Typography sx={{fontFamily:'Montserrat',fontSize:15}}> {currentUser?.displayName}</Typography>
        <Typography sx={{fontFamily:'Montserrat',fontSize:10}}> {currentUser?.email}</Typography>
        </div>
        <Dropdown>
      <Dropdown.Toggle variant='' id="dropdown-basic">
      <KeyboardArrowUpRoundedIcon/> 
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={logout} >Log Out</Dropdown.Item>
      
      </Dropdown.Menu>
    </Dropdown>
        <button className='arrowbtn'>
        
        </button>
                </div>
      </Drawer>

      
    </Box></>
    
  )
}

export default Dashboard