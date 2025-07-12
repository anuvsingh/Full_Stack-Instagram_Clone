import React from 'react'
import Suggestions from './Suggestions'
import { useSelector } from 'react-redux'

const HomeRight = () => {
  const [user, post] = useSelector((store) => store)

  return (
    <div>
      <div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center'>
            <div>
              <img
                className='w-12 h-12 rounded-full'
                src={user.reqUser?.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
                alt=""
              />
            </div>
            <div className='ml-3'>
              <p>{user.reqUser?.name}</p>
              <p className='opacity-70'>{user.username}</p>
            </div>
          </div>
          <div>
            <p className='text-blue-700 font-semibold'>switch</p>
          </div>
        </div>
        <div className='space-y-5 mt-10'>
          {user.popularUsers?.map((item) => (
            <Suggestions user={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomeRight
