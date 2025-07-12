import React, { useEffect } from 'react'
import UserDetails from '../../components/Profile/UserDetails'
import PostsPart from '../../components/Profile/PostsPart'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findUserByUserNameAction, getUserProfileAction } from '../../redux/User/Action'
import { isFollowing, isReqUser } from '../../components/Config/Logics'

const Profile = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { username } = useParams();
  const { user } = useSelector(store => store);

  const isCurrentUser  = isReqUser(user.reqUser?.id, user.findByUsername?.id);
  const isFollowed = isFollowing(user.reqUser, user.findByUsername);
  console.log(user);

  useEffect(() => {
    const data = {
      jwt: token,
      username
    }
    dispatch(getUserProfileAction(token))
    dispatch(findUserByUserNameAction(data))
  }, [username, user.follower, user.following])

  return (
    <div className='px-20'>
      <div>
        <UserDetails
          user={isCurrentUser ? user.reqUser : user.findByUsername}
          isFollowing={isFollowed}
          isReqUser={isCurrentUser}
        />
      </div>
      <div>
        <PostsPart
          user={isCurrentUser ? user.reqUser : user.findByUsername}
        />
      </div>
    </div>
  )
}

export default Profile
