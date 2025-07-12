import React from 'react'

const Suggestions = ({ user }) => {
    return (
        <div className='flex justify-between items-center'>
            <div className='flex items-center'>
                <img className='w-9 h-9 rounded-full' src={user.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"} alt="" />
                <div className='ml-2'>
                    <p className='text-sm font-semibold'>{user.username}</p>
                    <p className='text-sm font-semibold opacity-70'>Popular</p>
                </div>
            </div>
            <p className='text-blue-700 text-sm font-semibold'>follow</p>
        </div>
    )
}

export default Suggestions
