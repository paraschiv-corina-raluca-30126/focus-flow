import React from 'react'
import './Register.css'
import task from '../../assets/img.png'
import RegisterForm from '../RegisterForm/RegisterForm'

const Register = () => {

    return (
        <div className='w-100 h-100 d-flex'>
            <div className='placeh'>
            
            <img src={task} width={600} className='p-absolute imgtask'/>
        </div>
        <RegisterForm />
        </div>
    )
}

export default Register