import React from 'react'
import {ListItem} from '@mui/material'
import {List} from '@mui/material'
import {ListItemText} from '@mui/material'
import { Dashboard } from '@mui/icons-material'
export const Goals = () => {
  return (

    <div>
        <Dashboard/>
         <List >
    <ListItem>
      <ListItemText primary="Item 1" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Item 2" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Item 3" />
    </ListItem>
  </List>
  </div>
  )
}
