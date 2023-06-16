import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MessengerBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import AllFriendsBlock from './AllFriendsBlock';
import OnlineFriendsBlock from './OnlineFriendsBlock';
import AllUsersBlock from './AllUsersBlock';
import MessengerChatBlock from './MessengerChatBlock';

function MessengerBlock() {

    return (
        <div className='d-flex flex-row messenger-block justify-content-center gap-3'>
            <div className='page-menu-block'>
                <PageMenuBlock/>
            </div>
            <div className='messenger-chat-block'>
                <MessengerChatBlock/>
            </div>
            <div className='help-center-block'>

            </div>
        </div>
        
    );
}

export default MessengerBlock;