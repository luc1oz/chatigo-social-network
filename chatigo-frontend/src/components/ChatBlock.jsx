import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { MESSENGER_ROUTE } from '../utils/consts';

function ChatBlock(props) {

    const navigate = useNavigate();

    const toMessenger = () => {
        Cookies.set('chatId', props.chatId);
        navigate(MESSENGER_ROUTE);
        window.location.reload();
    }

    return (
        <button className='chat-block d-flex flex-row rounded-2  justify-content-between' onClick={function() {toMessenger()}}>
            <div className='d-flex flex-row gap-3 align-items-center'>
                <img src={"data:image/png;base64," + props.chatImage} alt="" className='chat-block-img rounded-pill'/>
                <div className='d-flex flex-column align-items-start'>
                    <p className='m-0 fw-bold text-start'>
                        {props.chatName}
                    </p>
                    {props.messageDate ? <div className='d-flex flex-row align-items-center gap-2'>
                        
                        <img src={"data:image/png;base64," + props.messageUserImage} alt="" className='chat-block-mess-img rounded-pill'/>
                        <p className='m-0'>
                            {props.messageText ? props.messageText : 'Photo'}
                        </p>
                    </div> : <p className='m-0'>New chat</p>}                    
                </div>
            </div>
            <div className='d-flex flex-column gap-3 align-items-start'>
                <p className='m-0 text-end'>
                    {props.messageDate}
                </p>
            </div>
        </button>
        
    );
}

export default ChatBlock;