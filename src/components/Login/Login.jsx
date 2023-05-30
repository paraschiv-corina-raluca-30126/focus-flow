import React from 'react'
import './Login.css'
import task from '../../assets/img.png'


import LoginForm from '../LoginForm/LoginForm'
const Login = () => {
    return (
        <div className='w-100 h-100 d-flex'>
            <div className='placeh'>
            
            <img src={task} width={600} className='p-absolute imgtask'/>
        </div>
        <LoginForm />
        </div>
    )
}

export default Login