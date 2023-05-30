
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Outlet } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import Register from './components/Register/Register';


const ProtectedRoutes = () => {
    const auth = getAuth();
const user = auth.currentUser;
const [isAuthenticated, setIsAuthenticated] = useState();
useEffect(()=>{
    if(auth.currentUser){
        setIsAuthenticated(true);
    }
    else setIsAuthenticated(false);
    
})

    return isAuthenticated ? <Outlet /> : <Register />;
}

export default ProtectedRoutes;