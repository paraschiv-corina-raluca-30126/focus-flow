import { Typography } from '@mui/material'
import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { useAuthState } from 'react-admin';
import { updateProfile } from 'firebase/auth';
import './LoginForm.css';
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom'
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/material/Button';
import { createUserWithEmailAndPassword, updateCurrentUser } from 'firebase/auth';
import { auth, app } from '../../../firebase.config';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const db=getFirestore(app);

    const theme = createTheme({
        palette: {
            primary: {
                main: '#111',
            },
        }
    });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const registerWithEmailAndPassword = async (displayName, email, password) => {

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const user = res.user;
            const profilePhoto = `https://source.boringavatars.com/beam/50/${displayName}?colors=264653,2a9d8f,e9c46a,f4a261,e76f51`;
            await updateProfile(user,{displayName: displayName, photoURL:profilePhoto})
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                displayName,
                authProvider: "local",
                email,
            });
            handleClick();
            if(user){
                navigate('/home');
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


    return (
        <div className='container d-flex justify-content-center align-items-center flex-column text-left'>
             <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        User registered succesfully!
        </Alert>
      </Snackbar>
            <ThemeProvider theme={theme}>
                <div className="text-left d-flex flex-column text-hero">
                    <Typography sx={{ fontWeight: 600, fontSize: 30 }}>Register to FocusFlow</Typography>
                    <Typography>Already have an account? <Link to='/login' >Login</Link></Typography>
                </div>
                <form className='form'>
                    <Button variant="outlined" sx={{ color: '#111', borderColor: "#111" }}>
                        <GoogleIcon />
                    </Button>
                    <div className="or">
                        <hr></hr>
                    </div>
                    <TextField id="outlined-basic" value={username} className="w-100" onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" />
                    <TextField id="outlined-basic" value={email} className="w-100" onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" />
                    <TextField id="outlined-basic" className="w-100" value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" />
                    <Button variant='contained' className='w-100' sx={{ height: 50 }} onClick={() => registerWithEmailAndPassword(username, email, password)}>Register</Button>
                </form>
            </ThemeProvider>
        </div>
    )
}

export default LoginForm;