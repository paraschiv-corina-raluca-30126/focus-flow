import React from 'react'
import './LandingPage.css'
import { useState } from 'react'
import { Typography } from '@mui/material'
import LandingHeader from '../LandingHeader/LandingHeader'
import { Link } from 'react-router-dom'
import bg from '../../assets/bg.png'
const LandingPage = () => {
  return (
    <div className='LandingPage'>
      <div className='bg'></div>
      <LandingHeader className="LandingHeader"/>
      <div className='content'>
        <div className='herotext'>
          <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 40 }}>
            Simply Manage Your Task
          </Typography>
          <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 20 }}>
            Create User Stories & Issues, Plan Sprints, & Distribute Tasks Across Your Team.
            </Typography>
        <Link sx={{textDecoration: 'none'}} to={'/dasd'}><button
            className="ctabutton animate__animated  animate__bounce cursor-pointer animate__repeat-3 text-decoration-none	 justify-content-center align-items-center "
          >Start now &nbsp;<i className="bi bi-arrow-right cursor-pointer"></i></button></Link> 
      </div>
    </div>


    </div >
  )
}

export default LandingPage