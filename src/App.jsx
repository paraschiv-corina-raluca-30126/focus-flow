
import { createTheme } from '@mui/material'
import { Router, Route, Routes } from 'react-router-dom'
import './App.css'

import NotFound from './components/404/NotFound'
import Dashboard from './components/Dashboard/Dashboard'
import LandingPage from './components/LandingPage/LandingPage'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ProtectedRoutes from './ProtectedRoutes'
import { ThemeProvider } from '@mui/material'
import Home from './components/Home/Home'
import MyTasks from './components/MyTasks/MyTasks'
import { Inbox } from '@mui/icons-material'
import { Goals } from './components/Goals/Goals'
import Add from './components/Home/Add'
import AddTask from './components/MyTasks/AddTask'
import UpdateTask from './components/MyTasks/UpdateTask'
function App() {
 
    
 
  const theme = createTheme({
    typography: {
      fontFamily: 'Montserrat'
    }
  });
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        
          <Routes>
            <Route path="/"
              element={<LandingPage />} />
          <Route path="/register"
              element={<Login />} />
              <Route path="/login"
              element={<Register />} />
              <Route path="/home"
              element={<Home />}/>
              <Route path="/mytasks/:id"
              element={<MyTasks />}
              exact={true}>
                </Route>
              <Route path="/inbox"
              element={<Inbox />} />
              <Route path="/goals"
              element={<Goals />} />
              <Route path='/add' element={<Add />}/>
              <Route path='/addtask/:id' element={<AddTask />}/>
              <Route path='/updatetask/:id' element={<UpdateTask />}/>
              
              <Route path="*"
              element={<NotFound />} />

          </Routes>
      
      </ThemeProvider>
    </div>
  )
}

export default App
