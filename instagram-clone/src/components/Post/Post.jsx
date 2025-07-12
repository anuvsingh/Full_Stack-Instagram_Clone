import React, { useState, useSelector, useEffect } from 'react';
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import "./Post.css"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsBookmarkFill } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import Comment from '../Comment/Comment';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { likePostAction, savePostAction, unlikePostAction, unSavePostAction } from '../../redux/Post/Action';
import { isPostLikedByUser, isSavedPost } from '../Config/Logics';
import { Navigate, useNavigate } from 'react-router-dom';

const Post = ({ post }) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    const [user] = useSelector((store) => store);
    const navigate = useNavigate();

    const data = { jwt: token, postId: post?.id }
    const handleSavedPost = () => {
        setIsSaved(true);
        dispatch(savePostAction(data))
    };
    const handleUnSavedPost = () => {
        setIsSaved(false);
        dispatch(unSavePostAction(data))
    };
    const handlePostLike = () => {
        setIsPostLiked(true);
        dispatch(likePostAction(data))
    };
    const handlePostUnLike = () => {
        setIsPostLiked(false);
        dispatch(unlikePostAction(data))
    };
    const handleClick = () => {
        setShowDropDown(!showDropDown);
    };
    const handleOpenCommentModel = () => {
        navigate(`/comment/${post.id}`)
        onOpen();
    };
    useEffect(() => {
        setIsPostLiked(isPostLikedByUser(post, user.reqUser?.id))
        setIsSaved(isSavedPost(user.reqUser, post.id))
    }, [post.likedByUsers, user.reqUser])

    return (
        <div>
            <div className='border rounded-md w-full'>
                <div className='flex justify-between items-center w-full py-4 px-5'>
                    <div className='flex items-center'>
                        <img
                            className='h-12 w-12 rounded-full'
                            src={post.user.userImage || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
                            alt=""
                        />
                        <div className='pl-2'>
                            <p className='font-semibold text-sm items-center'>{post?.user.username}</p>
                            <p className='font-thin text-sm'>{post.location}</p>
                        </div>
                    </div>
                    <div className='dropdown'>
                        <BsThreeDots className='dots' onClick={handleClick} />
                        <div
                            className='dropdown-content'>
                            {showDropDown && <p className='bg-black text-white py-1 px-4 rounded-md cursor-pointer'>Delete</p>}
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <img
                        className='w-full'
                        src={post?.image}
                        alt=""
                    />
                </div>
                <div className='flex justify-between items-center w-full px-5 py-4'>
                    <div className='flex items-center space-x-2'>
                        {isPostLiked ? <AiFillHeart className='text-2xl hover:opacity-50 cursor-pointer text-red-600' onClick={handlePostUnLike} /> : <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlePostLike} />}

                        <FaRegComment onClick={handleOpenCommentModel} className='text-xl hover:opacity-50 cursor-pointer' />

                        <RiSendPlaneFill className='text-xl hover:opacity-50 cursor-pointer' />
                    </div>
                    <div className='cursor-pointer'>
                        {isSaved ? <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleUnSavedPost} /> : <BsBookmark className='text-xl hover:opacity-50 cursor-pointer' onClick={handleSavedPost} />}
                    </div>
                </div>
                <div className='w-full py-2 px-5'>
                    {post?.likedByUsers?.length > 0 && <p>{post?.likedByUsers?.length} likes</p>}
                    {post?.comments?.length && <p className='opacity-50 py-2 cursor-pointer'>View all {post?.comments?.length} comments</p>}
                </div>

                <div className='border border-t w-full'>
                    <div className='flex w-full items-center px-5'>
                        <BsEmojiSmile />
                        <input className='commentInput' type="text" placeholder='Add a comment.....' />
                    </div>
                </div>
            </div>

            <Comment
                handlePostLike={handlePostLike}
                onClose={onClose}
                isOpen={isOpen}
                handleSavedPost={handleSavedPost}
                isPostLiked={isPostLiked}
                isSaved={isSaved}
            />
        </div>
    )
}

export default Post
