import React, { useEffect, useState } from 'react';
import { AiOutlineTable } from "react-icons/ai";
import { RiVideoAddLine } from "react-icons/ri";
import { LuSquareUser } from "react-icons/lu";
import { BiBookmark } from "react-icons/bi";
import PostCard from './PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { reqUserPostAction } from '../../redux/Post/Action';

const PostsPart = ({ user }) => {
    const [activeTab, setActiveTab] = useState();
    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    const { post } = useSelector(store => store);
    console.log("Post:", post);

    const tabs = [
        {
            tab: "Posts",
            icon: <AiOutlineTable></AiOutlineTable>,
            activeTab: ""
        },
        {
            tab: "Reels",
            icon: <RiVideoAddLine></RiVideoAddLine>,
            activeTab: ""
        },
        {
            tab: "Saved",
            icon: <BiBookmark></BiBookmark>,
            activeTab: ""
        },
        {
            tab: "Tagged",
            icon: <LuSquareUser></LuSquareUser>,
            activeTab: ""
        },
    ];

    useEffect(() => {
        if (user) {
            const data = { jwt: token, userId: user?.id }
            dispatch(reqUserPostAction(data))
        }
    }, [user, post.createdPost])

    return (
        <div>
            <div className='flex space-x-14 border-t relative'>
                {tabs.map((item) =>
                    <div
                        onClick={() => setActiveTab(item.tab)}
                        className={`${activeTab === item.tab ? "border-t border-black" : "opacity-60"} flex items-center cursor-pointer py-2 text-sm`}>
                        <p>{item.icon}</p>
                        <p className='ml-1'>{item.tab}</p>
                    </div>
                )}
            </div>
            <div>
                <div className='flex flex-wrap'>
                    {activeTab === "Post" && !post.profilePost?.message ? post?.profilePost?.map((item) => <PostCard post={item} />) : user?.savedPost.map((item) => <PostCard post={item} />)}
                </div>
            </div>
        </div>
    )
}

export default PostsPart
