import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomePage from '../HomePage/HomePage'
import Profile from '../Profile/Profile';
import Story from '../Story/Story';
import Auth from '../Auth/Auth';
import EditProfile from '../../components/Edit Profile/EditProfile';

const Router = () => {

    const location = useLocation();

    return (
        <div>
            {(location.pathname !== '/signin' && location.pathname !== '/signup') && (
                <div className='flex'>
                    <div className='w-[20%] border border-l-slate-500 '>
                        <Sidebar />
                    </div>
                    <div className='w-full'>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/:username' element={<Profile />} />
                            <Route path='/story/:userId' element={<Story />} />
                            <Route path='/comment/:postId' element={<HomePage />} />
                            <Route path='/account/edit' element={<EditProfile />} />
                        </Routes>
                    </div>
                </div>
            )}
            {(location.pathname === '/signin' || location.pathname === '/signup') && (
                <div>
                    <Routes>
                        <Route path='/signup' element={<Auth />} />
                        <Route path='/signin' element={<Auth />} />
                    </Routes>
                </div>
            )}
        </div>
    );
};

export default Router;
