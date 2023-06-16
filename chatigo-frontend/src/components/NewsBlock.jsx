import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import WhatsUpBlock from './WhatsUpBlock';
import './NewsBlockDark.css'
import PostBlock from './PostBlock';
import PageMenuBlock from './PageMenuBlock';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

function NewsBlock() {

    const [postsObj, setPostsObj] = useState([]);

    async function getPosts () {
        var goodStatus = false;
        const formData = new FormData();
        formData.append("userId", Cookies.get('userID'));

        await fetch("/newsPosts", {
            method: "POST",
            // headers: {
            //     'Content-Type': 'application/json; charset=UTF-8'
            // },
            body: formData,
            })
            .then(response => 
                {
                    if(response.status === 200)
                    {
                        goodStatus = true;
                    } 
                    return response.json();
                }
            )
            .then(data => {
                if(goodStatus){
                    var obj = [];
                    if(data.posts.length != 0){
                        data.posts.forEach(function(post, index){
                            obj.push(
                                <>
                                    <PostBlock
                                        userImage={post.userImage}
                                        postText={post.postText}
                                        userName={post.userName}
                                        userSurname={post.userSurname}
                                        postImage={post.postImage}
                                        likeCount={post.likeCount}
                                        postDate={post.postDate}
                                        postId={post.postId}
                                        userId={post.userId}
                                        isLiked={post.isLiked}
                                        commentCount={post.commentCount}
                                    />
                                </>
                            )
                        });
                    }
                    else{
                        obj.push(
                        <>
                            <div>
                                {/* TODO: DIV 0 POSTS */}
                                <p className='no-posts-block rounded-3'>
                                    Your friends or subscribers didn't post anything.
                                </p>
                            </div>
                        </>
                        )
                    }
                    setPostsObj(obj);
                    console.log()
                    
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div className='d-flex flex-row news-block justify-content-center gap-3 w-100'>
            <div className='page-menu-block'>
                <PageMenuBlock/>
            </div>
            <div className='posts-block d-flex flex-column gap-2'>
                <WhatsUpBlock/> 
                {/* { [...Array(n)].map((item, index) => <PostBlock key={index} /> ) } */}
                {postsObj}

                {/* <PostBlock/>
                <PostBlock/>
                <PostBlock/>
                <PostBlock/> */}
            </div>
            <div className='help-center-block'>

            </div>
        </div>
        
    );
}

export default NewsBlock;