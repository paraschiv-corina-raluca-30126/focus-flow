import { Avatar, Badge, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { PriorityHigh } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const TaskCard = (task) => {
  const navigate=useNavigate();
  const currentTask= task.task;
  console.log(task.task.id);
const userPhoto = `https://source.boringavatars.com/beam/50/${currentTask.data?.assignedTo?.displayName}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`;

  return (

    <div>
      
      <Card variant="outlined" sx={{height:230}}>
        <CardContent>
          <div className='d-flex align-items-center mb-3 justify-content-between'>

          
          <Typography sx={{ fontSize: 14, fontWeight:600}} color="text.secondary" >
            {currentTask.data.status}
          </Typography>
          <div className='d-flex  align-items-center justify-content-center'>
          <Avatar  sx={{ width: 20, height: 20 }} src={userPhoto}></Avatar>
          <Typography sx={{paddingLeft:1,fontSize:14}}>
            {currentTask.data?.assignedTo?.displayName}
          </Typography>
          </div>
          </div>
          <Typography onClick={()=>navigate(`/updatetask/${currentTask.id}`)} variant="h5" component="div">
            {currentTask.data.name}
          </Typography>

          <Typography variant="body2">
{currentTask.data.shortDescription}
          </Typography>
          <br></br>
          <div className='d-flex justify-content-between align-items-center pt-3'>
            <Badge badgeContent={currentTask.data.priority} color="secondary" variant="standard">
              <PriorityHighIcon sx={{ fontSize: 29 }} />
            </Badge>
            <Typography component="div">
            {currentTask.data.dateAdded}
          </Typography>
      
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default TaskCard