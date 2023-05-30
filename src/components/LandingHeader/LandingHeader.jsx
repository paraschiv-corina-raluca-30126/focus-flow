import React from 'react'
import { Link } from 'react-router-dom'
import './LandingHeader.css'
import logo from '../../assets/logo.png'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import {ThemeProvider} from '@mui/material/styles';
import { fontWeight } from '@mui/system';
const theme = createTheme({

        typography: {
          fontFamily: [
            'Montserrat',
          ],
                  
        },
      
  palette: {
    primary: {
      main: '#111',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

const LandingHeader = () => {
    return (
        <div className="LandingHeader row ">
            <div className="col-4 d-flex align-items-center logoplaceh">

                <img src={logo} />
                <ThemeProvider theme={theme}>
                <Typography sx={{ fontWeight: 600 }} className='logotxt'>FocusFlow</Typography>
                </ThemeProvider>

            </div>
            <div className="col-8 d-flex align-items-center  justify-content-end buttonsplaceh">
              <Typography sx={{ fontFamily: 'Montserrat', textDecoration:'none',color:'#000'}} className='butonul'> <Link sx={{color:'#111'}} to="/login">Login</Link></Typography>
               <Link to="/register">
                <button
            className='text-black buttoncss' 
            >Register</button></Link>
            </div>

        </div>

    )
}

export default LandingHeader