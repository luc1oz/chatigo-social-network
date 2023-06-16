import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PostBlockDark.css';
import Cookies from 'js-cookie';
import CommentBlock from './CommentBlock';
import { Navigate, useNavigate } from 'react-router-dom';
import { USER_ROUTE } from '../utils/consts';

function PostBlock(props) {

    let navigate = useNavigate();

    const [postId, setPostId] = useState(0);
    const [userId, setUserId] = useState(0);

    const [ownComText, setOwnComText] = useState('');

    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [userImage, setUserImage] = useState('');
    const [postDate, setPostDate] = useState('');
    const [postText, setPostText] = useState('');
    const [postImage, setPostImage] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [isLiked, setIsLiked] = useState('unliked-button');

    const [inText, setInText] = useState(false);
    const [isComOpen, setIsComOpen] = useState(false);

    const [comsObj, setComsObj] = useState([]);

    useEffect(() => {
        setPostId(props.postId)
        setUserId(props.userId)
        setUserName(props.userName)
        setUserSurname(props.userSurname)
        setUserImage(props.userImage)
        setPostDate(props.postDate)
        setPostText(props.postText)
        setPostImage(props.postImage)
        setLikeCount(props.likeCount)
        setLikeClass(props.isLiked)
        setCommentCount(props.commentCount)
    }, [])

    const setLikeClass = (flag) =>{
        console.log(flag);
        if(flag){
            setIsLiked('liked-button')
        }
        else{
            setIsLiked('unliked-button')
        }
    }

    const openComments = () => {
        if(isComOpen){
            setIsComOpen(false);
        }
        else{
            setIsComOpen(true);
            getComs();
        }
    }

    const getComs = () => {
        const formData = new FormData();
            formData.append("postId", postId);
            var goodStatus = false;
    
            fetch("/getComments", {
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
                        console.log(data);
                        var obj = [];
                        if(data.comments.length != 0){
                            console.log(data)
                            setCommentCount(data.comments.length)
                            data.comments.forEach(function(comment, index){
                                obj.push(
                                    <>
                                        <CommentBlock
                                            postId={comment.postId}
                                            userId={comment.userId}
                                            userName={comment.userName}
                                            userSurname={comment.userSurname}
                                            userImage={comment.userImage}
                                            commentDate={comment.commentDate}
                                            commentText={comment.commentText}
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
                                    <p className='text-color-post fw-bold'>
                                        Your comment will be first!
                                    </p>
                                </div>
                            </>
                            )
                        }
                        setComsObj(obj);
                        
                    }
                })
                .catch(error => {
                    console.error(error);
                });
    }

    const handleText = (e) => {
        setOwnComText(e.target.value)
        if(e.target.value == ''){
            setInText(false);
        }
        else{
            setInText(true);
        }
    }

    const createCommentary = () => {

        var goodStatus = false;
        var obj = {
            "userId":Cookies.get("userID"),
            "postId":postId,
            "text":ownComText
        }

        fetch("/createComment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(obj)
        })
        .then((response) => 
        {
            if(response.status === 200)
                {
                    goodStatus = true;
                } 
            response.json()
        })
        .then((data) => {
            if(goodStatus){
                console.log(data);
                getComs();
                setOwnComText('');
                setInText(false);
                document.getElementById('commentEl').value = '';
            }
            
        })
        .catch((error) => {
            console.error(error);
        });
        
    }

    const toUserPage = () =>{
        navigate(USER_ROUTE, { state: { userId: userId } });
    }

    const handleChangeLike = () =>{
        
        var fetchObj = {
            "userId":Cookies.get("userID"),
            "postId":postId
        }

        var goodStatus = false;

        fetch("/reaction", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(fetchObj),
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
                    console.log(data);
                    setLikeClass(data.isLiked);
                    setLikeCount(data.likeCount);
                    // if(isLiked == 'unliked-button'){
                    //     setLikeClass(true);
                    // }
                    // else{
                    //     setLikeClass(false);
                    // }
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleDeletePost = () => {
        
        const formData = new FormData();
        formData.append("postId", props.postId);
        var goodStatus = false;

        fetch("/deletePost", {
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
                    console.log(data);
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div className='d-flex flex-column gap-2 post-block rounded-3 text-color'>
            <div className='d-flex flex-row justify-content-between'>
                <button className='d-flex flex-row gap-3 user-button' onClick={toUserPage}>
                    <img src={"data:image/png;base64," + userImage} className='rounded-pill post-avatar img-fluid' alt='egor'></img>
                    <div className='d-flex flex-column align-items-start'>
                        <p className='text-color-post fw-bold'> {userName} {userSurname} </p>
                        <p className='text-color-post'> {postDate} </p>
                    </div>
                </button>
                {Cookies.get('userID') == props.userId && <button className='delete-button-post d-flex flex-row justify-content-center align-items-center' onClick={handleDeletePost}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 6.72998C20.98 6.72998 20.95 6.72998 20.92 6.72998C15.63 6.19998 10.35 5.99998 5.12001 6.52998L3.08001 6.72998C2.66001 6.76998 2.29001 6.46998 2.25001 6.04998C2.21001 5.62998 2.51001 5.26998 2.92001 5.22998L4.96001 5.02998C10.28 4.48998 15.67 4.69998 21.07 5.22998C21.48 5.26998 21.78 5.63998 21.74 6.04998C21.71 6.43998 21.38 6.72998 21 6.72998Z" fill="currentColor"/>
                            <path d="M8.50001 5.72C8.46001 5.72 8.42001 5.72 8.37001 5.71C7.97001 5.64 7.69001 5.25 7.76001 4.85L7.98001 3.54C8.14001 2.58 8.36001 1.25 10.69 1.25H13.31C15.65 1.25 15.87 2.63 16.02 3.55L16.24 4.85C16.31 5.26 16.03 5.65 15.63 5.71C15.22 5.78 14.83 5.5 14.77 5.1L14.55 3.8C14.41 2.93 14.38 2.76 13.32 2.76H10.7C9.64001 2.76 9.62001 2.9 9.47001 3.79L9.24001 5.09C9.18001 5.46 8.86001 5.72 8.50001 5.72Z" fill="currentColor"/>
                            <path d="M15.21 22.7501H8.78999C5.29999 22.7501 5.15999 20.8201 5.04999 19.2601L4.39999 9.19007C4.36999 8.78007 4.68999 8.42008 5.09999 8.39008C5.51999 8.37008 5.86999 8.68008 5.89999 9.09008L6.54999 19.1601C6.65999 20.6801 6.69999 21.2501 8.78999 21.2501H15.21C17.31 21.2501 17.35 20.6801 17.45 19.1601L18.1 9.09008C18.13 8.68008 18.49 8.37008 18.9 8.39008C19.31 8.42008 19.63 8.77007 19.6 9.19007L18.95 19.2601C18.84 20.8201 18.7 22.7501 15.21 22.7501Z" fill="currentColor"/>
                            <path d="M13.66 17.25H10.33C9.91999 17.25 9.57999 16.91 9.57999 16.5C9.57999 16.09 9.91999 15.75 10.33 15.75H13.66C14.07 15.75 14.41 16.09 14.41 16.5C14.41 16.91 14.07 17.25 13.66 17.25Z" fill="currentColor"/>
                            <path d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" fill="currentColor"/>
                        </svg>
                </button>}
            </div>
            
            <p className='text-color-post mb-3'> {postText} </p>
            {postImage !== '' && <img src={"data:image/png;base64," + postImage} className='rounded-3 img-fluid' alt='egor'></img>}
            <div className='d-flex flex-row gap-2'>
                <button className={isLiked + ' rounded-pill d-flex flex-row justify-content-center align-items-center gap-2'} onClick={handleChangeLike} id='likeButton'> 
                    <svg width="25" height="25" viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M24.4785 3.49537C22.2731 1.30371 18.6965 1.30371 16.4911 3.49537L14.6608 5.31292C14.4853 5.487 14.2473 5.58425 14 5.58425C13.7527 5.58425 13.5147 5.487 13.3402 5.31292L11.5089 3.49537C9.30346 1.30371 5.72695 1.30371 3.52148 3.49537C1.31509 5.68612 1.31509 9.23981 3.52148 11.4315C3.52988 11.4398 3.53923 11.4491 3.54763 11.4574L14 22.7084L24.4524 11.4574C24.4608 11.4491 24.4701 11.4398 24.4785 11.4315C26.6849 9.23981 26.6849 5.68612 24.4785 3.49537ZM15.1704 2.18611C18.1048 -0.728704 22.8639 -0.728704 25.7992 2.18611C28.7289 5.0963 28.7336 9.81112 25.8132 12.7259L14.686 24.7018C14.5096 24.8916 14.2604 25 14 25C13.7396 25 13.4904 24.8916 13.314 24.7018L2.18683 12.7259C-0.733572 9.81112 -0.728949 5.0963 2.20078 2.18611C5.13611 -0.728704 9.89518 -0.728704 12.8296 2.18611L14 3.34816L15.1704 2.18611Z" fill="currentColor"/>
                    </svg>
                    {likeCount != 0 && <p className='m-0'>
                        {likeCount}
                    </p>}
                </button>
                <button className='comment-button rounded-pill d-flex flex-row justify-content-center align-items-center gap-2' onClick={openComments}>
                    <svg width="25" height="25" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M26 19V5C26 3.34 24.66 2 23 2H5C3.34 2 2 3.34 2 5V26.0601L7.68005 22H23C24.66 22 26 20.66 26 19ZM28 5V19C28 21.76 25.76 24 23 24H8.31995L3.16003 27.6801C1.84003 28.6301 0 27.6801 0 26.0601V5C0 2.24 2.24 0 5 0H23C25.76 0 28 2.24 28 5Z" fill="currentColor"/>
                    </svg>

                    {commentCount != 0 && <p className='text-color-post'>
                        {commentCount}
                    </p>}
                </button>
            </div>
            {isComOpen && <div className='d-flex flex-column gap-2'>
                <p className='text-color-post mb-2'>
                    Comments
                </p>
                <div className='d-flex flex-column gap-2'>
                    
                    
                    {comsObj}

                    <div className='d-flex flex-row gap-2 mt-2'>
                        <input id="commentEl" className='input-field rounded-3' placeholder="Type here your commentary.." maxLength={150}  onChange={handleText} type="text" name='commentaryText'/>
                        <button className='send-button-post' disabled={(!inText)} onClick={createCommentary}>
                            <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M29.3998 4.45025C30.2998 2.04025 27.9599 -0.309742 25.5499 0.580258L2.72986 9.01031C0.32986 9.90031 0.0799483 13.2003 2.31995 14.4503L10.2699 18.8803C10.4499 18.9803 10.5998 19.1304 10.6898 19.3104L15.0599 28.2703C16.2199 30.6303 19.6399 30.4703 20.5699 28.0003L29.3998 4.45025ZM27.4598 3.91034L12.4899 18.4503L16.86 27.3903C17.24 28.1803 18.3898 28.1203 18.6898 27.3004L27.4598 3.91034ZM11.0699 17.0303L3.28992 12.7003C2.53992 12.2903 2.62981 11.1903 3.42981 10.8903L25.9999 2.54034L11.0699 17.0303Z" fill="currentColor"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>}
            
        </div>
    );
}

export default PostBlock;