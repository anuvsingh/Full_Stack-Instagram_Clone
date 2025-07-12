import React from 'react'
import "./Auth.css"
import Signin from '../../components/Registration/Signin'
import Signup from '../../components/Registration/Signup'
import { useLocation } from 'react-router-dom'

const Auth = () => {

  const location = useLocation();

  return (
    <div>
      <div className='flex items-center justify-center h-[100vh] space-x-5'>
        <div className='relative hidden lg:block'>
          <div className='h-[39rem] w-[27rem]'>
            <img
              className='h-full w-full'
              src="/home-phones.png"
              alt="" />
            <div className='mobileWallpaper h-[33.9rem] w-[15.7rem] absolute top-6 right-11'>

            </div>
          </div>
        </div>
        <div className='w-[40vw] lg:w-[23vw]'>
          {location.pathname === "/signin" ? <Signin /> : <Signup /> }
        </div>
      </div>
    </div>
  )
}

export default Auth
