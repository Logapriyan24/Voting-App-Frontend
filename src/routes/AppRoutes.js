import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AdminDashBoard from '../pages/AdminDashBoard';
import VoterDashBoard from '../pages/VoterDashBoard';
import ProfilePage from '../pages/ProfilePage';
const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<ProfilePage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin' element={<AdminDashBoard/>}/>
        <Route path='/voter' element={<VoterDashBoard/>}/>
    </Routes>
  );
}

export default AppRoutes