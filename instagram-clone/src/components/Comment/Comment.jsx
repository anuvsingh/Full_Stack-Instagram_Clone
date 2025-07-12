import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody
} from '@chakra-ui/react';
import CommentCard from './CommentCard';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsBookmark, BsThreeDots, BsBookmarkFill, BsEmojiSmile } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import './Comment.css';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, findPostCommentAction } from '../../redux/Comment/Action';
import { useParams } from 'react-router-dom';
import { findPostByIdAction } from '../../redux/Post/Action';
import { timeDifference } from '../Config/Logics';

const Comment = ({ onClose, isOpen, isSaved, isPostLiked, handlePostLike, handleSavedPost }) => {
    const handleClose = () => {
        document.body.style.overflow = 'auto';
        onClose();
    };
    const [commentContent, setCommentContent] = useState();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const [postId] = useParams();
    const { comment, post, user } = useSelector((store) => store);

    useEffect(() => {
        const data = {
            jwt: token, postId
        }
        if (postId) {
            dispatch(findPostByIdAction(data));
        }
    }, [comment.createdComment, postId])

    return (
        <>
            <Modal
                size={"4xl"}
                onClose={handleClose}
                isOpen={isOpen}
                isCentered
                blockScrollOnMount={false}
                motionPreset="scale"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <div className='flex h-[75vh]'>
                            <div className='w-[45%] flex flex-col justify-center'>
                                <img
                                    className='max-h-full w-full'
                                    src={post.singlePost?.image}
                                    alt="" />
                            </div>
                            <div className='w-[55%] pl-10 relative'>
                                <div className='flex justify-between items-center py-5'>
                                    <div className='flex items-center'>
                                        <div className='ml-2'>
                                            <img
                                                className='w-9 h-9 rounded-full'
                                                src={user.reqUser.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
                                                alt="" />
                                        </div>
                                        <div className='ml-2'>
                                            <p>{user.reqUser.username}</p>
                                        </div>
                                    </div>
                                    <BsThreeDots />
                                </div>
                                <hr />
                                <div className='comment'>
                                    {post.singlePost?.comments.map((item) => (<CommentCard comment={item} />))}
                                </div>
                                <div className='absolute bottom-0 w-[90%]'>
                                    <div className='flex justify-between items-center w-full py-4'>
                                        <div className='flex items-center space-x-2'>
                                            {isPostLiked ? <AiFillHeart className='text-2xl hover:opacity-50 cursor-pointer text-red-600' onClick={handlePostLike} /> : <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlePostLike} />}

                                            <FaRegComment className='text-xl hover:opacity-50 cursor-pointer' />

                                            <RiSendPlaneFill className='text-xl hover:opacity-50 cursor-pointer' />
                                        </div>
                                        <div className='cursor-pointer'>
                                            {isSaved ? <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleSavedPost} /> : <BsBookmark className='text-xl hover:opacity-50 cursor-pointer' onClick={handleSavedPost} />}
                                        </div>
                                    </div>
                                    <div className='w-full py-2'>
                                        {post.singlePost?.likedByUsers.length > 0 && <p>{post.singlePost?.likedByUsers.length} likes</p>}
                                        <p className='opacity-50 text-sm'>{timeDifference(post.singlePost?.createdAt)}</p>
                                    </div>
                                    <div className='flex items-center w-full'>
                                        <BsEmojiSmile />
                                        <input
                                            className='commentInput'
                                            type="text"
                                            placeholder='Add a comment.....'
                                            onChange={(e) => setCommentContent(e.target.value)}
                                            value={commentContent}
                                            onKeyPress={(e) => {
                                                if (e.key == "Enter") {
                                                    const data = {
                                                        postId,
                                                        jwt: token,
                                                        data: {
                                                            content: commentContent
                                                        }
                                                    }
                                                    dispatch(createCommentAction(data));
                                                    setCommentContent("")
                                                }
                                            }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Comment;
