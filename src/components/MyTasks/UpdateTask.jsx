import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, MenuItem, Select, TextField } from '@mui/material';
import { collection, onSnapshot, updateDoc,doc} from 'firebase/firestore';
import {  useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../../firebase.config';
const UpdateTask = () => {
    const projectId = useParams().id;
    const [taskName,setTaskName] = useState();
    const [taskStatus,setTaskStatus] = useState('To Do');
    const [taskDesc,setTaskDesc] = useState();
    const [taskPrio,setTaskPrio] = useState();
    const [users,setUsers] = useState();
    const [tasks,setTasks]= useState();
    const [assigned,setAssigned] = useState();
    const DateAdded = new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear();
    const navigate = useNavigate();
     useEffect(() => {
        onSnapshot( collection(db, `projects/sjYleW4XRi2r2NA86qlJ/tasks`),(snapshot) => { 
            setTasks(snapshot.docs.map((doc) => {
                
                return {
                    id: doc.id,
                    data: doc.data(),
                }
            }))
        })

    }, [])

    const found = tasks?.find(obj => {
        return obj.id === projectId;
      });
   
        

   
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
          await updateDoc(doc(db, `projects/sjYleW4XRi2r2NA86qlJ/tasks`,projectId), {
            name:taskName,
            status: taskStatus,
            shortDescription:taskDesc,
            dateAdded:DateAdded,
            priority:taskPrio,
            assignedTo:assigned
          })
         navigate(`/mytasks/sjYleW4XRi2r2NA86qlJ`)
        } catch (err) {
          alert(err)
        }
      }
   

  return (
    <div><Dialog open={true} >
    <DialogTitle>Update Task</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Update a task from Scratch.
        Please fill in all the fields, all are mandatory.
      </DialogContentText>
     
      <TextField
        autoFocus
        margin="dense"
        defaultValue={taskName}
        id="name"
        
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => setTaskName(e.target.value)} 
      />
       <Select sx={{width:'100%',color:'#111'}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={found?.data.status}
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
        defaultValue={found?.data.shortDescription}
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
        defaultValue={found?.data.priority}
        onChange={(e) => setTaskPrio(e.target.value)} 
      />
      <Select sx={{width:'100%',color:'#111'}}
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    defaultValue={found?.data.assignedTo.displayName}
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

export default UpdateTask