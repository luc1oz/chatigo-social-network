import React from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatsListBlockDark.css'
import PageMenuBlock from './PageMenuBlock';
import FriendsFindBlock from './FriendsFindBlock';
import AllFriendsBlock from './AllFriendsBlock';
import OnlineFriendsBlock from './OnlineFriendsBlock';
import AllUsersBlock from './AllUsersBlock';
import ChatsSearchBlock from './ChatsSearchBlock';
import ChatBlock from './ChatBlock';
import ChatBlockNotViewed from './ChatBlockNotViewed';


function ChatsListBlock() {

    return (
        <div className='d-flex flex-column gap-1 chats-list-block rounded-3 '>
           <ChatBlock/>
           <ChatBlockNotViewed/>
        </div>  
    );
}

export default ChatsListBlock;