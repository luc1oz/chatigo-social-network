import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CommentBlockDark.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { USER_ROUTE } from '../utils/consts';


function CommentBlock(props) {

    let navigate = useNavigate();

    const [postId, setPostId] = useState(0);
    const [userId, setUserId] = useState(0);

    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [userImage, setUserImage] = useState('');
    const [commentDate, setCommentDate] = useState('');
    const [commentText, setCommentText] = useState('');

    useEffect(() => {
        setPostId(props.postId)
        setUserId(props.userId)
        setUserName(props.userName)
        setUserSurname(props.userSurname)
        setUserImage(props.userImage)
        setCommentDate(props.commentDate)
        setCommentText(props.commentText)
    }, [])

    return (
        <div className='d-flex flex-row align-items-start gap-2'>
            <img src={"data:image/png;base64," + userImage} className='rounded-pill comment-avatar' alt='egor' 
            onClick={function(){navigate(USER_ROUTE, { state: { userId: userId } }); window.location.reload();}}></img>
            <div className='d-flex flex-column flex-grow-1'>
                <p className='text-color fw-bold'> {userName} {userSurname} </p>
                <p className='text-color text-wrap text-break'> {commentText} </p>
                <p className='text-color fw-light align-self-end'> {commentDate} </p>
            </div>
        </div>
    );
}

export default CommentBlock;



