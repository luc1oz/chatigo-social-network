import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatsBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import AllFriendsBlock from './AllFriendsBlock';
import OnlineFriendsBlock from './OnlineFriendsBlock';
import AllUsersBlock from './AllUsersBlock';
import ChatsSearchBlock from './ChatsSearchBlock';

function ChatsBlock() {

    return (
        <div className='d-flex flex-row chats-block justify-content-center gap-3 w-100'>
            <div className='page-menu-block'>
                <PageMenuBlock/>
            </div>
            <div className='chats-search-block d-flex flex-column gap-2'>
                <ChatsSearchBlock/>
            </div>
            <div className='help-center-block'>

            </div>
        </div>
        
    );
}

export default ChatsBlock;