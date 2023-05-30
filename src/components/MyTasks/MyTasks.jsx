import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { AppBar, Grid, Paper, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../firebase.config';
import TaskCard from './TaskCard';

import Dashboard from '../Dashboard/Dashboard';

const MyTasks = () => {const [open, setOpen] = React.useState(true);

    const handleClickOpen = () => {
        useEffect(()=>{
            setOpen(true);
        },[open])
      
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    
    const navigate=useNavigate();
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    const [tasks,setTasks] = useState();
    const projectId = useParams().id;
    useEffect(() => {
        onSnapshot( collection(db, `projects/${projectId}/tasks`),(snapshot) => { 
            setTasks(snapshot.docs.map((doc) => {
                
                return {
                    id: doc.id,
                    data: doc.data(),
                }
            }))
        })

    }, [])
    
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, `projects/${projectId}/tasks`), {
        name:'name',
        status: 'In progress',
        shortDescription:'dadada',
        dateAdded:'12/11/2023',
        priority:'1',
        assignedTo:'Scriti'
      })
     
    } catch (err) {
      alert(err)
    }
  }


    
  return (
    <div className='d-flex  justify-content-center align-items-center'>
 
        <Dashboard></Dashboard>
        <AppBar
                sx={{ maxWidth: 'calc(100% - 240px)' }}
            >
                <Toolbar sx={{ backgroundColor: 'white' }}>
                    <Typography variant="h6" noWrap component="div" color={'#111'}>
                        Our Projects
                    </Typography>
                    <button className='addButton' onClick={()=>{
                        navigate(`/addtask/${projectId}`)
                    }} > Add Task</button>

                </Toolbar>

            </AppBar>
            
        <Grid sx={{marginTop:8, marginLeft:1}} container spacing={2}>
  
  

                    {tasks?.map((task) => (

                        <><Grid item xs={3.9}>
 
                        <TaskCard  task = {task} />
                       
                        </Grid></>
                        ))}
                       
                   </Grid>
                   
  
   

       
        </div>
  )
}

export default MyTasks