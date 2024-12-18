/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/custom/Header';
import { Toaster } from './components/ui/sonner';
import { UserContext } from './context/UserContext';
import { useState } from 'react';


function App() {
  // eslint-disable-next-line no-unused-vars
  const [userInfo, setUserInfo] = useState([]);
  
  
  
  console.log(userInfo);
  if(userInfo){
    return <Navigate to={'/auth/sign-in'}/>
  }

  return (
    <>
    <UserContext.Provider value={{userInfo,setUserInfo}}>
    
      <Header/>
      <Outlet/>
      <Toaster/>
    </UserContext.Provider>
    
    </>
  )
}

export default App
