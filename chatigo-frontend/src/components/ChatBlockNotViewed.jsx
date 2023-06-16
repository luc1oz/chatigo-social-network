import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { MESSENGER_ROUTE } from '../utils/consts';


function ChatBlockNotViewed(props) {

    const navigate = useNavigate();

    const toMessenger = () => {
        Cookies.set('chatId', props.chatId);
        navigate(MESSENGER_ROUTE);
        window.location.reload();
    }

    return (
        <button className='chat-block-nw d-flex flex-row rounded-2  justify-content-between' onClick={function() {toMessenger()}}>
            <div className='d-flex flex-row gap-3 align-items-center'>
                <img src={"data:image/png;base64," + props.chatImage} alt="" className='chat-block-img rounded-pill'/>
                <div className='d-flex flex-column align-items-start'>
                    <p className='m-0 fw-bold text-start'>
                        {props.chatName}
                    </p>
                    <div className='d-flex flex-row align-items-center gap-2'>
                        <img src={"data:image/png;base64," + props.messageUserImage} alt="" className='chat-block-mess-img rounded-pill'/>
                        <p className='m-0'>
                            {props.messageText ? props.messageText : 'Photo'}
                        </p>
                    </div>
                </div>
                <div className=''>

                </div>
            </div>
            <div className='d-flex flex-column gap-2 align-items-start'>
                <p className='m-0 text-end'>
                    {props.messageDate}
                </p>
                <div className='d-flex flex-row gap-2 align-items-center align-self-end'>
                    <div className='count-unreaded-block rounded-pill d-flex flex-row justify-content-center align-items-center'>
                        {props.countUnreaded}
                    </div>
                    <svg width="15" height="15" viewBox="0 0 22 19" fill="none" className='' xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.75 19H5.75C2.1 19 0 16.9 0 13.25V6.25C0 2.6 2.1 0.5 5.75 0.5H12.75C13.16 0.5 13.5 0.84 13.5 1.25C13.5 1.66 13.16 2 12.75 2H5.75C2.89 2 1.5 3.39 1.5 6.25V13.25C1.5 16.11 2.89 17.5 5.75 17.5H15.75C18.61 17.5 20 16.11 20 13.25V8.25C20 7.84 20.34 7.5 20.75 7.5C21.16 7.5 21.5 7.84 21.5 8.25V13.25C21.5 16.9 19.4 19 15.75 19Z" fill="currentColor"/>
                        <path d="M10.7498 10.6198C9.90978 10.6198 9.05978 10.3598 8.40978 9.82978L5.27978 7.32978C4.95978 7.06978 4.89978 6.59978 5.15978 6.27978C5.41978 5.95978 5.88977 5.89978 6.20977 6.15978L9.33977 8.65978C10.0998 9.26978 11.3898 9.26978 12.1498 8.65978L13.3298 7.71978C13.6498 7.45978 14.1298 7.50977 14.3798 7.83977C14.6398 8.15977 14.5898 8.63978 14.2598 8.88978L13.0798 9.82978C12.4398 10.3598 11.5898 10.6198 10.7498 10.6198Z" fill="currentColor"/>
                        <path d="M18.25 6.5C16.46 6.5 15 5.04 15 3.25C15 1.46 16.46 0 18.25 0C20.04 0 21.5 1.46 21.5 3.25C21.5 5.04 20.04 6.5 18.25 6.5ZM18.25 1.5C17.29 1.5 16.5 2.29 16.5 3.25C16.5 4.21 17.29 5 18.25 5C19.21 5 20 4.21 20 3.25C20 2.29 19.21 1.5 18.25 1.5Z" fill="currentColor"/>
                    </svg>
                </div>
                

            </div>
        </button>
        
    );
}

export default ChatBlockNotViewed;