import React from 'react'
import logo from '../../assets/logo.png'
import './Home.css'
import { Dropdown } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Button, Dialog, DialogTitle,DialogContent,DialogContentText,TextField,DialogActions } from '@mui/material';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot,addDoc, Timestamp } from "firebase/firestore"
import { db } from '../../../firebase.config'
import { createAvatar } from '@dicebear/core';

import { lorelei } from '@dicebear/collection';
import { useNavigate, useNavigation } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
const Home = (width) => {
    const widthy = screen.width;
    const [projects, setProjects] = useState([])
   

    const navigate = useNavigate();

   

    

      useEffect(() => {
        onSnapshot(collection(db, 'projects'), (snapshot) => {
            setProjects(snapshot.docs.map((doc) => {
                return {
                    id: doc.id,
                    data: doc.data(),
                }
            }))
        })

    }, [])

   
   
    return (
        <div className='d-flex flex-column justify-content-center'>
            <Dashboard></Dashboard>
            
            <AppBar
                sx={{ maxWidth: 'calc(100% - 240px)' }}
            >
                <Toolbar sx={{ backgroundColor: 'white' }}>
                    <Typography variant="h6" noWrap component="div" color={'#111'}>
                        Our Projects
                    </Typography>
                    <button className='addButton' onClick={()=>{navigate('/add')}}> Add Project</button>

                </Toolbar>

            </AppBar>
            <Box sx={{ maxWidth: 'calc(100% - 240px)', marginTop: 10, marginLeft: '240px', padding: 3 }}>

                <List sx={{ width: widthy, bgcolor: 'background.paper' }} className="cursor-pointer">
                    {projects.map((project) => (
                        <><ListItem key={project.id} alignItems="flex-start" sx={{cursor:'pointer'}} onClick={()=>{navigate(`/mytasks/${project.id}`)}}>
                            <ListItemAvatar >
                                <Avatar alt={project?.data.name} src={project?.data.photoURL} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={project?.data.name}
                                secondary={<React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline', fontWeight:600 }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {project?.data.timeCreated}
                                        
                                    </Typography>
                                    <Typography
                                        sx={{ display: 'inline', paddingLeft:1 }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >{project?.data.description}
                                        
                                    </Typography> 
                                </React.Fragment>} />
                            


                        </ListItem>
                        <Divider variant="inset" component="li" /></>
                        ))}
                </List>
               


            </Box>

          
        </div>
    )
}

export default Home;