import { Typography } from '@mui/material'
import { TextField } from '@mui/material';
import React from 'react';
import { createTheme } from '@mui/material/styles';
import {ThemeProvider} from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterForm.css';
import { Link } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, app } from '../../../firebase.config';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
const RegisterForm = () => {
    const theme = createTheme({
        palette: {
          primary: {
            main: '#111',
          },
        }
      });  
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();

      const logInWithEmailAndPassword = async (email, password) => {
        try {
          await signInWithEmailAndPassword(auth, email, password).then(()=>{
               
               navigate('/home');})
               
        
        } catch (err) {
          
          
        }
      };

      const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

    return (
        <div className='container d-flex justify-content-center align-items-center flex-column text-left'>
           <ThemeProvider theme={theme}>
           <div className="text-left d-flex flex-column text-hero">
                <Typography sx={{ fontWeight: 600, fontSize: 30 }}>Login to FocusFlow</Typography>
                <Typography>Don't have an account? <Link to='/register' >Register</Link></Typography>
            </div>
            <form className='form'>
                <Button variant="outlined" sx={{ color: '#111', borderColor: "#111" }}>
                    <GoogleIcon />
                </Button>
                <div className="or">
                    <hr></hr>
                </div>
               
                <TextField id="outlined-basic" value={email} className="w-100" onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" />
                    <TextField id="outlined-basic" className="w-100" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" />
                    <Button variant='contained' className='w-100' sx={{ height: 50 }} onClick={() => logInWithEmailAndPassword(email, password)}>Login</Button>
            </form>
            </ThemeProvider>
        </div>
    )
}

export default RegisterForm