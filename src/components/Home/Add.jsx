import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText,TextField,DialogActions, Button} from '@mui/material';
import { addDoc,collection } from 'firebase/firestore';
import { db } from '../../../firebase.config';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Add = () => {
    const [projectName, setProjectName] = useState();
    const [projectDescription, setProjectDescription] = useState();
    const yearCreated = new Date().getDate()+'/'+new Date().getMonth()+'/'+new Date().getFullYear();
   const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          await addDoc(collection(db, 'projects'), {
            name: projectName,
            description:projectDescription,
            timeCreated:yearCreated,
            photoURL:`https://source.boringavatars.com/bauhaus/120/${projectName}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`
          })
         navigate('/home');
        } catch (err) {
          alert(err)
        }
      }
  return (
    <div>
          <Dialog open={true} >
        <DialogTitle>Add Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a project from Scratch.
            Please fill in all the fields, all are mandatory.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            
            id="name"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setProjectName(e.target.value)} 
          />
          
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setProjectDescription(e.target.value)} 
          />
        </DialogContent>
        <DialogActions>
          <Button >Cancel</Button>
          <Button onClick={handleSubmit}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Add