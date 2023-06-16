import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MessageBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';

function MessageBlock(props) {

    return (
        <div className='message-block d-flex flex-row rounded-2  justify-content-between gap-2'>
            <div className='d-flex flex-row gap-3 align-items-center w-100'>
                <div className='align-self-start'>
                    <img src={"data:image/png;base64," + props.userImage} alt="" className='message-block-img rounded-pill '/>
                </div>
                
                <div className='d-flex flex-column align-items-start flex-grow-1'>
                    <p className='m-0 fw-bold'>
                        {props.userName}
                    </p>
                    <p className='m-0 fw-light text-wrap mb-2'>
                        {props.messageText}
                    </p>
                    {props.messageImage && <img src={"data:image/png;base64," + props.messageImage} className='rounded-3 img-fluid w-75' alt='egor'></img>}
                </div>

                <div className='align-self-end'>
                    <p className='m-0 fw-light text-end'>
                        {props.messageDate}
                    </p>
                </div>
            </div>
        </div>
        
    );
}

export default MessageBlock;