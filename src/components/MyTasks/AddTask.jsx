import React from 'react'
import { Dialog, DialogTitle,FormHelperText,Select,MenuItem, DialogContent, DialogContentText,TextField,DialogActions, Button} from '@mui/material';
import { addDoc,collection } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
const AddTask = () => {
    const projectId = useParams().id;
    const [taskName,setTaskName] = useState();
    const [taskStatus,setTaskStatus] = useState('To Do');
    const [taskDesc,setTaskDesc] = useState();
    const [taskPrio,setTaskPrio] = useState();
    const [users,setUsers] = useState();
    const [assigned,setAssigned] = useState();
    const DateAdded = new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear();
    const navigate = useNavigate();
    useEffect(() => {
        onSnapshot( collection(db, `users`),(snapshot) => { 
            setUsers(snapshot.docs.map((doc) => {
                
                return  doc.data();
            }))
        })

    }, [])
   
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          await addDoc(collection(db, `projects/${projectId}/tasks`), {
            name:taskName,
            status: taskStatus,
            shortDescription:taskDesc,
            dateAdded:DateAdded,
            priority:taskPrio,
            assignedTo:assigned
          })
         navigate(`/mytasks/${projectId}`)
        } catch (err) {
          alert(err)
        }
      }

  return (
    <div><Dialog open={true} >
    <DialogTitle>Add Task</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Create a task from Scratch.
        Please fill in all the fields, all are mandatory.
      </DialogContentText>
     
      <TextField
        autoFocus
        margin="dense"
        
        id="name"
        label="Task Name"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => setTaskName(e.target.value)} 
      />
       <Select sx={{width:'100%',color:'#111'}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={taskStatus}
    label="Age"
 
    onChange={(e) => setTaskStatus(e.target.value)} 
  >
    <MenuItem value={'In Progress'}>In Progress</MenuItem>
    <MenuItem value={'To Do'}>To Do</MenuItem>
    <MenuItem value={'Done'}>Done</MenuItem>
  </Select>
  <FormHelperText>Set the status for task</FormHelperText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Short Description"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => setTaskDesc(e.target.value)} 
      />
       <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Priority"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => setTaskPrio(e.target.value)} 
      />
      <Select sx={{width:'100%',color:'#111'}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={assigned}
    label="Assigned To"
 
    onChange={(e) => setAssigned(e.target.value)} 
  >
    {users?.map((user)=>{
        return( <MenuItem value={user}>{user.displayName}</MenuItem>)

    })}
   
  </Select>
    </DialogContent>
    <DialogActions>
      <Button >Cancel</Button>
      <Button onClick={handleSubmit}>Subscribe</Button>
    </DialogActions>
  </Dialog></div>
  )
}

export default AddTask